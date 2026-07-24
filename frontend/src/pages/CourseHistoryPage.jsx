import { useState, useEffect } from 'react';
import { courseAPI, analyticsAPI } from '../services/api';
import AddEditCourseModal from '../components/AddEditCourseModal';
import BulkImportModal from '../components/BulkImportModal';
import { calculateCPI, calculateTotalCredits } from '../utils/gpaCalculator';
import { exportToExcel, exportGPAReport } from '../utils/exportExcel';
import toast from 'react-hot-toast';

export default function CourseHistoryPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [filterBasket, setFilterBasket] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cpi, setCpi] = useState(0);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [existingCourseCodes, setExistingCourseCodes] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await courseAPI.getAll();
      const completedCourses = res.data.filter(c => !c.isPlanned);
      setCourses(completedCourses);
      setCpi(calculateCPI(completedCourses));
      setExistingCourseCodes(completedCourses.map(c => c.courseCode));
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      if (editingCourse) {
        await courseAPI.update(editingCourse._id, courseData);
        toast.success('Course updated');
      } else {
        await courseAPI.create(courseData);
        toast.success('Course added');
      }
      fetchCourses();
      setEditingCourse(null);
    } catch (error) {
      toast.error('Failed to save course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Delete this course?')) {
      try {
        await courseAPI.delete(id);
        toast.success('Course deleted');
        fetchCourses();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleBulkImport = async (coursesToImport, semester, academicYear, options = {}) => {
    const { action = 'skip', duplicatesToReplace = [] } = options;
    let successCount = 0, failCount = 0, replaceCount = 0;
    
    if (action === 'replace' && duplicatesToReplace.length > 0) {
      for (const courseCode of duplicatesToReplace) {
        const existingCourse = courses.find(c => c.courseCode === courseCode);
        if (existingCourse) {
          try {
            await courseAPI.delete(existingCourse._id);
            replaceCount++;
          } catch (error) {}
        }
      }
      if (replaceCount > 0) toast.success(`Removed ${replaceCount} old course(s)`);
    }
    
    for (const course of coursesToImport) {
      try {
        await courseAPI.create({
          courseCode: course.courseCode,
          courseName: course.courseName,
          credits: course.credits,
          grade: course.grade || '',
          semester: semester || course.semester || 'I',
          academicYear: academicYear || course.academicYear || '2026-27',
          basketType: course.basketType || 'Discipline Core',
          department: course.department || 'Other',
          isPlanned: false
        });
        successCount++;
      } catch (error) {
        failCount++;
      }
    }
    
    toast.success(`Added ${successCount} courses${replaceCount ? `, replaced ${replaceCount}` : ''}`);
    fetchCourses();
  };

  const baskets = ['all', ...new Set(courses.map(c => c.basketType))];
  const filteredCourses = courses.filter(course => {
    const matchesBasket = filterBasket === 'all' || course.basketType === filterBasket;
    const matchesSearch = searchTerm === '' ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBasket && matchesSearch;
  });

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    const key = `${course.academicYear} Sem ${course.semester}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {});

  const sortedSemesters = Object.keys(groupedCourses).sort().reverse();
  const totalCredits = calculateTotalCredits(filteredCourses);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-4 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
        <div>
          <h1>Course History</h1>
          <p className="text-sm text-gray-500">CPI: <span className="font-semibold text-green-600">{cpi.toFixed(2)}</span> • Total: {totalCredits} credits</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setBulkImportOpen(true)} className="btn-responsive bg-blue-600 text-white hover:bg-blue-700">📋 Import</button>
          <button onClick={() => { setEditingCourse(null); setModalOpen(true); }} className="btn-responsive bg-blue-600 text-white hover:bg-blue-700">+ Add</button>
          <button onClick={async () => {
            try {
              const res = await courseAPI.exportCourses();
              const blob = new Blob([res.data], { type: res.headers['content-type'] || 'application/octet-stream' });
              let filename = 'courses.xlsx';
              const disposition = res.headers['content-disposition'];
              if (disposition) {
                const m = /filename="?([^";]+)"?/.exec(disposition);
                if (m && m[1]) filename = m[1];
              }
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
              toast.success('Exported courses');
            } catch (error) {
              toast.error('Failed to export courses');
            }
          }} className="btn-responsive bg-green-600 text-white hover:bg-green-700">⬇️ Export</button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />
          <select
            value={filterBasket}
            onChange={(e) => setFilterBasket(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            {baskets.map(basket => (
              <option key={basket} value={basket}>{basket === 'all' ? 'All Baskets' : basket}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course List */}
      {sortedSemesters.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
          <p className="text-gray-500">No courses added yet</p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {sortedSemesters.map(semester => {
            const semesterCourses = groupedCourses[semester];
            const semesterCredits = semesterCourses.reduce((sum, c) => sum + c.credits, 0);
            
            return (
              <div key={semester} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-100 px-4 md:px-6 py-2 md:py-3 flex justify-between items-center">
                  <h2 className="text-base md:text-xl font-semibold">{semester}</h2>
                  <span className="text-xs md:text-sm text-gray-500">{semesterCredits} credits</span>
                </div>
                <div className="table-responsive">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500">Code</th>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500">Course</th>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500">Credits</th>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500">Grade</th>
                        <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {semesterCourses.map(course => (
                        <tr key={course._id} className="hover:bg-gray-50">
                          <td className="px-3 md:px-6 py-2 md:py-3 font-mono text-xs md:text-sm">{course.courseCode}</td>
                          <td className="px-3 md:px-6 py-2 md:py-3 text-sm md:text-base truncate max-w-[120px] md:max-w-none">{course.courseName}</td>
                          <td className="px-3 md:px-6 py-2 md:py-3 text-sm">{course.credits}</td>
                          <td className="px-3 md:px-6 py-2 md:py-3 text-sm font-semibold">{course.grade || '-'}</td>
                          <td className="px-3 md:px-6 py-2 md:py-3">
                            <button onClick={() => { setEditingCourse(course); setModalOpen(true); }} className="text-blue-600 text-sm mr-2">Edit</button>
                            <button onClick={() => handleDeleteCourse(course._id)} className="text-red-600 text-sm">Del</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AddEditCourseModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingCourse(null); }} onSubmit={handleAddCourse} course={editingCourse} />
      <BulkImportModal isOpen={bulkImportOpen} onClose={() => setBulkImportOpen(false)} onImport={handleBulkImport} existingCourseCodes={existingCourseCodes} />
    </div>
  );
}
