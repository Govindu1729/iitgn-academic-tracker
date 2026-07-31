// frontend/src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { courseAPI, analyticsAPI, programAPI } from '../services/api';
import { calculateCPI, calculateTotalCredits, getCreditsByBasket } from '../utils/gpaCalculator';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/ProgressBar';
import CPIWarning from '../components/CPIWarning';
import { programList, basketOrder, basketLabels } from '../utils/programRequirements';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programRequirements, setProgramRequirements] = useState(null);
  const [cpiData, setCpiData] = useState({ overallCPI: 0, semesterWiseGPA: {} });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      // Get courses first
      const coursesRes = await courseAPI.getAll();
      setCourses(coursesRes.data);

      // Get program requirements using the new user fields
      // Map primaryDiscipline to program code format
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

      // Get the program code from the user's primaryDiscipline
      const programCode = user?.primaryDiscipline 
        ? disciplineToProgramCode[user.primaryDiscipline] || 'BTech_CSE'
        : 'BTech_CSE';

      const requirementsRes = await programAPI.getRequirements(programCode);
      setProgramRequirements(requirementsRes.data);

      // Get GPA data
      const gpaRes = await analyticsAPI.getGPA();
      setCpiData(gpaRes.data);

    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const completedCourses = courses.filter(c => !c.isPlanned);
  const totalCredits = calculateTotalCredits(completedCourses);
  const basketCredits = getCreditsByBasket(completedCourses);
  const cpi = calculateCPI(completedCourses);
  
  const totalRequired = programRequirements?.totalCreditsRequired || 170;

  const getSemesterCreditsData = () => {
    const semesterCredits = {};
    completedCourses.forEach(course => {
      const key = `${course.academicYear} Sem ${course.semester}`;
      semesterCredits[key] = (semesterCredits[key] || 0) + course.credits;
    });
    return Object.entries(semesterCredits).map(([name, credits]) => ({ name, credits })).slice(-6);
  };

  const semesterCreditsData = getSemesterCreditsData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-500">
          {user?.programName || user?.primaryDiscipline || 'Student'}
        </p>
        {/* Show course count for debugging */}
        <p className="text-xs text-gray-400 mt-1">
          {completedCourses.length} completed courses • {courses.filter(c => c.isPlanned).length} planned
        </p>
      </div>

      <CPIWarning cpi={cpi} />

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-8">
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">CPI</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-blue-600">{cpi.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">Credits</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-green-600">{totalCredits}</div>
          <div className="text-xs text-gray-400">/ {totalRequired}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">Remaining</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-orange-600">
            {Math.max(0, totalRequired - totalCredits)}
          </div>
          <div className="text-xs text-gray-400">to graduate</div>
        </div>
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">Courses</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-purple-600">{completedCourses.length}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">Planned</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-orange-600">
            {courses.filter(c => c.isPlanned).length}
          </div>
        </div>
      </div>

      {/* Graduation Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-700">Graduation Progress</span>
          <span className="text-sm text-gray-500">
            {totalCredits} / {totalRequired} credits
            ({Math.round((totalCredits / totalRequired) * 100)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-iitgn-blue h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((totalCredits / totalRequired) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Charts - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
        {/* Basket Progress */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Basket Progress</h2>
          {Object.keys(basketCredits).length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {basketOrder.slice(0, 5).map(basket => {
                const requirement = programRequirements?.basketRequirements?.find(r => r.basketName === basket);
                const target = requirement?.minCredits || 0;
                const current = basketCredits[basket] || 0;
                if (target === 0 && current === 0) return null;
                return (
                  <ProgressBar
                    key={basket}
                    label={basket}
                    current={current}
                    target={target}
                    color={basketLabels[basket]?.color || 'blue'}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Add courses to see basket progress</p>
          )}
        </div>

        {/* Credits per Semester */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Credits per Semester</h2>
          {semesterCreditsData.length > 0 ? (
            <div className="h-48 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={semesterCreditsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 32]} />
                  <Tooltip />
                  <Bar dataKey="credits" fill="#3b82f6">
                    {semesterCreditsData.map((entry, index) => (
                      <Cell 
                        key={index} 
                        fill={entry.credits > 28 ? '#ef4444' : entry.credits > 22 ? '#f59e0b' : '#10b981'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Add courses to see chart</p>
          )}
        </div>
      </div>

      {/* Recent Courses - Responsive Table */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Recent Courses</h2>
        {completedCourses.slice(0, 5).length > 0 ? (
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs md:text-sm font-medium text-gray-500">Code</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-500">Course</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-500">Credits</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-500">Grade</th>
                </tr>
              </thead>
              <tbody>
                {completedCourses.slice(0, 5).map(course => (
                  <tr key={course._id} className="border-b">
                    <td className="py-2 md:py-3 font-mono text-xs md:text-sm">{course.courseCode}</td>
                    <td className="py-2 md:py-3 text-sm md:text-base truncate max-w-[150px] md:max-w-none">
                      {course.courseName}
                    </td>
                    <td className="py-2 md:py-3 text-sm">{course.credits}</td>
                    <td className="py-2 md:py-3 text-sm font-semibold">{course.grade || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No courses added yet. Go to Course History to add courses.</p>
        )}
      </div>
    </div>
  );
}