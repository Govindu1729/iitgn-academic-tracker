// frontend/src/utils/departmentDetector.js
export const detectDepartment = (courseCode) => {
  const prefix = courseCode.substring(0, 2).toUpperCase();
  
  const deptMap = {
    'CS': 'CSE',
    'AI': 'AI',
    'EE': 'EE',
    'ME': 'ME',
    'CE': 'CE',
    'CL': 'CL',
    'MS': 'MSE',
    'IC': 'ICDT',
    'PH': 'Physics',
    'CH': 'Chemistry',
    'MA': 'Maths',
    'CG': 'Cognitive Science',
    'BE': 'Biology',
    'EH': 'Earth Sciences',
    'HS': 'HSS',
    'ES': 'Institute',
    'FP': 'Institute',
    'IN': 'Institute',
    'PE': 'Institute',
    'GE': 'Institute'
  };
  
  return deptMap[prefix] || 'Institute';
};

export const detectBasketType = (courseCode, courseName) => {
  const code = courseCode.toUpperCase();
  const name = courseName.toLowerCase();
  
  // HSS courses
  if (code.startsWith('HS') || name.includes('writing') || name.includes('philosophy') || 
      name.includes('economics') || name.includes('civilization') || name.includes('language')) {
    return 'HSS';
  }
  
  // Science Basket
  if (code.startsWith('PH') || code.startsWith('CH') || code.startsWith('CG') || code.startsWith('EH')) {
    return 'Science Basket';
  }
  
  // Mathematics Basket
  if (code.startsWith('MA') && (code.includes('205') || code.includes('206') || code.includes('204'))) {
    return 'Mathematics Basket';
  }
  
  // Materials Basket
  if (code === 'ES118' || code === 'MSE211' || code === 'MSE314') {
    return 'Materials Basket';
  }
  
  // General Education
  if (code.startsWith('GE')) {
    return 'General Education';
  }
  
  // Project
  if (name.includes('project') || code.includes('499') || code.includes('399') || code.includes('299')) {
    return 'Project';
  }
  
  // Default to Institute Core for first/second year courses
  return 'Institute Core';
};
