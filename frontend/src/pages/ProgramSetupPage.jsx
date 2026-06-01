// frontend/src/pages/ProgramSetupPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { programAPI } from '../services/api';
import { programList, basketLabels } from '../utils/programRequirements';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ProgramSetupPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [program, setProgram] = useState(user?.program || 'BTech_CSE');
  const [pursuingHonours, setPursuingHonours] = useState(user?.pursuingHonours || false);
  const [pursuingMinor, setPursuingMinor] = useState(user?.pursuingMinor || false);
  const [minorDiscipline, setMinorDiscipline] = useState(user?.minorDiscipline || '');
  const [requirements, setRequirements] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequirements();
  }, [program]);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const res = await programAPI.getRequirements(program);
      setRequirements(res.data);
    } catch (error) {
      toast.error('Failed to load program requirements');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const success = await updateProfile({
      program,
      pursuingHonours,
      pursuingMinor,
      minorDiscipline: pursuingMinor ? minorDiscipline : ''
    });
    if (success) {
      navigate('/dashboard');
    }
  };

  const minorOptions = ['CSE', 'AI', 'EE', 'ME', 'CE', 'CL', 'MSE', 'Physics', 'Chemistry', 'Maths', 'HSS', 'Management'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iitgn-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-iitgn-blue px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Program Setup</h1>
          <p className="text-blue-100 text-sm">Configure your academic program and track graduation requirements</p>
        </div>

        <div className="p-6">
          {/* Program Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2">Select Your Program</label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
            >
              {Object.entries(programList).map(([code, { name }]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">This determines your basket requirements and graduation criteria</p>
          </div>

          {/* Requirements Summary */}
          {requirements && (
            <div className="mb-8 bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold text-gray-700 mb-3">Program Requirements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white rounded p-2 text-center">
                  <div className="font-bold text-iitgn-blue">{requirements.totalCreditsRequired}</div>
                  <div className="text-gray-500">Total Credits</div>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <div className="font-bold text-green-600">{requirements.disciplineCoreCredits}</div>
                  <div className="text-gray-500">Core Credits</div>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <div className="font-bold text-purple-600">{requirements.disciplineElectiveCredits}</div>
                  <div className="text-gray-500">Elective Credits</div>
                </div>
              </div>
            </div>
          )}

          {/* Honours Option */}
          <div className="mb-6 border rounded-lg p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={pursuingHonours}
                onChange={(e) => setPursuingHonours(e.target.checked)}
                className="mt-1 mr-3"
              />
              <div>
                <span className="font-semibold text-gray-800">Pursuing Honours (+20 credits)</span>
                <p className="text-sm text-gray-500">
                  Complete 20 additional credits in your discipline, including at least one project course beyond the Open Project Course.
                </p>
              </div>
            </label>
          </div>

          {/* Minor Option */}
          <div className="mb-8 border rounded-lg p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={pursuingMinor}
                onChange={(e) => setPursuingMinor(e.target.checked)}
                className="mt-1 mr-3"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-800">Pursuing Minor (+20 credits)</span>
                <p className="text-sm text-gray-500">
                  Complete 20 additional credits in another discipline or focus area.
                </p>
              </div>
            </label>
            
            {pursuingMinor && (
              <div className="mt-4 ml-6">
                <label className="block text-gray-700 text-sm mb-1">Minor Discipline</label>
                <select
                  value={minorDiscipline}
                  onChange={(e) => setMinorDiscipline(e.target.value)}
                  className="w-full md:w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
                >
                  <option value="">Select minor discipline</option>
                  {minorOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Basket Requirements Preview */}
          {requirements && (
            <div className="mb-8">
              <h2 className="font-semibold text-gray-700 mb-3">Basket Requirements Preview</h2>
              <div className="space-y-2">
                {requirements.basketRequirements?.slice(0, 8).map(req => (
                  <div key={req.basketName} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{req.basketName}</span>
                    <span className="font-medium">{req.minCredits} credits required</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">More baskets will appear as you add courses</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={handleSave}
              className="bg-iitgn-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save & Continue to Dashboard
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
      <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">📌 Note:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>You can change these settings later from your profile</li>
          <li>Honours and Minor require additional credits beyond the base degree</li>
          <li>Maximum of two open electives can be counted towards Honours/Minor requirements</li>
          <li>Pass/Fail conversion allowed for max 2 courses during the entire programme</li>
        </ul>
      </div>
    </div>
  );
}
