// frontend/src/pages/BasketTrackingPage.jsx
import { useState, useEffect } from 'react';
import { courseAPI, programAPI } from '../services/api';
import { getCreditsByBasket } from '../utils/gpaCalculator';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/ProgressBar';
import { basketLabels, basketOrder } from '../utils/programRequirements';
import toast from 'react-hot-toast';

export default function BasketTrackingPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [programRequirements, setProgramRequirements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedBasket, setExpandedBasket] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      // Get courses
      const coursesRes = await courseAPI.getAll();
      const allCourses = coursesRes.data;
      const completedCourses = allCourses.filter(c => !c.isPlanned);
      setCourses(completedCourses);

      // Map primaryDiscipline to program code
      const disciplineToProgramCode = {
        'CSE': 'BTech_CSE',
        'AI': 'BTech_AI',
        'EE': 'BTech_EE',
        'ME': 'BTech_ME',
        'CL': 'BTech_CL',
        'CE': 'BTech_CE',
        'MSE': 'BTech_MSE',
        'ICDT': 'BTech_ICDT'
      };

      const programCode = user?.primaryDiscipline 
        ? disciplineToProgramCode[user.primaryDiscipline] || 'BTech_CSE'
        : 'BTech_CSE';

      const requirementsRes = await programAPI.getRequirements(programCode);
      setProgramRequirements(requirementsRes.data);

    } catch (error) {
      console.error('Basket fetch error:', error);
      toast.error('Failed to load basket data');
    } finally {
      setLoading(false);
    }
  };

  const basketCredits = getCreditsByBasket(courses);
  
  // Group courses by basket
  const coursesByBasket = {};
  courses.forEach(course => {
    if (!coursesByBasket[course.basketType]) {
      coursesByBasket[course.basketType] = [];
    }
    coursesByBasket[course.basketType].push(course);
  });

  const getTargetForBasket = (basketName) => {
    const req = programRequirements?.basketRequirements?.find(r => r.basketName === basketName);
    return req?.minCredits || 0;
  };

  const getProgressStatus = (basketName) => {
    const current = basketCredits[basketName] || 0;
    const target = getTargetForBasket(basketName);
    if (target === 0) return 'info';
    if (current >= target) return 'complete';
    if (current >= target * 0.75) return 'good';
    if (current >= target * 0.5) return 'moderate';
    return 'low';
  };

  const statusColors = {
    complete: 'text-green-600 bg-green-50',
    good: 'text-blue-600 bg-blue-50',
    moderate: 'text-yellow-600 bg-yellow-50',
    low: 'text-red-600 bg-red-50',
    info: 'text-gray-600 bg-gray-50'
  };

  const statusLabels = {
    complete: '✓ Complete',
    good: 'Good Progress',
    moderate: 'Halfway There',
    low: 'Needs Attention',
    info: 'Optional'
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Basket Tracking</h1>
        <p className="text-gray-500">Track your progress across IITGN degree requirements</p>
        {courses.length === 0 && (
          <p className="text-sm text-orange-600 mt-2">⚠️ No courses found. Add courses from Course History page.</p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
          <div className="text-sm text-gray-500">Total Courses</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{Object.keys(basketCredits).length}</div>
          <div className="text-sm text-gray-500">Baskets Active</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Object.values(basketCredits).reduce((a, b) => a + b, 0)}
          </div>
          <div className="text-sm text-gray-500">Total Credits</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {programRequirements?.basketRequirements?.filter(r => {
              const current = basketCredits[r.basketName] || 0;
              return current >= r.minCredits && r.minCredits > 0;
            }).length || 0}
          </div>
          <div className="text-sm text-gray-500">Requirements Met</div>
        </div>
      </div>

      {/* Basket List */}
      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No courses added yet</p>
          <p className="text-gray-400 text-sm mt-2">Go to Course History to add your first course</p>
        </div>
      ) : (
        <div className="space-y-4">
          {basketOrder.map(basket => {
            const current = basketCredits[basket] || 0;
            const target = getTargetForBasket(basket);
            const status = getProgressStatus(basket);
            const coursesInBasket = coursesByBasket[basket] || [];
            const isExpanded = expandedBasket === basket;

            if (target === 0 && coursesInBasket.length === 0) return null;

            return (
              <div key={basket} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Basket Header */}
                <div 
                  className="p-5 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => setExpandedBasket(isExpanded ? null : basket)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-800">{basket}</h2>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
                          {statusLabels[status]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{basketLabels[basket]?.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          <span className="font-semibold">{current}</span> / {target} credits
                        </span>
                        {target > 0 && (
                          <span className="text-gray-500">
                            {Math.round((current / target) * 100)}% complete
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <ProgressBar
                          current={current}
                          target={target || 1}
                          color={basketLabels[basket]?.color?.split('-')[1] || 'blue'}
                          showPercentage={false}
                        />
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {isExpanded ? '▲' : '▼'}
                    </div>
                  </div>
                </div>

                {/* Expanded Courses List */}
                {isExpanded && (
                  <div className="border-t bg-gray-50 p-4">
                    <h3 className="font-medium text-gray-700 mb-3">Courses in this basket ({coursesInBasket.length})</h3>
                    {coursesInBasket.length > 0 ? (
                      <div className="space-y-2">
                        {coursesInBasket.map(course => (
                          <div key={course._id} className="bg-white rounded p-3 flex justify-between items-center">
                            <div>
                              <span className="font-mono text-sm text-gray-500">{course.courseCode}</span>
                              <span className="ml-2">{course.courseName}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-gray-500">{course.credits} credits</span>
                              {course.grade && <span className="ml-3 font-semibold">{course.grade}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No courses added yet in this basket</p>
                    )}
                    
                    {target > 0 && current < target && (
                      <div className="mt-3 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                        💡 Need {target - current} more credits in {basket}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-2">Basket Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded-full"></div><span>Complete (≥ target)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-full"></div><span>Good (≥75%)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div><span>Moderate (≥50%)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span>Needs Attention (&lt;50%)</span></div>
        </div>
      </div>
    </div>
  );
}