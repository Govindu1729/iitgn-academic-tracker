// frontend/src/components/AddEditPlannedModal.jsx
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import CourseSearchInput from './CourseSearchInput';

const basketOptions = [
  'Institute Core', 'HSS', 'Science Basket', 'Mathematics Basket', 'Materials Basket',
  'General Education', 'Discipline Core', 'Discipline Elective', 'Open Elective', 
  'Project', 'External Exposure', 'Honours', 'Minor'
];

const semesterOptions = ['I', 'II', 'Summer'];
const academicYearOptions = ['2024-25', '2025-26', '2026-27', '2027-28', '2028-29'];

export default function AddEditPlannedModal({ isOpen, onClose, onSubmit, course = null }) {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    credits: 3,
    semester: 'I',
    academicYear: '2026-27',
    basketType: 'Discipline Core',
    department: 'Other',
    isPlanned: true,
    isHonoursCourse: false,
    isMinorCourse: false
  });

  useEffect(() => {
    if (course) {
      setFormData({
        courseCode: course.courseCode || '',
        courseName: course.courseName,
        credits: course.credits,
        semester: course.semester,
        academicYear: course.academicYear || '2026-27',
        basketType: course.basketType,
        department: course.department || 'Other',
        isPlanned: true,
        isHonoursCourse: course.isHonoursCourse || false,
        isMinorCourse: course.isMinorCourse || false
      });
    } else {
      setFormData({
        courseCode: '',
        courseName: '',
        credits: 3,
        semester: 'I',
        academicYear: '2026-27',
        basketType: 'Discipline Core',
        department: 'Other',
        isPlanned: true,
        isHonoursCourse: false,
        isMinorCourse: false
      });
    }
  }, [course, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.courseCode || !formData.courseName) {
      toast.error('Please fill course code and name');
      return;
    }
    onSubmit({ ...formData, grade: '', isPlanned: true });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{course ? 'Edit Planned Course' : 'Add Planned Course'}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Course Code with Autocomplete */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Course Code *</label>
            <CourseSearchInput
              value={formData.courseCode}
              onChange={(value) => setFormData({ ...formData, courseCode: value.toUpperCase() })}
              onSelect={(selectedCourse) => {
                setFormData({
                  ...formData,
                  courseCode: selectedCourse.courseCode,
                  courseName: selectedCourse.courseName,
                  credits: selectedCourse.credits,
                  basketType: selectedCourse.basketType,
                  department: selectedCourse.department
                });
              }}
              placeholder="Search by course code or name..."
            />
          </div>
          
          {/* Course Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Course Name *</label>
            <input
              type="text"
              placeholder="e.g., Operating Systems"
              value={formData.courseName}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
              required
            />
          </div>
          
          {/* Credits */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Credits *</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="6"
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
              required
            />
          </div>
          
          {/* Semester and Academic Year */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Target Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
              >
                {semesterOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Academic Year</label>
              <select
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
              >
                {academicYearOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Basket Type */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category / Basket</label>
            <select
              value={formData.basketType}
              onChange={(e) => setFormData({ ...formData, basketType: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
            >
              {basketOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          
          {/* Department */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
            >
              <option value="CSE">CSE</option>
              <option value="AI">AI</option>
              <option value="EE">EE</option>
              <option value="ME">ME</option>
              <option value="ChemE">ChemE</option>
              <option value="Civil">Civil</option>
              <option value="MSE">MSE</option>
              <option value="ICDT">ICDT</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Maths">Maths</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          {/* Honours/Minor Checkboxes */}
          <div className="space-y-2 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isHonoursCourse}
                onChange={(e) => setFormData({ ...formData, isHonoursCourse: e.target.checked })}
                className="mr-2"
              />
              <span className="text-gray-700">Counts towards Honours (+20 credits)</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isMinorCourse}
                onChange={(e) => setFormData({ ...formData, isMinorCourse: e.target.checked })}
                className="mr-2"
              />
              <span className="text-gray-700">Counts towards Minor (+20 credits)</span>
            </label>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              {course ? 'Update Plan' : 'Add to Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
