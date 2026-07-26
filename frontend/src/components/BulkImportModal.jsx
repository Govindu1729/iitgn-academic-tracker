// frontend/src/components/BulkImportModal.jsx
// Enhanced version to handle multiple formats

import { useState } from 'react';
import toast from 'react-hot-toast';

// Helper functions for auto-detection
const detectDepartment = (courseCode) => {
  const code = courseCode.toUpperCase().replace(/[^A-Z]/g, '');
  if (code.startsWith('CS')) return 'CSE';
  if (code.startsWith('AI')) return 'AI';
  if (code.startsWith('EE')) return 'EE';
  if (code.startsWith('ME')) return 'ME';
  if (code.startsWith('CL') || code.startsWith('CH')) return 'CL';
  if (code.startsWith('CE')) return 'CE';
  if (code.startsWith('MSE') || code.startsWith('MS')) return 'MSE';
  if (code.startsWith('ICDT') || code.startsWith('IC')) return 'ICDT';
  if (code.startsWith('ES')) return 'Institute';
  if (code.startsWith('MA')) return 'Maths';
  if (code.startsWith('PH')) return 'Physics';
  if (code.startsWith('HS')) return 'HSS';
  if (code.startsWith('IN')) return 'Institute';
  if (code.startsWith('PE')) return 'Institute';
  if (code.startsWith('BS')) return 'Institute';
  if (code.startsWith('GE')) return 'Institute';
  if (code.startsWith('FP')) return 'Institute';
  if (code.startsWith('DES')) return 'Institute';
  if (code.startsWith('EH')) return 'Earth Sciences';
  if (code.startsWith('CG')) return 'Cognitive Science';
  return 'Institute';
};

const detectBasketType = (courseCode, courseName) => {
  const code = courseCode.toUpperCase().replace(/[^A-Z]/g, '');
  const name = courseName.toLowerCase();
  
  // Institute Core
  const instituteCore = ['FP100', 'ES101', 'ES112', 'ES115', 'ES116', 'ES117', 
    'MA103', 'MA104', 'MA203', 'BS192', 'PE101', 'PE102', 'PE103', 'PE104', 
    'IN101', 'IN102', 'IN103', 'IN104', 'IN105', 'IN106', 'IN107', 'IN108',
    'ES113', 'ES114', 'ES119', 'ES211', 'ES212', 'ES214', 'ES221', 
    'ES242', 'ES243', 'ES244', 'ES245', 'ES204'];
  if (instituteCore.includes(code)) return 'Institute Core';
  
  // HSS
  if (code.startsWith('HS') || name.includes('writing') || name.includes('philosophy') || 
      name.includes('economics') || name.includes('civilization') || name.includes('language') || 
      name.includes('french') || name.includes('japanese') || name.includes('mandarin') || 
      name.includes('urdu') || name.includes('sanskrit') || name.includes('cinema') ||
      name.includes('psychology') || name.includes('organizational') || name.includes('haunting')) {
    return 'HSS';
  }
  
  // Science Basket
  if (['PH201', 'PH202', 'PH203', 'CH203', 'CH302', 'CG503', 'CG505', 'EH303', 'EH304', 'BS401', 'EH615'].includes(code)) {
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
  if (code.startsWith('GE')) return 'General Education';
  
  // Discipline Core (CSE/AI)
  if (['CS201', 'CS202', 'CS203', 'CS303', 'CS328', 'CS329', 'CS330', 'CS331', 
       'ES242', 'ES301', 'ES336', 'ES335'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (EE)
  if (['EE221', 'EE223', 'EE224', 'EE225', 'EE226', 'EE227', 'EE312', 'EE322', 
       'EE323', 'EE333', 'EE341', 'EE313'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (ME)
  if (['ME206', 'ME207', 'ME208', 'ME209', 'ME333', 'ME334', 'ME335', 'ME337', 'ME362'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (ChemE)
  if (['CL201', 'CL202', 'CL203', 'CL204', 'CL205', 'CL313', 'CL314', 'CL315', 
       'CL316', 'CL317', 'CL325', 'CL326', 'CL327'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (Civil)
  if (['CE201', 'CE202', 'CE203', 'CE301', 'CE302', 'CE310', 'CE311', 'CE312', 
       'CE313', 'CE314', 'CE403', 'CE404'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (MSE)
  if (['MSE202', 'MSE204', 'MSE205', 'MSE206', 'MSE207', 'MSE210', 'MSE302', 
       'MSE304', 'MSE307', 'MSE312', 'MSE313', 'MSE315'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Project
  if (code === 'OPC' || (code.includes('299') || code.includes('399') || code.includes('499')) || 
      name.includes('project') || code === 'DES491-I') {
    return 'Project';
  }
  
  // Special Topics
  if (name.includes('special topics') || code.includes('691') || code.includes('491')) {
    return 'Discipline Elective';
  }
  
  return 'Discipline Elective';
};

// Parse the format you provided
const parseCourseData = (text) => {
  const lines = text.split('\n');
  const courses = [];
  let currentSemester = '';
  let currentYear = '';
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    // Try to detect semester header: "2025-2026 Semester II" or "2025-2026 SUMMER"
    const semesterMatch = line.match(/^(\d{4}-\d{4})\s+(Semester\s+[IVXLCDM]+|SUMMER|WINTER|SPRING|FALL)/i);
    if (semesterMatch) {
      currentYear = semesterMatch[1];
      currentSemester = semesterMatch[2].toUpperCase().replace('SEMESTER ', '');
      continue;
    }
    
    // Parse course line format: "2025-2026 Semester II	EE 341	Communication Systems	4	C-"
    // Multiple whitespace/tab separators
    const parts = line.split(/\t+|\s{2,}/).filter(p => p.trim());
    
    // Skip header lines
    if (parts.length < 4) continue;
    if (parts.some(p => /^course\s+no|course\s+name|credit|sr\.no/i.test(p))) continue;
    if (parts.some(p => /^[-]+$|^[=]+$/.test(p))) continue;
    
    // Try to detect if this is a course line
    // Look for pattern: [year] [semester] [code] [name] [credits] [grade]
    // Or: [code] [name] [credits] [grade]
    
    let courseCode = '';
    let courseName = '';
    let credits = 0;
    let grade = '';
    let foundSemester = '';
    let foundYear = '';
    
    // If the line starts with a year, try to extract semester and year
    const yearMatch = line.match(/^(\d{4}-\d{4})/);
    if (yearMatch) {
      foundYear = yearMatch[1];
      // Remove the year from the line for further parsing
      line = line.replace(yearMatch[0], '').trim();
    }
    
    // Try to extract semester from the line
    const semMatch = line.match(/(Semester\s+[IVXLCDM]+|SUMMER|WINTER|SPRING|FALL)/i);
    if (semMatch) {
      foundSemester = semMatch[1].toUpperCase().replace('SEMESTER ', '');
      line = line.replace(semMatch[0], '').trim();
    }
    
    // Now parse the remaining parts
    const remainingParts = line.split(/\t+|\s{2,}/).filter(p => p.trim());
    
    if (remainingParts.length >= 4) {
      // Try to identify course code (starts with letters, may have numbers)
      let codeIndex = 0;
      for (let i = 0; i < remainingParts.length; i++) {
        const part = remainingParts[i].toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (part.match(/^[A-Z]{2,}[0-9]{3}/) || part.match(/^[A-Z]{2,}[0-9]{3}[A-Z]?/)) {
          codeIndex = i;
          break;
        }
      }
      
      courseCode = remainingParts[codeIndex].trim();
      
      // Course name is between code and credits
      let nameParts = [];
      let creditIndex = -1;
      for (let i = codeIndex + 1; i < remainingParts.length; i++) {
        const part = remainingParts[i].trim();
        // Check if it's a number (credits)
        if (!isNaN(parseFloat(part)) && parseFloat(part) > 0 && parseFloat(part) <= 12) {
          creditIndex = i;
          break;
        }
        nameParts.push(part);
      }
      
      courseName = nameParts.join(' ').trim();
      
      // Get credits and grade
      if (creditIndex !== -1) {
        credits = parseFloat(remainingParts[creditIndex]);
        // Grade is after credits or at the end
        if (creditIndex + 1 < remainingParts.length) {
          const potentialGrade = remainingParts[creditIndex + 1].trim().toUpperCase();
          if (['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'P', 'NP', 'IP', 'S', 'U'].includes(potentialGrade)) {
            grade = potentialGrade;
          }
        }
      }
    } else if (remainingParts.length === 4) {
      // Simple format: [code] [name] [credits] [grade]
      courseCode = remainingParts[0].trim();
      courseName = remainingParts[1].trim();
      credits = parseFloat(remainingParts[2]);
      const potentialGrade = remainingParts[3].trim().toUpperCase();
      if (['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'P', 'NP', 'IP', 'S', 'U'].includes(potentialGrade)) {
        grade = potentialGrade;
      }
    }
    
    // Validate and add course
    if (courseCode && courseName && credits > 0) {
      courses.push({
        courseCode: courseCode.toUpperCase(),
        courseName: courseName,
        credits: credits,
        grade: grade || '',
        semester: foundSemester || currentSemester || 'I',
        academicYear: foundYear || currentYear || '2023-24',
        // Auto-detect department and basket
        department: detectDepartment(courseCode),
        basketType: detectBasketType(courseCode, courseName)
      });
    }
  }
  
  return courses;
};

export default function BulkImportModal({ isOpen, onClose, onImport, existingCourseCodes = [] }) {
  const [importText, setImportText] = useState('');
  const [preview, setPreview] = useState([]);
  const [detectedSemester, setDetectedSemester] = useState('');
  const [detectedYear, setDetectedYear] = useState('');
  const [duplicateAction, setDuplicateAction] = useState('skip');
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const handlePreview = () => {
    if (!importText.trim()) {
      toast.error('Please paste course data');
      return;
    }
    
    let parsed = parseCourseData(importText);
    if (parsed.length === 0) {
      toast.error('No valid courses found. Please check the format.');
      return;
    }
    
    // Check for duplicates
    parsed = parsed.map(course => ({
      ...course,
      isDuplicate: existingCourseCodes.includes(course.courseCode),
      existingCourse: existingCourseCodes.includes(course.courseCode)
    }));
    
    const duplicateCount = parsed.filter(c => c.isDuplicate).length;
    
    if (parsed.length > 0) {
      setDetectedSemester(parsed[0].semester);
      setDetectedYear(parsed[0].academicYear);
    }
    
    setPreview(parsed);
    setShowDuplicateWarning(duplicateCount > 0);
    
    if (duplicateCount > 0) {
      toast.warning(`Found ${duplicateCount} course(s) already in your record`);
    } else {
      toast.success(`Found ${parsed.length} new courses`);
    }
  };

  const handleImport = () => {
    if (preview.length === 0) {
      toast.error('No courses to import');
      return;
    }
    
    const coursesToImport = preview.filter(c => !c.isDuplicate);
    
    if (coursesToImport.length === 0) {
      toast.error('No new courses to import');
      return;
    }
    
    onImport(coursesToImport, detectedSemester, detectedYear, {
      action: duplicateAction,
      duplicatesToReplace: preview.filter(c => c.isDuplicate).map(c => c.courseCode)
    });
    
    setImportText('');
    setPreview([]);
    setDetectedSemester('');
    setDetectedYear('');
    setShowDuplicateWarning(false);
    onClose();
  };

  if (!isOpen) return null;

  const duplicateCourses = preview.filter(c => c.isDuplicate);
  const newCourses = preview.filter(c => !c.isDuplicate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">📋 Bulk Import Courses</h2>
        <p className="text-sm text-gray-600 mb-4">
          Paste your course data from IMS portal or any text format. Supports tab or space-separated data.
        </p>
        
        <div className="mb-4">
          <div className="bg-gray-100 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap mb-3">
            Example formats supported:
            <br/><br/>
            2025-2026 Semester II    EE 341    Communication Systems    4    C-
            <br/>
            EE 341    Communication Systems    4    C-
            <br/>
            ES 101    Engineering Graphics    3    A
          </div>
          
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste your course data here...&#10;Supports multiple formats with tabs or spaces"
            rows={10}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePreview}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Preview Courses
          </button>
        </div>

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
                <span className="text-sm">Skip duplicates (import {newCourses.length} new courses)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateAction"
                  value="replace"
                  checked={duplicateAction === 'replace'}
                  onChange={() => setDuplicateAction('replace')}
                />
                <span className="text-sm">Replace existing courses (delete old, add new)</span>
              </label>
            </div>
          </div>
        )}

        {preview.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">
              Preview ({preview.length} courses)
              {showDuplicateWarning && (
                <span className="ml-2 text-orange-600 text-sm">
                  ({newCourses.length} new, {duplicateCourses.length} duplicates)
                </span>
              )}
            </h3>
            <div className="bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Code</th>
                    <th className="pb-2">Course Name</th>
                    <th className="pb-2">Credits</th>
                    <th className="pb-2">Grade</th>
                    <th className="pb-2">Semester</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 20).map((course, idx) => (
                    <tr key={idx} className={`border-t ${course.isDuplicate ? 'bg-yellow-50' : ''}`}>
                      <td className="py-1 font-mono text-xs">{course.courseCode}</td>
                      <td className="py-1 text-sm max-w-[150px] truncate">{course.courseName}</td>
                      <td className="py-1">{course.credits}</td>
                      <td className="py-1 font-semibold">{course.grade || '-'}</td>
                      <td className="py-1 text-xs">{course.semester}</td>
                      <td className="py-1">
                        {course.isDuplicate ? (
                          <span className="text-xs text-yellow-600">⚠️ Duplicate</span>
                        ) : (
                          <span className="text-xs text-green-600">✓ New</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {preview.length > 20 && (
                    <tr className="border-t">
                      <td colSpan="6" className="py-2 text-gray-400 text-center">
                        ... and {preview.length - 20} more courses
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
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
            disabled={preview.length === 0}
            className={`px-4 py-2 rounded-lg transition ${
              preview.length > 0
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Import {newCourses.length > 0 ? newCourses.length : preview.length} Course(s)
          </button>
        </div>
      </div>
    </div>
  );
}