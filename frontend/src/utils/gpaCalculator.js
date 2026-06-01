// frontend/src/utils/gpaCalculator.js
// IITGN 10-point CPI scale - UPDATED with your correct mapping
export const gradeToPoints = (grade) => {
  const map = {
    'A+': 11.0,
    'A': 10.0,
    'A-': 9.0,
    'B': 8.0,
    'B-': 7.0,
    'C': 6.0,
    'C-': 5.0,
    'D': 4.0,
    'F': 0.0,
    'P': null,
    'NP': null,
    'IP': null
  };
  return map[grade] !== undefined ? map[grade] : null;
};

// Rest of the file remains the same...
export const calculateCPI = (courses) => {
  const gradedCourses = courses.filter(c => !c.isPlanned && c.grade && gradeToPoints(c.grade) !== null);
  if (gradedCourses.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  gradedCourses.forEach(course => {
    const points = gradeToPoints(course.grade);
    if (points !== null) {
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    }
  });
  
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

export const calculateSemesterCPI = (courses) => {
  const semesterMap = {};
  
  courses.forEach(course => {
    if (!course.isPlanned && course.grade && gradeToPoints(course.grade) !== null) {
      const key = `${course.academicYear}-${course.semester}`;
      if (!semesterMap[key]) {
        semesterMap[key] = { points: 0, credits: 0 };
      }
      const points = gradeToPoints(course.grade);
      semesterMap[key].points += points * course.credits;
      semesterMap[key].credits += course.credits;
    }
  });
  
  const semesterCPI = {};
  Object.keys(semesterMap).forEach(key => {
    semesterCPI[key] = semesterMap[key].credits > 0 
      ? semesterMap[key].points / semesterMap[key].credits 
      : 0;
  });
  
  return semesterCPI;
};

export const calculateTotalCredits = (courses, includePlanned = false) => {
  return courses
    .filter(c => includePlanned ? true : !c.isPlanned)
    .reduce((sum, c) => sum + c.credits, 0);
};

export const getCreditsByBasket = (courses) => {
  const baskets = {};
  courses.forEach(course => {
    if (!course.isPlanned) {
      baskets[course.basketType] = (baskets[course.basketType] || 0) + course.credits;
    }
  });
  return baskets;
};
