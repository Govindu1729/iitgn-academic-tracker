// backend/data/programRequirements.js
// Complete dynamic program requirements for IITGN

// ==================== BASE DISCIPLINE DEFINITIONS ====================
const DISCIPLINE_BASE = {
  CSE: {
    name: 'Computer Science & Engineering',
    code: 'CSE',
    totalCredits: 170,
    disciplineCoreCredits: 36,
    disciplineCoreCourses: [
      'CS201', 'CS202', 'CS328', 'CS329', 'CS330', 'CS331',
      'ES301', 'ES336', 'ES242', 'ES214'
    ],
    disciplineElectiveCredits: 26,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 36, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 26, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  AI: {
    name: 'Artificial Intelligence',
    code: 'AI',
    totalCredits: 172,
    disciplineCoreCredits: 44,
    disciplineCoreCourses: [
      'CS203', 'CS303', 'CS329', 'ES119', 'ES214', 'ES242',
      'ES301', 'ES335', 'ES336'
    ],
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 44, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  EE: {
    name: 'Electrical Engineering',
    code: 'EE',
    totalCredits: 172,
    disciplineCoreCredits: 44,
    disciplineCoreCourses: [
      'EE221', 'EE223', 'EE224', 'EE225', 'EE226', 'EE227',
      'EE312', 'EE322', 'EE323', 'EE333', 'EE341'
    ],
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 44, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  ME: {
    name: 'Mechanical Engineering',
    code: 'ME',
    totalCredits: 172,
    disciplineCoreCredits: 44,
    disciplineCoreCourses: [
      'ME206', 'ME207', 'ME208', 'ME209', 'ME333', 'ME334',
      'ME335', 'ME337', 'ME362'
    ],
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 44, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  CL: {
    name: 'Chemical Engineering',
    code: 'CL',
    totalCredits: 170,
    disciplineCoreCredits: 42,
    disciplineCoreCourses: [
      'CL201', 'CL202', 'CL203', 'CL204', 'CL205', 'CL313',
      'CL314', 'CL315', 'CL316', 'CL317', 'CL325', 'CL326', 'CL327'
    ],
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 42, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  CE: {
    name: 'Civil Engineering',
    code: 'CE',
    totalCredits: 170,
    disciplineCoreCredits: 42,
    disciplineCoreCourses: [
      'CE201', 'CE202', 'CE203', 'CE301', 'CE302', 'CE310',
      'CE311', 'CE312', 'CE313', 'CE314', 'CE403', 'CE404'
    ],
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 42, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  MSE: {
    name: 'Materials Engineering',
    code: 'MSE',
    totalCredits: 170,
    disciplineCoreCredits: 42,
    disciplineCoreCourses: [
      'MSE202', 'MSE204', 'MSE205', 'MSE206', 'MSE207', 'MSE210',
      'MSE302', 'MSE304', 'MSE307', 'MSE312', 'MSE313', 'MSE315'
    ],
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 42, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  ICDT: {
    name: 'Integrated Circuit Design & Technology',
    code: 'ICDT',
    totalCredits: 172,
    disciplineCoreCredits: 44,
    disciplineCoreCourses: [
      'EE221', 'EE226', 'EE227', 'EE312', 'EE322',
      'EE323', 'ES626', 'EE617', 'EE651'
    ],
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 44, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  }
};

// ==================== COURSE CREDIT MAP ====================
const COURSE_CREDITS = {
  // CSE Core
  'CS201': 4, 'CS202': 4, 'CS203': 4, 'CS303': 4,
  'CS328': 4, 'CS329': 4, 'CS330': 4, 'CS331': 4,
  'CS327': 5, 'CS431': 4, 'CS432': 4, 'CS434': 4,
  
  // Institute Core
  'ES101': 3, 'ES112': 3, 'ES115': 5, 'ES116': 5,
  'ES117': 2, 'ES118': 3, 'ES119': 4, 'ES211': 3,
  'ES212': 4, 'ES214': 4, 'ES221': 4, 'ES242': 4,
  'ES243': 4, 'ES244': 4, 'ES245': 4, 'ES301': 4,
  'ES336': 4, 'MA103': 4, 'BS192': 3, 'FP100': 4,
  
  // EE Core
  'EE221': 3, 'EE223': 4, 'EE224': 4, 'EE225': 2,
  'EE226': 4, 'EE227': 4, 'EE312': 4, 'EE322': 4,
  'EE323': 4, 'EE333': 4, 'EE341': 4, 'EE313': 3,
  
  // ME Core
  'ME206': 4, 'ME207': 5, 'ME208': 2, 'ME209': 3,
  'ME333': 3, 'ME334': 4, 'ME335': 3, 'ME337': 3,
  'ME362': 3,
  
  // CL Core
  'CL201': 3, 'CL202': 3, 'CL203': 3, 'CL204': 3,
  'CL205': 3, 'CL313': 3, 'CL314': 3, 'CL315': 3,
  'CL316': 3, 'CL317': 4, 'CL325': 3, 'CL326': 3,
  'CL327': 2,
  
  // CE Core
  'CE201': 2, 'CE202': 3, 'CE203': 3, 'CE301': 5,
  'CE302': 4, 'CE310': 4, 'CE311': 5, 'CE312': 4,
  'CE313': 4, 'CE314': 4, 'CE403': 4, 'CE404': 4,
  
  // MSE Core
  'MSE202': 4, 'MSE204': 4, 'MSE205': 4, 'MSE206': 4,
  'MSE207': 4, 'MSE210': 4, 'MSE302': 4, 'MSE304': 4,
  'MSE307': 4, 'MSE312': 2, 'MSE313': 4, 'MSE315': 4,
  
  // ICDT Core
  'ES626': 4, 'EE617': 4, 'EE651': 4,
  
  // HSS
  'HS151': 4, 'HS191': 2, 'HS192': 2, 'HS221': 4,
  'HS201': 4, 'HS103': 4, 'HS104': 4,
  
  // Science
  'PH201': 4, 'PH202': 4, 'PH203': 4, 'CH203': 4,
  'CH302': 4, 'CG503': 4, 'CG505': 4, 'EH303': 4,
  'EH304': 2, 'BS401': 4,
  
  // Math
  'MA104': 2, 'MA203': 2, 'MA204': 2, 'MA205': 2,
  'MA206': 2,
  
  // GE
  'GE101': 2, 'GE201': 2,
  
  // Projects
  'OPC': 4, 'IN498': 4, 'XX299': 4, 'XX399': 4, 'XX499': 4,
  
  // PE
  'PE101': 0, 'PE102': 0, 'PE103': 0, 'PE104': 0,
  
  // Viva
  'IN101': 0, 'IN102': 0, 'IN103': 0, 'IN104': 0,
  'IN105': 0, 'IN106': 0, 'IN107': 0, 'IN108': 0
};

// ==================== PROGRAM TYPE DEFINITIONS ====================
const PROGRAM_TYPES = {
  BTech: {
    type: 'BTech',
    label: 'B.Tech (Single Major)',
    semesters: 8,
    maxDuration: 12,
    openElectiveReduction: 0,
    additionalCredits: 0,
    eligibility: { minCPI: 0, minSemester: 1 }
  },
  DualMajor: {
    type: 'DualMajor',
    label: 'B.Tech with Dual Major',
    semesters: 12,
    maxDuration: 12,
    openElectiveReduction: 4,
    additionalCredits: 'dynamic',
    eligibility: { minCPI: 6.5, minSemester: 3, maxSemester: 6, noFailGrades: true }
  },
  DualDegree: {
    type: 'DualDegree',
    label: 'B.Tech-M.Tech Dual Degree',
    semesters: 10,
    maxDuration: 14,
    openElectiveReduction: 4,
    additionalCredits: 72,
    eligibility: { minCPI: 6.0, minSemester: 4, maxSemester: 6 }
  },
  MScDual: {
    type: 'MScDual',
    label: 'B.Tech-M.Sc Dual Degree',
    semesters: 10,
    maxDuration: 14,
    openElectiveReduction: 4,
    additionalCredits: 72,
    eligibility: { minCPI: 6.0, minSemester: 4, maxSemester: 6 }
  }
};

// ==================== CORE FUNCTIONS ====================

/**
 * Calculate total credits for a list of course codes
 */
function calculateCourseCredits(courseCodes) {
  let total = 0;
  courseCodes.forEach(code => {
    total += COURSE_CREDITS[code] || 0;
  });
  return total;
}

/**
 * Find common core courses between two disciplines
 */
function findCommonCoreCourses(primaryDiscipline, secondaryDiscipline) {
  const primary = DISCIPLINE_BASE[primaryDiscipline];
  const secondary = DISCIPLINE_BASE[secondaryDiscipline];
  
  if (!primary || !secondary) return [];
  
  const common = primary.disciplineCoreCourses.filter(
    course => secondary.disciplineCoreCourses.includes(course)
  );
  
  return common;
}

/**
 * Calculate additional credits needed for Dual Major
 */
function calculateDualMajorCredits(primaryDiscipline, secondaryDiscipline) {
  const primary = DISCIPLINE_BASE[primaryDiscipline];
  const secondary = DISCIPLINE_BASE[secondaryDiscipline];
  
  if (!primary || !secondary) {
    return { 
      additionalCredits: 0, 
      commonCredits: 0, 
      secondaryCoreCredits: 0,
      commonCourses: [],
      secondaryCoreCourses: []
    };
  }
  
  // Find common core courses
  const commonCourses = findCommonCoreCourses(primaryDiscipline, secondaryDiscipline);
  const commonCredits = calculateCourseCredits(commonCourses);
  
  // Total secondary core credits
  const secondaryCoreCredits = calculateCourseCredits(secondary.disciplineCoreCourses);
  
  // Additional credits needed (minimum 28 credits from secondary discipline)
  const additionalNeeded = Math.max(28, secondaryCoreCredits);
  
  return {
    additionalCredits: additionalNeeded,
    commonCredits: commonCredits,
    secondaryCoreCredits: secondaryCoreCredits,
    commonCourses: commonCourses,
    secondaryCoreCourses: secondary.disciplineCoreCourses
  };
}

/**
 * Generate complete program requirements
 */
function generateProgramRequirements(primaryDiscipline, programType, secondaryDiscipline = null) {
  const primary = DISCIPLINE_BASE[primaryDiscipline];
  if (!primary) throw new Error(`Discipline ${primaryDiscipline} not found`);
  
  const typeConfig = PROGRAM_TYPES[programType];
  if (!typeConfig) throw new Error(`Program type ${programType} not found`);
  
  // Start with primary discipline requirements
  const requirements = {
    programCode: `${programType}_${primaryDiscipline}${secondaryDiscipline ? `_${secondaryDiscipline}` : ''}`,
    programName: typeConfig.label,
    primaryDiscipline: primaryDiscipline,
    primaryDisciplineName: primary.name,
    secondaryDiscipline: secondaryDiscipline || null,
    programType: programType,
    semesters: typeConfig.semesters,
    maxDuration: typeConfig.maxDuration,
    openElectiveReduction: typeConfig.openElectiveReduction,
    eligibility: typeConfig.eligibility,
    basketRequirements: [],
    additionalInfo: {}
  };
  
  // Calculate total credits
  let totalCredits = primary.totalCredits;
  
  // Handle different program types
  if (programType === 'BTech') {
    totalCredits = primary.totalCredits;
  } 
  else if (programType === 'DualMajor' && secondaryDiscipline) {
    const dualInfo = calculateDualMajorCredits(primaryDiscipline, secondaryDiscipline);
    const additionalCredits = dualInfo.additionalCredits;
    totalCredits = primary.totalCredits + additionalCredits;
    requirements.additionalInfo = {
      additionalCredits: additionalCredits,
      commonCredits: dualInfo.commonCredits,
      secondaryCoreCredits: dualInfo.secondaryCoreCredits,
      commonCourses: dualInfo.commonCourses,
      secondaryCoreCourses: dualInfo.secondaryCoreCourses,
      note: `Need to complete ${dualInfo.secondaryCoreCredits} credits of core courses from ${DISCIPLINE_BASE[secondaryDiscipline].name}. ${dualInfo.commonCredits} credits common with primary discipline.`
    };
  }
  else if (programType === 'DualDegree' || programType === 'MScDual') {
    totalCredits = primary.totalCredits + 72;
    if (secondaryDiscipline) {
      const secondary = DISCIPLINE_BASE[secondaryDiscipline];
      if (secondary) {
        requirements.additionalInfo.secondaryDisciplineName = secondary.name;
        requirements.additionalInfo.mtechCredits = 72;
        requirements.additionalInfo.mtechCourseCredits = 24;
        requirements.additionalInfo.mtechThesisCredits = 32;
        requirements.additionalInfo.note = `72 additional credits for ${secondary.name} MTech component`;
      }
    }
  }
  
  // Build basket requirements
  const baskets = JSON.parse(JSON.stringify(primary.basketRequirements));
  
  // Adjust open elective
  const openElective = baskets.find(b => b.basketName === 'Open Elective');
  if (openElective) {
    openElective.minCredits = Math.max(0, openElective.minCredits - typeConfig.openElectiveReduction);
  }
  
  // Add secondary discipline requirements for Dual Major
  if (programType === 'DualMajor' && secondaryDiscipline) {
    const secondary = DISCIPLINE_BASE[secondaryDiscipline];
    if (secondary) {
      const dualInfo = calculateDualMajorCredits(primaryDiscipline, secondaryDiscipline);
      baskets.push({
        basketName: `Secondary Discipline Core (${secondaryDiscipline})`,
        minCredits: dualInfo.additionalCredits,
        isMandatory: true,
        isSecondary: true,
        secondaryDiscipline: secondaryDiscipline,
        courses: secondary.disciplineCoreCourses,
        commonCourses: dualInfo.commonCourses
      });
      
      requirements.additionalInfo.secondaryDisciplineName = secondary.name;
    }
  }
  
  // Add MTech/MSc requirements for Dual Degree
  if (programType === 'DualDegree') {
    baskets.push({
      basketName: 'MTech Courses',
      minCredits: 24,
      isMandatory: true,
      isMTech: true
    });
    baskets.push({
      basketName: 'MTech Thesis',
      minCredits: 32,
      isMandatory: true,
      isMTech: true
    });
  }
  
  if (programType === 'MScDual') {
    baskets.push({
      basketName: 'MSc Project',
      minCredits: 20,
      isMandatory: true,
      isMTech: true
    });
    baskets.push({
      basketName: 'MSc Coursework',
      minCredits: 52,
      isMandatory: true,
      isMTech: true
    });
  }
  
  requirements.totalCreditsRequired = totalCredits;
  requirements.basketRequirements = baskets;
  requirements.disciplineCoreCredits = primary.disciplineCoreCredits;
  requirements.disciplineElectiveCredits = primary.disciplineElectiveCredits;
  
  return requirements;
}

/**
 * Get all available disciplines with their details
 */
function getDisciplines() {
  return Object.keys(DISCIPLINE_BASE).map(key => ({
    code: key,
    name: DISCIPLINE_BASE[key].name,
    totalCredits: DISCIPLINE_BASE[key].totalCredits,
    disciplineCoreCredits: DISCIPLINE_BASE[key].disciplineCoreCredits,
    disciplineCoreCourses: DISCIPLINE_BASE[key].disciplineCoreCourses
  }));
}

/**
 * Get program types
 */
function getProgramTypes() {
  return Object.keys(PROGRAM_TYPES).map(key => ({
    code: key,
    label: PROGRAM_TYPES[key].label,
    semesters: PROGRAM_TYPES[key].semesters,
    additionalCredits: PROGRAM_TYPES[key].additionalCredits,
    eligibility: PROGRAM_TYPES[key].eligibility
  }));
}

/**
 * Get applicable program types for a user
 */
function getApplicableProgramTypes(discipline, userCPI = 0, currentSemester = 1, hasFailGrades = false) {
  const types = [];
  const base = DISCIPLINE_BASE[discipline];
  if (!base) return types;
  
  // BTech is always available
  types.push({
    ...PROGRAM_TYPES.BTech,
    isEligible: true,
    reason: 'Always eligible',
    isAvailable: true
  });
  
  // Check if other disciplines are available for Dual Major
  const otherDisciplines = Object.keys(DISCIPLINE_BASE).filter(d => d !== discipline);
  
  // Dual Major eligibility
  const dualMajor = PROGRAM_TYPES.DualMajor;
  let isEligible = true;
  const reasons = [];
  
  if (userCPI < dualMajor.eligibility.minCPI) {
    isEligible = false;
    reasons.push(`CPI must be ≥ ${dualMajor.eligibility.minCPI} (current: ${userCPI.toFixed(2)})`);
  }
  if (currentSemester < dualMajor.eligibility.minSemester) {
    isEligible = false;
    reasons.push(`Must complete at least ${dualMajor.eligibility.minSemester} semesters (currently in semester ${currentSemester})`);
  }
  if (currentSemester > dualMajor.eligibility.maxSemester) {
    isEligible = false;
    reasons.push(`Must apply by end of semester ${dualMajor.eligibility.maxSemester}`);
  }
  if (hasFailGrades && dualMajor.eligibility.noFailGrades) {
    isEligible = false;
    reasons.push('No fail grades allowed (F or E)');
  }
  
  types.push({
    ...dualMajor,
    isEligible,
    reason: isEligible ? 'Eligible' : reasons.join('; '),
    isAvailable: true,
    availableSecondaryDisciplines: otherDisciplines
  });
  
  // Dual Degree eligibility
  const dualDegree = PROGRAM_TYPES.DualDegree;
  let isEligibleDD = true;
  const reasonsDD = [];
  
  if (userCPI < dualDegree.eligibility.minCPI) {
    isEligibleDD = false;
    reasonsDD.push(`CPI must be ≥ ${dualDegree.eligibility.minCPI} (current: ${userCPI.toFixed(2)})`);
  }
  if (currentSemester < dualDegree.eligibility.minSemester) {
    isEligibleDD = false;
    reasonsDD.push(`Must complete at least ${dualDegree.eligibility.minSemester} semesters (currently in semester ${currentSemester})`);
  }
  if (currentSemester > dualDegree.eligibility.maxSemester) {
    isEligibleDD = false;
    reasonsDD.push(`Must apply by end of semester ${dualDegree.eligibility.maxSemester}`);
  }
  
  types.push({
    ...dualDegree,
    isEligible: isEligibleDD,
    reason: isEligibleDD ? 'Eligible' : reasonsDD.join('; '),
    isAvailable: true,
    availableSecondaryDisciplines: otherDisciplines
  });
  
  // MSc Dual Degree eligibility (same as Dual Degree)
  types.push({
    ...PROGRAM_TYPES.MScDual,
    isEligible: isEligibleDD,
    reason: isEligibleDD ? 'Eligible' : reasonsDD.join('; '),
    isAvailable: true,
    availableSecondaryDisciplines: otherDisciplines
  });
  
  return types;
}

// ==================== EXPORTS ====================
// Export all functions and constants
export {
  DISCIPLINE_BASE,
  COURSE_CREDITS,
  PROGRAM_TYPES,
  calculateCourseCredits,
  findCommonCoreCourses,
  calculateDualMajorCredits,
  generateProgramRequirements,
  getDisciplines,
  getProgramTypes,
  getApplicableProgramTypes
};

// Default export for backward compatibility
export default {
  DISCIPLINE_BASE,
  COURSE_CREDITS,
  PROGRAM_TYPES,
  calculateCourseCredits,
  findCommonCoreCourses,
  calculateDualMajorCredits,
  generateProgramRequirements,
  getDisciplines,
  getProgramTypes,
  getApplicableProgramTypes
};