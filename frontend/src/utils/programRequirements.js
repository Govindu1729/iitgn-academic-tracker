export const programList = {
  BTech_CSE: { name: 'B.Tech Computer Science & Engineering', totalCredits: 170 },
  BTech_AI: { name: 'B.Tech Artificial Intelligence', totalCredits: 172 },
  BTech_EE: { name: 'B.Tech Electrical Engineering', totalCredits: 172 },
  BTech_ME: { name: 'B.Tech Mechanical Engineering', totalCredits: 172 },
  BTech_ChemE: { name: 'B.Tech Chemical Engineering', totalCredits: 170 },
  BTech_Civil: { name: 'B.Tech Civil Engineering', totalCredits: 170 },
  BTech_MSE: { name: 'B.Tech Materials Engineering', totalCredits: 170 },
  BTech_ICDT: { name: 'B.Tech Integrated Circuit Design & Technology', totalCredits: 172 },
  BTech_MTech_Dual: { name: 'B.Tech-M.Tech Dual Degree', totalCredits: 242 }
};

export const basketLabels = {
  'Institute Core': { color: 'blue', description: 'Mandatory institute-level courses' },
  'HSS': { color: 'purple', description: 'Humanities & Social Sciences' },
  'Science Basket': { color: 'green', description: 'Science basket courses' },
  'Mathematics Basket': { color: 'orange', description: 'Mathematics basket courses' },
  'Materials Basket': { color: 'red', description: 'Materials Engineering basket' },
  'General Education': { color: 'pink', description: 'GE basket courses (Pass/Fail)' },
  'Discipline Core': { color: 'cyan', description: 'Department-specific core courses' },
  'Discipline Elective': { color: 'teal', description: 'Department-specific elective courses' },
  'Open Elective': { color: 'indigo', description: 'Open electives' },
  'Project': { color: 'orange', description: 'Project courses' }
};

export const basketOrder = [
  'Institute Core', 'HSS', 'Science Basket', 'Mathematics Basket', 'Materials Basket',
  'General Education', 'Discipline Core', 'Discipline Elective', 'Open Elective', 'Project'
];
