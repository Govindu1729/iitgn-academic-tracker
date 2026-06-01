// frontend/src/pages/HonoursMinorPage.jsx
import { useState, useEffect } from 'react';
import { courseAPI, programAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { calculateTotalCredits } from '../utils/gpaCalculator';
import ProgressBar from '../components/ProgressBar';
import toast from 'react-hot-toast';

export default function HonoursMinorPage() {
  const { user, updateProfile } = useAuth();
  const [courses, setCourses] = useState([]);
  const [requirements, setRequirements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [coursesRes, requirementsRes] = await Promise.all([
        courseAPI.getAll(),
        programAPI.getRequirements(user?.program || 'BTech_CSE')
      ]);
      setCourses(coursesRes.data);
      setRequirements(requirementsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Honours courses (courses marked as isHonoursCourse)
  const honoursCourses = courses.filter(c => c.isHonoursCourse && !c.isPlanned);
  const honoursCredits = calculateTotalCredits(honoursCourses);
  const honoursRequired = requirements?.honoursAdditionalCredits || 20;
  const honoursProgress = Math.min((honoursCredits / honoursRequired) * 100, 100);
  const honoursComplete = honoursCredits >= honoursRequired;

  // Minor courses (courses marked as isMinorCourse)
  const minorCourses = courses.filter(c => c.isMinorCourse && !c.isPlanned);
  const minorCredits = calculateTotalCredits(minorCourses);
  const minorRequired = requirements?.minorAdditionalCredits || 20;
  const minorProgress = Math.min((minorCredits / minorRequired) * 100, 100);
  const minorComplete = minorCredits >= minorRequired;

  const toggleHonours = async () => {
    const success = await updateProfile({ pursuingHonours: !user?.pursuingHonours });
    if (success) {
      setEditing(false);
      fetchData();
    }
  };

  const toggleMinor = async () => {
    const success = await updateProfile({ pursuingMinor: !user?.pursuingMinor });
    if (success) {
      setEditing(false);
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iitgn-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Honours & Minor Tracking</h1>
        <p className="text-gray-500">Track additional credits for Honours and Minor degrees</p>
      </div>

      {/* Honours Section */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">🏆 Honours in {user?.program?.replace('BTech_', '')}</h2>
              <p className="text-blue-100 text-sm">Deepen your core competence with additional courses</p>
            </div>
            <button
              onClick={toggleHonours}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                user?.pursuingHonours 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
            >
              {user?.pursuingHonours ? 'Disable Honours Track' : 'Enable Honours Track'}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {user?.pursuingHonours ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Progress: {honoursCredits} / {honoursRequired} credits</span>
                  <span className={honoursComplete ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                    {Math.round(honoursProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`rounded-full h-3 transition-all duration-500 ${honoursComplete ? 'bg-green-600' : 'bg-blue-600'}`}
                    style={{ width: `${honoursProgress}%` }}
                  ></div>
                </div>
              </div>

              {honoursComplete && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg text-green-700 text-sm">
                  ✓ Congratulations! You have completed the Honours requirement.
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Requirements:</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Complete {honoursRequired} additional credits in your discipline</li>
                  <li>Include at least one project course beyond the Open Project Course</li>
                  <li>Two open electives from base programme may count towards Honours</li>
                </ul>
              </div>

              {honoursCourses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Courses Counted for Honours ({honoursCourses.length})</h3>
                  <div className="space-y-2">
                    {honoursCourses.map(course => (
                      <div key={course._id} className="bg-gray-50 rounded p-3 flex justify-between items-center">
                        <div>
                          <span className="font-mono text-sm text-gray-500">{course.courseCode}</span>
                          <span className="ml-2">{course.courseName}</span>
                        </div>
                        <span className="text-sm text-gray-500">{course.credits} credits</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {honoursCredits < honoursRequired && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-yellow-700 text-sm">
                  💡 Need {honoursRequired - honoursCredits} more Honours credits. Mark courses as "Honours" when adding them.
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>Enable Honours track to start tracking additional credits.</p>
              <p className="text-sm mt-1">Honours requires {honoursRequired} additional credits.</p>
            </div>
          )}
        </div>
      </div>

      {/* Minor Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">📘 Minor{user?.minorDiscipline ? ` in ${user.minorDiscipline}` : ''}</h2>
              <p className="text-purple-100 text-sm">Develop expertise in another discipline</p>
            </div>
            <button
              onClick={toggleMinor}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                user?.pursuingMinor 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white text-purple-600 hover:bg-gray-100'
              }`}
            >
              {user?.pursuingMinor ? 'Disable Minor Track' : 'Enable Minor Track'}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {user?.pursuingMinor ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Progress: {minorCredits} / {minorRequired} credits</span>
                  <span className={minorComplete ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                    {Math.round(minorProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`rounded-full h-3 transition-all duration-500 ${minorComplete ? 'bg-green-600' : 'bg-purple-600'}`}
                    style={{ width: `${minorProgress}%` }}
                  ></div>
                </div>
              </div>

              {minorComplete && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg text-green-700 text-sm">
                  ✓ Congratulations! You have completed the Minor requirement.
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Requirements:</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Complete {minorRequired} additional credits in {user?.minorDiscipline || 'another discipline'}</li>
                  <li>Two open electives from base programme may count towards Minor</li>
                  <li>Courses must be approved by the minor discipline</li>
                </ul>
              </div>

              {minorCourses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Courses Counted for Minor ({minorCourses.length})</h3>
                  <div className="space-y-2">
                    {minorCourses.map(course => (
                      <div key={course._id} className="bg-gray-50 rounded p-3 flex justify-between items-center">
                        <div>
                          <span className="font-mono text-sm text-gray-500">{course.courseCode}</span>
                          <span className="ml-2">{course.courseName}</span>
                        </div>
                        <span className="text-sm text-gray-500">{course.credits} credits</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {minorCredits < minorRequired && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-yellow-700 text-sm">
                  💡 Need {minorRequired - minorCredits} more Minor credits. Mark courses as "Minor" when adding them.
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>Enable Minor track to start tracking additional credits.</p>
              <p className="text-sm mt-1">Minor requires {minorRequired} additional credits in another discipline.</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-semibold mb-1">📌 Important Notes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Honours and Minor are add-ons to the base BTech degree</li>
          <li>You can claim Honours/Minor at graduation based on collected credits</li>
          <li>A maximum of two open electives can be counted towards Honours/Minor requirements</li>
          <li>Honours requires at least one project course beyond the Open Project Course</li>
          <li>For multiple minors or honours+minor, maximum two open electives can be counted</li>
        </ul>
      </div>
    </div>
  );
}
