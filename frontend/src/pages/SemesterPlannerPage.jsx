// frontend/src/pages/SemesterPlannerPage.jsx
import { useState, useEffect } from 'react';
import { courseAPI } from '../services/api';
import AddEditPlannedModal from '../components/AddEditPlannedModal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
// In SemesterPlannerPage.jsx, add import and update AddEditPlannedModal to use autocomplete
import CourseSearchInput from '../components/CourseSearchInput';

// Then in AddEditPlannedModal, replace the course code input with CourseSearchInput similarly

const MAX_CREDITS_PER_SEMESTER = 28;
const MAX_OVERLOAD_CREDITS = 32; 
const NORMAL_CREDITS_PER_SEMESTER = 22;
const OVERLOAD_CPI_THRESHOLD = 7.0;
const MIN_CPI_FOR_OVERLOAD = 7.0; 

export default function SemesterPlannerPage() {
  const { user } = useAuth();
  const [plannedCourses, setPlannedCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [cpi, setCpi] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await courseAPI.getAll();
      setPlannedCourses(res.data.filter(c => c.isPlanned));
      setCompletedCourses(res.data.filter(c => !c.isPlanned));
      
      // Calculate CPI from completed courses
      const gradedCourses = res.data.filter(c => !c.isPlanned && c.grade && !['P', 'NP', 'IP'].includes(c.grade));
      let totalPoints = 0, totalCredits = 0;
      const gradeToPoints = { 'A+': 10, 'A': 10, 'A-': 9, 'B+': 8, 'B': 7, 'B-': 6, 'C+': 5, 'C': 4, 'C-': 3, 'D+': 2, 'D': 1, 'F': 0 };
      gradedCourses.forEach(c => {
        const points = gradeToPoints[c.grade];
        if (points !== undefined) {
          totalPoints += points * c.credits;
          totalCredits += c.credits;
        }
      });
      setCpi(totalCredits > 0 ? totalPoints / totalCredits : 0);
    } catch (error) {
      toast.error('Failed to load planned courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      if (editingCourse) {
        await courseAPI.update(editingCourse._id, courseData);
        toast.success('Planned course updated');
      } else {
        await courseAPI.create(courseData);
        toast.success('Course added to plan');
      }
      fetchCourses();
      setEditingCourse(null);
    } catch (error) {
      toast.error('Failed to save planned course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Remove this course from your plan?')) {
      try {
        await courseAPI.delete(id);
        toast.success('Course removed from plan');
        fetchCourses();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const canOverload = cpi >= OVERLOAD_CPI_THRESHOLD;
  const effectiveMaxCredits = cpi >= MIN_CPI_FOR_OVERLOAD ? MAX_OVERLOAD_CREDITS : MAX_CREDITS_PER_SEMESTER;
  const groupedBySemester = plannedCourses.reduce((acc, course) => {
    const key = `${course.academicYear} - Semester ${course.semester}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {});

  const sortedSemesters = Object.keys(groupedBySemester).sort();

  const getSemesterCredits = (semester) => {
    return groupedBySemester[semester]?.reduce((sum, c) => sum + c.credits, 0) || 0;
  };

  const getTotalPlannedCredits = () => {
    return plannedCourses.reduce((sum, c) => sum + c.credits, 0);
  };

  const getTotalRemainingSemesters = () => {
    // Assuming 8 semesters total for BTech
    const currentYear = new Date().getFullYear();
    const admissionYear = user?.admissionYear || 2026;
    const currentSemester = 2; // Assuming we're in Sem II
    const totalSemesters = 8;
    const semestersCompleted = ((currentYear - admissionYear) * 2) + currentSemester;
    return Math.max(0, totalSemesters - semestersCompleted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iitgn-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Semester Planner</h1>
          <p className="text-gray-500">
            Plan future courses • Max {effectiveMaxCredits} credits/semester
            {canOverload && <span className="text-green-600 ml-2">(Overload eligible - CPI ≥ 7.0)</span>}
            {!canOverload && cpi > 0 && <span className="text-orange-600 ml-2">(Need CPI ≥ 7.0 for overload)</span>}
          </p>
        </div>
        <button 
          onClick={() => { setEditingCourse(null); setModalOpen(true); }} 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          + Add Planned Course
        </button>
      </div>

      {/* Planning Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm">Total Planned Credits</div>
          <div className="text-2xl font-bold text-purple-600">{getTotalPlannedCredits()}</div>
          <div className="text-gray-500 text-sm">{plannedCourses.length} courses planned</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm">Remaining Semesters (est.)</div>
          <div className="text-2xl font-bold text-blue-600">{getTotalRemainingSemesters()}</div>
          <div className="text-gray-500 text-sm">Assuming 8-semester track</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm">Current CPI</div>
          <div className="text-2xl font-bold text-green-600">{cpi.toFixed(2)}</div>
          <div className="text-gray-500 text-sm">
            {canOverload ? '✓ Eligible for overload' : 'Need CPI ≥ 7.0 for overload'}
          </div>
        </div>
      </div>

      {sortedSemesters.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No planned courses yet. Start planning your future semesters!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedSemesters.map(semester => {
            const credits = getSemesterCredits(semester);
            const isOverLimit = credits > effectiveMaxCredits;
            const isCloseToLimit = credits > NORMAL_CREDITS_PER_SEMESTER && credits <= effectiveMaxCredits;
            
            return (
              <div 
                key={semester} 
                className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${
                  isOverLimit ? 'border-red-500' : isCloseToLimit ? 'border-yellow-500' : 'border-purple-500'
                }`}
              >
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{semester}</h2>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isOverLimit ? 'bg-red-100 text-red-800' : 
                      isCloseToLimit ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {credits} / {effectiveMaxCredits} credits
                    </span>
                    {isCloseToLimit && !isOverLimit && (
                      <p className="text-xs text-yellow-600 mt-1">Close to limit</p>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  {groupedBySemester[semester].map(course => (
                    <div key={course._id} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">
                          <span className="font-mono text-sm text-gray-500">{course.courseCode}</span>
                          <span className="ml-2">{course.courseName}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.credits} credits • {course.basketType}
                          {course.isHonoursCourse && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1 rounded">Honours</span>}
                          {course.isMinorCourse && <span className="ml-2 text-xs bg-green-100 text-green-700 px-1 rounded">Minor</span>}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button 
                          onClick={() => { setEditingCourse(course); setModalOpen(true); }} 
                          className="text-iitgn-blue text-sm hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course._id)} 
                          className="text-red-600 text-sm hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {isOverLimit && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700">⚠️ This semester exceeds the maximum of {effectiveMaxCredits} credits.</p>
                      <p className="text-xs text-red-600 mt-1">Consider moving some courses to another semester or requesting overload approval from faculty advisor.</p>
                    </div>
                  )}
                  
                  {!isOverLimit && credits < NORMAL_CREDITS_PER_SEMESTER && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">💡 You have {NORMAL_CREDITS_PER_SEMESTER - credits} credits available for additional courses this semester.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recommendation Section */}
      {sortedSemesters.length > 0 && getTotalPlannedCredits() > 0 && (
        <div className="mt-8 bg-blue-50 rounded-lg p-5">
          <h3 className="font-semibold text-blue-800 mb-2">📋 Planning Recommendations</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Normal academic load: {NORMAL_CREDITS_PER_SEMESTER} credits per semester</li>
            <li>Maximum load without overload: {MAX_CREDITS_PER_SEMESTER} credits</li>
            <li>Overload (up to 32 credits) requires CPI ≥ 7.0 and faculty advisor approval</li>
            <li>Don't forget to register for Comprehensive Viva Voce (IN101-108) every active semester</li>
            <li>External exposure (IN498) can count up to 16 credits towards graduation</li>
          </ul>
        </div>
      )}

      <AddEditPlannedModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingCourse(null); }}
        onSubmit={handleAddCourse}
        course={editingCourse}
      />
    </div>
  );
}
