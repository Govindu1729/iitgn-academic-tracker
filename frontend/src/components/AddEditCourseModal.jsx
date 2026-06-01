import { useState, useEffect } from 'react';
import CourseSearchInput from './CourseSearchInput';
import toast from 'react-hot-toast';

const basketOptions = [
  'Institute Core', 'HSS', 'Science Basket', 'Mathematics Basket', 'Materials Basket',
  'General Education', 'Discipline Core', 'Discipline Elective', 'Open Elective', 'Project'
];

export default function AddEditCourseModal({ isOpen, onClose, onSubmit, course = null }) {
  const [formData, setFormData] = useState({
    courseCode: '', courseName: '', credits: 3, grade: '', semester: 'I',
    academicYear: '2026-27', basketType: 'Discipline Core', department: 'Other', isPlanned: false
  });

  useEffect(() => {
    if (course) {
      setFormData({
        courseCode: course.courseCode || '', courseName: course.courseName, credits: course.credits,
        grade: course.grade || '', semester: course.semester, academicYear: course.academicYear || '2026-27',
        basketType: course.basketType, department: course.department || 'Other', isPlanned: course.isPlanned || false
      });
    } else {
      setFormData({
        courseCode: '', courseName: '', credits: 3, grade: '', semester: 'I',
        academicYear: '2026-27', basketType: 'Discipline Core', department: 'Other', isPlanned: false
      });
    }
  }, [course, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.courseCode || !formData.courseName) {
      toast.error('Please fill course code and name');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-4 md:px-6 py-3 md:py-4">
          <h2 className="text-lg md:text-xl font-bold">{course ? 'Edit Course' : 'Add Course'}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-3 md:space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course Code *</label>
            <CourseSearchInput
              value={formData.courseCode}
              onChange={(value) => setFormData({ ...formData, courseCode: value.toUpperCase() })}
              onSelect={(course) => setFormData({
                ...formData, courseCode: course.courseCode, courseName: course.courseName,
                credits: course.credits, basketType: course.basketType, department: course.department
              })}
              placeholder="Search by code or name..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input type="text" value={formData.courseName} onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm" required />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Credits</label>
              <input type="number" step="0.5" min="0.5" max="6" value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Grade</label>
              <select value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">Not graded</option>
                <option value="A+">A+ (11.0)</option><option value="A">A (10.0)</option>
                <option value="A-">A- (9.0)</option><option value="B">B (8.0)</option>
                <option value="B-">B- (7.0)</option><option value="C">C (6.0)</option>
                <option value="C-">C- (5.0)</option><option value="D">D (4.0)</option>
                <option value="F">F (0.0)</option><option value="P">P (Pass)</option><option value="NP">NP</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>
              <select value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="I">I</option><option value="II">II</option><option value="Summer">Summer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Academic Year</label>
              <select value={formData.academicYear} onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm">
                <option>2024-25</option><option>2025-26</option><option>2026-27</option>
                <option>2027-28</option><option>2028-29</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Basket</label>
            <select value={formData.basketType} onChange={(e) => setFormData({ ...formData, basketType: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm">
              {basketOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
          
          <div className="flex gap-3 pt-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-300 rounded-lg text-sm">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">{course ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
