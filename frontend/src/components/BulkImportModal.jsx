// frontend/src/components/BulkImportModal.jsx
import { useState } from 'react';
import toast from 'react-hot-toast';

// Helper functions for auto-detection
const detectDepartment = (courseCode) => {
  const code = courseCode.toUpperCase();
  if (code.startsWith('CS')) return 'CSE';
  if (code.startsWith('ES')) return 'Institute';
  if (code.startsWith('MA')) return 'Maths';
  if (code.startsWith('PH')) return 'Physics';
  if (code.startsWith('CH')) return 'Chemistry';
  if (code.startsWith('HS')) return 'HSS';
  if (code.startsWith('EE')) return 'EE';
  if (code.startsWith('ME')) return 'ME';
  if (code.startsWith('CE')) return 'Civil';
  if (code.startsWith('CL')) return 'ChemE';
  if (code.startsWith('MSE')) return 'MSE';
  if (code.startsWith('IN')) return 'Institute';
  if (code.startsWith('PE')) return 'Institute';
  if (code.startsWith('BS')) return 'Institute';
  if (code.startsWith('GE')) return 'Institute';
  if (code.startsWith('FP')) return 'Institute';
  return 'Other';
};

const detectBasketType = (courseCode, courseName) => {
  const code = courseCode.toUpperCase();
  const name = courseName.toLowerCase();
  
  // Institute Core
  if (['FP100', 'ES101', 'ES112', 'ES115', 'ES116', 'ES117', 'MA103', 'MA104', 'MA203', 'BS192', 'PE101', 'PE102', 'PE103', 'PE104', 'IN101', 'IN102', 'IN103', 'IN104', 'IN105', 'IN106', 'IN107', 'IN108', 'ES113', 'ES114', 'ES119', 'ES211', 'ES212', 'ES214', 'ES221', 'ES242', 'ES243', 'ES244', 'ES245'].includes(code)) {
    return 'Institute Core';
  }
  
  // HSS
  if (code.startsWith('HS') || name.includes('writing') || name.includes('philosophy') || name.includes('economics') || name.includes('civilization') || name.includes('language') || name.includes('french') || name.includes('japanese') || name.includes('mandarin') || name.includes('urdu') || name.includes('sanskrit')) {
    return 'HSS';
  }
  
  // Science Basket
  if (['PH201', 'PH202', 'PH203', 'CH203', 'CH302', 'CG503', 'CG505', 'EH303', 'EH304', 'BS401'].includes(code)) {
    return 'Science Basket';
  }
  
  // Mathematics Basket
  if (['MA204', 'MA205', 'MA206'].includes(code)) {
    return 'Mathematics Basket';
  }
  
  // Materials Basket
  if (['ES118', 'MSE211', 'MSE314', 'MSE202', 'MSE204', 'MSE207', 'MSE210'].includes(code)) {
    return 'Materials Basket';
  }
  
  // General Education
  if (code.startsWith('GE')) {
    return 'General Education';
  }
  
  // Discipline Core (CSE/AI)
  if (['CS201', 'CS202', 'CS203', 'CS303', 'CS328', 'CS329', 'CS330', 'CS331', 'ES242', 'ES301', 'ES336', 'CS303'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (EE)
  if (['EE221', 'EE223', 'EE224', 'EE225', 'EE226', 'EE227', 'EE312', 'EE322', 'EE323', 'EE333', 'EE341'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (ME)
  if (['ME206', 'ME207', 'ME208', 'ME209', 'ME333', 'ME334', 'ME335', 'ME337', 'ME362'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (ChemE)
  if (['CL201', 'CL202', 'CL203', 'CL204', 'CL205', 'CL313', 'CL314', 'CL315', 'CL316', 'CL317', 'CL325', 'CL326', 'CL327'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (Civil)
  if (['CE201', 'CE202', 'CE203', 'CE301', 'CE302', 'CE310', 'CE311', 'CE312', 'CE313', 'CE314', 'CE403', 'CE404'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (MSE)
  if (['MSE202', 'MSE204', 'MSE205', 'MSE206', 'MSE207', 'MSE210', 'MSE302', 'MSE304', 'MSE307', 'MSE312', 'MSE313', 'MSE315'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Project
  if (code === 'OPC' || (code.includes('299') || code.includes('399') || code.includes('499')) || name.includes('project')) {
    return 'Project';
  }
  
  return 'Discipline Elective';
};

export default function BulkImportModal({ isOpen, onClose, onImport, existingCourseCodes = [] }) {
  const [importText, setImportText] = useState('');
  const [preview, setPreview] = useState([]);
  const [detectedSemester, setDetectedSemester] = useState('');
  const [detectedYear, setDetectedYear] = useState('');
  // Manual override states
  const [manualSemester, setManualSemester] = useState('');
  const [manualYear, setManualYear] = useState('');
  const [duplicateAction, setDuplicateAction] = useState('skip');
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const parseIMSData = (text) => {
    const lines = text.split('\n');
    const courses = [];
    let currentSemester = '';
    let currentYear = '';
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;
      
      if (line.includes('Academic Period:')) {
        const match = line.match(/Academic Period:\s*(\d{4}-\d{4})\s*Semester\s*(\w+)/i);
        if (match) {
          currentYear = match[1];
          currentSemester = match[2];
        }
        continue;
      }
      
      if (line.match(/^semester\s+\w+$/i)) {
        const semMatch = line.match(/semester\s+(\w+)/i);
        if (semMatch) {
          currentSemester = semMatch[1];
        }
        continue;
      }
      
      if (line.match(/^course\s+no/i) || 
          line.match(/^course\s+name/i) || 
          line.match(/^credit/i) ||
          line === 'Course No' ||
          line === 'Course Name' ||
          line === 'Credit') {
        continue;
      }
      
      if (line.match(/^[-]+$/) || line.match(/^[=]+$/)) {
        continue;
      }
      
      const parts = line.split(/\t+/);
      
      if (parts.length >= 3) {
        let courseCode = parts[0].trim();
        courseCode = courseCode.replace(/\s+/g, '');
        
        let courseName = parts[1].trim();
        let credits = parseFloat(parts[2].trim());
        
        if (isNaN(credits) || credits === 0) {
          continue;
        }
        
        courses.push({
          courseCode: courseCode,
          courseName: courseName,
          credits: credits,
          grade: '',
          semester: currentSemester || 'I',
          academicYear: currentYear || '2026-27'
        });
      }
    }
    
    return courses;
  };

  const checkDuplicates = (courses) => {
    return courses.map(course => ({
      ...course,
      isDuplicate: existingCourseCodes.includes(course.courseCode),
      existingCourse: existingCourseCodes.includes(course.courseCode)
    }));
  };

  const handlePreview = () => {
    if (!importText.trim()) {
      toast.error('Please paste IMS course data');
      return;
    }
    
    let parsed = parseIMSData(importText);
    if (parsed.length === 0) {
      toast.error('No valid courses found');
      return;
    }
    
    // Check for duplicates
    parsed = checkDuplicates(parsed);
    const duplicateCount = parsed.filter(c => c.isDuplicate).length;
    
    if (parsed.length > 0) {
      const sem = parsed[0].semester;
      const year = parsed[0].academicYear;
      setDetectedSemester(sem);
      setDetectedYear(year);
      // Set manual fields to detected values so dropdowns show them
      setManualSemester(sem);
      setManualYear(year);
    }
    
    setPreview(parsed);
    setShowDuplicateWarning(duplicateCount > 0);
    
    if (duplicateCount > 0) {
      toast.warning(`Found ${duplicateCount} course(s) already in your record`);
    } else {
      toast.success(`Found ${parsed.length} new courses`);
    }
  };

  const getFilteredCourses = () => {
    if (duplicateAction === 'skip') {
      return preview.filter(c => !c.isDuplicate);
    } else if (duplicateAction === 'replace') {
      return preview;
    } else {
      return preview;
    }
  };

  const handleImport = () => {
    if (preview.length === 0) {
      toast.error('No courses to import');
      return;
    }
    
    const filteredCourses = getFilteredCourses();
    const duplicatesToReplace = duplicateAction === 'replace' ? preview.filter(c => c.isDuplicate) : [];
    const newCourses = filteredCourses.filter(c => !c.isDuplicate);
    
    if (filteredCourses.length === 0) {
      toast.error('No new courses to import after filtering duplicates');
      return;
    }
    
    // Use manual values if set, otherwise fallback to detected
    const finalSemester = manualSemester || detectedSemester;
    const finalYear = manualYear || detectedYear;
    
    // Enrich courses with department and basket
    const enrichedCourses = filteredCourses.map(course => ({
      ...course,
      department: detectDepartment(course.courseCode),
      basketType: detectBasketType(course.courseCode, course.courseName)
    }));
    
    onImport(enrichedCourses, finalSemester, finalYear, {
      action: duplicateAction,
      duplicatesToReplace: duplicatesToReplace.map(c => c.courseCode)
    });
    
    setImportText('');
    setPreview([]);
    setDetectedSemester('');
    setDetectedYear('');
    setManualSemester('');
    setManualYear('');
    setShowDuplicateWarning(false);
    onClose();
  };

  if (!isOpen) return null;

  // Get duplicate info for display
  const duplicateCourses = preview.filter(c => c.isDuplicate);
  const newCourses = preview.filter(c => !c.isDuplicate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Bulk Import from IMS Portal</h2>
        <p className="text-sm text-gray-600 mb-4">
          Copy and paste your course table directly from IMS
        </p>
        
        <div className="mb-4">
          <div className="bg-gray-100 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap mb-3">
            Academic Period: 2023-2024 Semester II<br/>
            Course No	Course Name	Credit<br/>
            ES 101	Engineering Graphics	3<br/>
            ES 112	Computing	3
          </div>
          
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste your IMS course data here..."
            rows={8}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue font-mono text-sm"
          />
        </div>

        {/* Manual Override Section */}
        {preview.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                value={manualSemester}
                onChange={(e) => setManualSemester(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-iitgn-blue"
              >
                <option value="">Auto-detect ({detectedSemester || 'N/A'})</option>
                <option value="I">Semester I</option>
                <option value="II">Semester II</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
              <select
                value={manualYear}
                onChange={(e) => setManualYear(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-iitgn-blue"
              >
                <option value="">Auto-detect ({detectedYear || 'N/A'})</option>
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
                <option value="2027-28">2027-28</option>
                <option value="2028-29">2028-29</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePreview}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Preview Courses
          </button>
        </div>

        {/* Duplicate Handling Options */}
        {showDuplicateWarning && duplicateCourses.length > 0 && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="font-semibold text-yellow-800 mb-2">
              ⚠️ {duplicateCourses.length} duplicate course(s) detected
            </p>
            <div className="text-sm text-yellow-700 mb-3">
              Already in your record: {duplicateCourses.map(c => c.courseCode).join(', ')}
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateAction"
                  value="skip"
                  checked={duplicateAction === 'skip'}
                  onChange={() => setDuplicateAction('skip')}
                />
                <span className="text-sm">Skip duplicates (only import {newCourses.length} new courses)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateAction"
                  value="replace"
                  checked={duplicateAction === 'replace'}
                  onChange={() => setDuplicateAction('replace')}
                />
                <span className="text-sm">Replace existing courses (delete old, import new versions)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateAction"
                  value="keep-both"
                  checked={duplicateAction === 'keep-both'}
                  onChange={() => setDuplicateAction('keep-both')}
                />
                <span className="text-sm">Keep both (add duplicates as separate entries)</span>
              </label>
            </div>
          </div>
        )}

        {preview.length > 0 && (
          <>
            <div className="mb-2 text-sm text-gray-600">
              📅 {manualYear || detectedYear || 'N/A'} - Semester {manualSemester || detectedSemester || 'N/A'}
              {showDuplicateWarning && (
                <span className="ml-2 text-orange-600">
                  ({newCourses.length} new, {duplicateCourses.length} duplicates)
                </span>
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Preview ({preview.length} courses)</h3>
              <div className="bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-2">Code</th>
                      <th className="pb-2">Course Name</th>
                      <th className="pb-2">Credits</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.slice(0, 15).map((course, idx) => (
                      <tr key={idx} className={`border-t ${course.isDuplicate ? 'bg-yellow-50' : ''}`}>
                        <td className="py-1 font-mono text-xs">{course.courseCode}</td>
                        <td className="py-1 text-sm">{course.courseName}</td>
                        <td className="py-1">{course.credits}</td>
                        <td className="py-1">
                          {course.isDuplicate ? (
                            <span className="text-xs text-yellow-600">⚠️ Duplicate</span>
                          ) : (
                            <span className="text-xs text-green-600">✓ New</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {preview.length > 15 && (
                      <tr className="border-t">
                        <td colSpan="4" className="py-2 text-gray-400 text-center">
                          ... and {preview.length - 15} more courses
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end space-x-3 border-t pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={preview.length === 0 || (showDuplicateWarning && duplicateAction === 'skip' && newCourses.length === 0)}
            className={`px-4 py-2 rounded-lg transition ${
              preview.length > 0 && !(showDuplicateWarning && duplicateAction === 'skip' && newCourses.length === 0)
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Import {duplicateAction === 'skip' && newCourses.length > 0 ? newCourses.length : preview.length} Course(s)
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
          <p className="font-semibold mb-1">💡 Duplicate Handling:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Skip</strong> - Only add courses you haven't taken before</li>
            <li><strong>Replace</strong> - Delete old version and add new version (useful for updating grades)</li>
            <li><strong>Keep Both</strong> - Add duplicate as separate entry (not recommended)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}