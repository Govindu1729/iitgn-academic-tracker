// frontend/src/pages/ProgramSetupPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { programAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Program type labels and descriptions
const PROGRAM_TYPE_INFO = {
  BTech: {
    label: 'B.Tech (Single Major)',
    description: 'Standard BTech program in your primary discipline',
    semesters: 8,
    totalCredits: '170-172',
    icon: '🎓'
  },
  DualMajor: {
    label: 'B.Tech with Dual Major',
    description: 'Complete core courses of a secondary discipline',
    semesters: 12,
    totalCredits: '190-210',
    icon: '📚',
    requirements: ['CPI ≥ 6.5', 'No fail grades', 'Apply after 3 semesters']
  },
  DualDegree: {
    label: 'B.Tech-M.Tech Dual Degree',
    description: 'Integrated BTech + MTech program',
    semesters: 10,
    totalCredits: '242',
    icon: '🔬',
    requirements: ['CPI ≥ 6.0', 'Apply after 4 semesters']
  },
  MScDual: {
    label: 'B.Tech-M.Sc Dual Degree',
    description: 'Integrated BTech + MSc program',
    semesters: 10,
    totalCredits: '242',
    icon: '🧪',
    requirements: ['CPI ≥ 6.0', 'Apply after 4 semesters']
  }
};

export default function ProgramSetupPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [primaryDiscipline, setPrimaryDiscipline] = useState(user?.primaryDiscipline || 'CSE');
  const [programType, setProgramType] = useState(user?.programType || 'BTech');
  const [secondaryDiscipline, setSecondaryDiscipline] = useState(user?.secondaryDiscipline || '');
  const [pursuingHonours, setPursuingHonours] = useState(user?.pursuingHonours || false);
  const [pursuingMinor, setPursuingMinor] = useState(user?.pursuingMinor || false);
  const [minorDiscipline, setMinorDiscipline] = useState(user?.minorDiscipline || '');
  const [requirements, setRequirements] = useState(null);
  const [dualMajorPreview, setDualMajorPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disciplines, setDisciplines] = useState([]);
  const [programTypes, setProgramTypes] = useState([]);
  const [applicableTypes, setApplicableTypes] = useState([]);
  const [cpi, setCpi] = useState(0);
  const [hasFailGrades, setHasFailGrades] = useState(false);
  const [currentSemester, setCurrentSemester] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedProgramInfo, setSelectedProgramInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (programType === 'DualMajor' && secondaryDiscipline && primaryDiscipline) {
      fetchDualMajorPreview();
    } else {
      setDualMajorPreview(null);
    }
  }, [primaryDiscipline, secondaryDiscipline, programType]);

  useEffect(() => {
    if (primaryDiscipline && programType) {
      generateRequirements();
    }
  }, [primaryDiscipline, programType, secondaryDiscipline]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const applicableRes = await programAPI.getApplicablePrograms();
      
      setDisciplines(applicableRes.data.disciplines || []);
      setApplicableTypes(applicableRes.data.applicableTypes || []);
      setCpi(applicableRes.data.cpi || 0);
      setHasFailGrades(applicableRes.data.hasFailGrades || false);
      setCurrentSemester(applicableRes.data.currentSemester || 1);
      
      // Set current values from user
      if (user) {
        setPrimaryDiscipline(user.primaryDiscipline || 'CSE');
        setProgramType(user.programType || 'BTech');
        setSecondaryDiscipline(user.secondaryDiscipline || '');
      }
    } catch (error) {
      toast.error('Failed to load program data');
    } finally {
      setLoading(false);
    }
  };

  const generateRequirements = async () => {
    try {
      const req = await programAPI.generateRequirements({
        primaryDiscipline,
        programType,
        secondaryDiscipline: secondaryDiscipline || null
      });
      setRequirements(req.data);
    } catch (error) {
      console.error('Error generating requirements:', error);
    }
  };

  const fetchDualMajorPreview = async () => {
    try {
      const res = await programAPI.getDualMajorPreview({
        primaryDiscipline,
        secondaryDiscipline
      });
      setDualMajorPreview(res.data);
    } catch (error) {
      console.error('Error fetching dual major preview:', error);
    }
  };

  const handleProgramTypeChange = (type) => {
    const info = PROGRAM_TYPE_INFO[type];
    setSelectedProgramInfo(info);
    setShowConfirmDialog(true);
  };

  const confirmProgramTypeChange = () => {
    setProgramType(selectedProgramInfo ? Object.keys(PROGRAM_TYPE_INFO).find(key => PROGRAM_TYPE_INFO[key] === selectedProgramInfo) : 'BTech');
    if (selectedProgramInfo && selectedProgramInfo.type !== 'BTech') {
      // Reset secondary discipline if switching to BTech
      if (selectedProgramInfo.type === 'BTech') {
        setSecondaryDiscipline('');
        setDualMajorPreview(null);
      }
    }
    setShowConfirmDialog(false);
    setSelectedProgramInfo(null);
  };

  const cancelProgramTypeChange = () => {
    setShowConfirmDialog(false);
    setSelectedProgramInfo(null);
  };

  const handleSave = async () => {
    try {
      const success = await updateProfile({
        primaryDiscipline,
        programType,
        secondaryDiscipline: programType !== 'BTech' ? secondaryDiscipline : '',
        pursuingHonours,
        pursuingMinor,
        minorDiscipline: pursuingMinor ? minorDiscipline : ''
      });
      
      if (success) {
        toast.success('Program settings updated successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to update program');
    }
  };

  const getAvailableSecondaryDisciplines = () => {
    if (programType === 'BTech') return [];
    if (programType === 'DualMajor' || programType === 'DualDegree' || programType === 'MScDual') {
      return disciplines.filter(d => d.code !== primaryDiscipline);
    }
    return [];
  };

  const getEligibilityStatus = (type) => {
    const applicable = applicableTypes.find(t => t.code === type);
    return applicable || null;
  };

  const getProgramTypeInfo = (type) => {
    return PROGRAM_TYPE_INFO[type] || null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isEligible = getEligibilityStatus(programType);
  const showEligibilityWarning = isEligible && !isEligible.isEligible && programType !== 'BTech';

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Confirm Dialog */}
      {showConfirmDialog && selectedProgramInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Program Change</h3>
            <div className="mb-4">
              <p className="text-gray-700">
                Are you sure you want to switch to <strong>{selectedProgramInfo.label}</strong>?
              </p>
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{selectedProgramInfo.description}</p>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Semesters:</span> {selectedProgramInfo.semesters}
                  <span className="ml-4 font-medium">Credits:</span> {selectedProgramInfo.totalCredits}
                </div>
                {selectedProgramInfo.requirements && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Requirements:</span>
                    <ul className="list-disc list-inside ml-2">
                      {selectedProgramInfo.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelProgramTypeChange}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmProgramTypeChange}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Program Setup</h1>
          <p className="text-blue-100 text-sm">Configure your academic program and track graduation requirements</p>
        </div>

        <div className="p-6">
          {/* Eligibility Warning */}
          {showEligibilityWarning && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
              <h3 className="font-semibold text-yellow-800">⚠️ Eligibility Requirements Not Met</h3>
              <p className="text-sm text-yellow-700 mt-1">{isEligible?.reason || 'Not eligible for this program'}</p>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Requirements for {programType === 'DualMajor' ? 'Dual Major' : 'Dual Degree'}:</p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  {programType === 'DualMajor' && (
                    <>
                      <li>Minimum CPI: 6.5</li>
                      <li>Apply after 3 semesters, before end of 6th semester</li>
                      <li>No fail grades (F or E)</li>
                    </>
                  )}
                  {(programType === 'DualDegree' || programType === 'MScDual') && (
                    <>
                      <li>Minimum CPI: 6.0</li>
                      <li>Apply after 4 semesters, before end of 6th semester</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Current Program Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getProgramTypeInfo(programType)?.icon || '🎓'}</span>
              <div>
                <h3 className="font-semibold text-blue-800">Current Program</h3>
                <p className="text-sm text-blue-600">
                  {getProgramTypeInfo(programType)?.label || programType} - {disciplines.find(d => d.code === primaryDiscipline)?.name || primaryDiscipline}
                  {secondaryDiscipline && ` with ${disciplines.find(d => d.code === secondaryDiscipline)?.name || secondaryDiscipline}`}
                </p>
              </div>
            </div>
          </div>

          {/* Primary Discipline */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Primary Discipline (BTech Major)</label>
            <select
              value={primaryDiscipline}
              onChange={(e) => setPrimaryDiscipline(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {disciplines.map(d => (
                <option key={d.code} value={d.code}>{d.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Your main BTech discipline</p>
          </div>

          {/* Program Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Program Type</label>
            <select
              value={programType}
              onChange={(e) => handleProgramTypeChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {applicableTypes.map(type => {
                const info = getProgramTypeInfo(type.code);
                return (
                  <option key={type.code} value={type.code}>
                    {info?.icon || '📘'} {type.label} 
                    {type.code !== 'BTech' ? ` (${type.isEligible ? '✅ Eligible' : '⚠️ Check eligibility'})` : ''}
                  </option>
                );
              })}
            </select>
            {getProgramTypeInfo(programType) && (
              <p className="text-xs text-gray-500 mt-1">{getProgramTypeInfo(programType)?.description}</p>
            )}
          </div>

          {/* Secondary Discipline (for Dual Programs) */}
          {(programType === 'DualMajor' || programType === 'DualDegree' || programType === 'MScDual') && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                {programType === 'DualMajor' ? 'Secondary Discipline (Dual Major)' : 
                 programType === 'DualDegree' ? 'MTech Discipline' : 'MSc Discipline'}
              </label>
              <select
                value={secondaryDiscipline}
                onChange={(e) => setSecondaryDiscipline(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select discipline</option>
                {getAvailableSecondaryDisciplines().map(d => (
                  <option key={d.code} value={d.code}>{d.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {programType === 'DualMajor' ? 'Select the discipline for your Dual Major' : 
                 'Select the discipline for your MTech/MSc degree'}
              </p>
            </div>
          )}

          {/* Dual Major Preview */}
          {programType === 'DualMajor' && secondaryDiscipline && dualMajorPreview && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3">📊 Dual Major Credit Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white rounded p-2">
                  <span className="text-gray-600">Primary</span>
                  <div className="font-medium">{dualMajorPreview.primaryDiscipline}</div>
                  <div className="text-xs text-gray-500">{dualMajorPreview.primaryTotalCredits} credits</div>
                </div>
                <div className="bg-white rounded p-2">
                  <span className="text-gray-600">Secondary</span>
                  <div className="font-medium">{dualMajorPreview.secondaryDiscipline}</div>
                  <div className="text-xs text-gray-500">{dualMajorPreview.secondaryCoreCredits} core credits</div>
                </div>
                <div className="bg-white rounded p-2">
                  <span className="text-gray-600">Common Courses</span>
                  <div className="font-medium text-green-600">{dualMajorPreview.commonCredits} credits</div>
                  <div className="text-xs text-gray-500">{dualMajorPreview.commonCourses?.length || 0} courses overlap</div>
                </div>
                <div className="bg-white rounded p-2">
                  <span className="text-gray-600">Additional Credits</span>
                  <div className="font-medium text-orange-600">{dualMajorPreview.additionalCreditsNeeded} credits</div>
                </div>
                <div className="bg-white rounded p-2 col-span-2">
                  <span className="text-gray-600">Total Required</span>
                  <div className="font-medium text-blue-600">{dualMajorPreview.totalCreditsRequired} credits</div>
                  <div className="text-xs text-gray-500">Base: {dualMajorPreview.primaryTotalCredits} + Additional: {dualMajorPreview.additionalCreditsNeeded}</div>
                </div>
              </div>
              {dualMajorPreview.commonCourses?.length > 0 && (
                <div className="mt-3 text-xs text-gray-600 bg-white rounded p-2">
                  <span className="font-medium">Common courses:</span> {dualMajorPreview.commonCourses.join(', ')}
                </div>
              )}
              {dualMajorPreview.summary && (
                <div className="mt-2 text-sm text-blue-700 bg-white rounded p-2">
                  {dualMajorPreview.summary}
                </div>
              )}
            </div>
          )}

          {/* Requirements Summary */}
          {requirements && (
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">📋 Program Requirements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-white rounded p-2">
                  <span className="text-gray-500">Total Credits</span>
                  <div className="font-medium text-blue-600">{requirements.totalCreditsRequired}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <span className="text-gray-500">Semesters</span>
                  <div className="font-medium">{requirements.semesters}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <span className="text-gray-500">Open Electives</span>
                  <div className="font-medium">
                    {requirements.basketRequirements?.find(b => b.basketName === 'Open Elective')?.minCredits || '16'} credits
                  </div>
                </div>
                {requirements.additionalInfo?.additionalCredits && (
                  <div className="bg-white rounded p-2">
                    <span className="text-gray-500">Additional</span>
                    <div className="font-medium text-blue-600">+{requirements.additionalInfo.additionalCredits}</div>
                  </div>
                )}
              </div>
              {requirements.additionalInfo?.note && (
                <div className="mt-3 text-xs text-gray-600 bg-white rounded p-2">
                  📌 {requirements.additionalInfo.note}
                </div>
              )}
            </div>
          )}

          {/* Honours Option */}
          <div className="mb-4 border rounded-lg p-4 hover:bg-gray-50 transition">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={pursuingHonours}
                onChange={(e) => setPursuingHonours(e.target.checked)}
                className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-semibold text-gray-800">🏆 Pursuing Honours (+20 credits)</span>
                <p className="text-sm text-gray-500">
                  Complete 20 additional credits in your discipline. At least one project course beyond OPC required.
                </p>
              </div>
            </label>
          </div>

          {/* Minor Option */}
          <div className="mb-6 border rounded-lg p-4 hover:bg-gray-50 transition">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={pursuingMinor}
                onChange={(e) => setPursuingMinor(e.target.checked)}
                className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-800">📘 Pursuing Minor (+20 credits)</span>
                <p className="text-sm text-gray-500">
                  Complete 20 additional credits in another discipline. Two open electives can be counted.
                </p>
              </div>
            </label>
            
            {pursuingMinor && (
              <div className="mt-4 ml-6">
                <label className="block text-gray-700 text-sm font-medium mb-1">Minor Discipline</label>
                <select
                  value={minorDiscipline}
                  onChange={(e) => setMinorDiscipline(e.target.value)}
                  className="w-full md:w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select minor discipline</option>
                  {disciplines.map(d => (
                    <option key={d.code} value={d.code}>{d.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={!isEligible?.isEligible && programType !== 'BTech'}
              className={`px-6 py-2 rounded-lg transition font-medium ${
                !isEligible?.isEligible && programType !== 'BTech'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              💾 Save & Continue to Dashboard
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-800 border border-blue-200">
        <p className="font-semibold mb-2">📌 Program Change Notes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Dual Major:</strong> Complete all core courses of secondary discipline. Minimum 28 credits from secondary discipline. Open electives reduced by 4 credits.</li>
          <li><strong>BTech-MTech Dual:</strong> 72 additional credits (24 courses + 32 thesis). Open electives reduced by 4 credits.</li>
          <li><strong>BTech-MSc Dual:</strong> 72 additional credits (52 coursework + 20 project). Open electives reduced by 4 credits.</li>
          <li>Maximum duration: 12 semesters for Dual Major, 14 semesters (7 years) for Dual Degree.</li>
          <li>Eligibility for Dual programs requires minimum CPI and no fail grades (Dual Major only).</li>
        </ul>
      </div>
    </div>
  );
}