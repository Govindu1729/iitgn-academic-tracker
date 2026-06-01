export const courseCatalog = [
  { courseCode: 'ES101', courseName: 'Engineering Graphics', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES112', courseName: 'Computing', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'MA103', courseName: 'Calculus of Single Variable and Linear Algebra', credits: 4, basketType: 'Institute Core', department: 'Maths' },
  { courseCode: 'HS191', courseName: 'Introduction to Writing I', credits: 2, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'CS330', courseName: 'Operating Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS331', courseName: 'Computer Networks', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'EE322', courseName: 'Analog and Mixed Signal Circuits', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'ME334', courseName: 'Heat and Mass Transfer', credits: 4, basketType: 'Discipline Core', department: 'ME' },
];

export const searchCatalog = (query) => {
  if (!query || query.length < 2) return [];
  const searchTerm = query.toLowerCase();
  return courseCatalog.filter(course => 
    course.courseCode.toLowerCase().includes(searchTerm) ||
    course.courseName.toLowerCase().includes(searchTerm)
  ).slice(0, 8);
};
