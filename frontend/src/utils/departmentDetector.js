// frontend/src/utils/departmentDetector.js

/**
 * Detect department based on course code prefix
 * Maps course code prefixes to department names
 */
export const detectDepartment = (courseCode) => {
  const code = courseCode.toUpperCase().replace(/[^A-Z]/g, '');
  
  // Full department mapping with all variations
  const deptMap = {
    // Engineering Disciplines
    'CS': 'CSE',
    'AI': 'AI',
    'EE': 'EE',
    'ME': 'ME',
    'CE': 'CE',
    'CL': 'CL',
    'MSE': 'MSE',
    'MS': 'MSE',
    'ICDT': 'ICDT',
    'IC': 'ICDT',
    
    // Sciences
    'PH': 'Physics',
    'CH': 'Chemistry',
    'MA': 'Maths',
    'CG': 'Cognitive Science',
    'BE': 'Biological',
    'EH': 'Earth Sciences',
    
    // Humanities & Social Sciences
    'HS': 'HSS',
    'DES': 'Design',
    'MSM': 'Management',
    'MS': 'Management',
    
    // Institute Core
    'ES': 'Institute',
    'FP': 'Institute',
    'IN': 'Institute',
    'PE': 'Institute',
    'GE': 'Institute',
    'BS': 'Institute',
    'OPC': 'Institute',
    'XX': 'Institute'
  };
  
  // Try exact match first
  if (deptMap[code]) return deptMap[code];
  
  // Try prefix match (first 2 characters)
  const prefix = code.substring(0, 2);
  if (deptMap[prefix]) return deptMap[prefix];
  
  // Try prefix match (first 3 characters)
  const prefix3 = code.substring(0, 3);
  if (deptMap[prefix3]) return deptMap[prefix3];
  
  return 'Institute';
};

/**
 * Detect basket type based on course code and name
 * Uses IITGN basket categorization rules
 */
export const detectBasketType = (courseCode, courseName) => {
  const code = courseCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const name = courseName.toLowerCase();
  
  // ==================== INSTITUTE CORE ====================
  const instituteCoreCourses = [
    'FP100', 'FP501', 'FP601', 'FP602', 'FP602CH', 'FP602PH',
    'ES101', 'ES112', 'ES113', 'ES114', 'ES115', 'ES116', 'ES117', 
    'ES118', 'ES119', 'ES202', 'ES204', 'ES211', 'ES212', 'ES214',
    'ES221', 'ES242', 'ES243', 'ES244', 'ES245', 'ES246', 'ES247',
    'ES301', 'ES332', 'ES333', 'ES335', 'ES336', 'ES337',
    'MA103', 'MA203', 'BS191', 'BS192',
    'PE101', 'PE102', 'PE103', 'PE104', 'PE500', 'PE600',
    'IN101', 'IN102', 'IN103', 'IN104', 'IN105', 'IN106', 'IN107', 'IN108'
  ];
  
  if (instituteCoreCourses.includes(code)) {
    return 'Institute Core';
  }
  
  // ==================== HSS BASKET ====================
  // All HS courses are HSS
  if (code.startsWith('HS')) {
    return 'HSS';
  }
  
  // HSS keywords in course name
  const hssKeywords = [
    'writing', 'philosophy', 'economics', 'civilization', 'language',
    'french', 'japanese', 'mandarin', 'urdu', 'sanskrit', 'culture',
    'literature', 'history', 'anthropology', 'sociology', 'psychology',
    'linguistics', 'archaeology', 'political', 'development', 'humanism',
    'cinema', 'storytelling', 'ethics', 'leadership', 'communication',
    'postcolonial', 'anthropocene', 'indigenous', 'tribes', 'tourism',
    'environment', 'critical', 'theory', 'context', 'perspectives',
    'haunting', 'spectrality', 'comics', 'graphic', 'novels', 'visual',
    'digital', 'cultures', 'media', 'society', 'education', 'learning'
  ];
  
  if (hssKeywords.some(keyword => name.includes(keyword))) {
    return 'HSS';
  }
  
  // ==================== SCIENCE BASKET ====================
  // Physics courses
  if (code.startsWith('PH')) {
    return 'Science Basket';
  }
  
  // Chemistry courses
  if (code.startsWith('CH')) {
    return 'Science Basket';
  }
  
  // Cognitive Science courses
  if (code.startsWith('CG')) {
    return 'Science Basket';
  }
  
  // Earth Sciences courses
  if (code.startsWith('EH')) {
    return 'Science Basket';
  }
  
  // Biological Engineering science courses
  if (code.startsWith('BE') && !name.includes('engineering') && !name.includes('biotechnology')) {
    return 'Science Basket';
  }
  
  // ==================== MATHEMATICS BASKET ====================
  if (code.startsWith('MA') && (code.includes('204') || code.includes('205') || code.includes('206'))) {
    return 'Mathematics Basket';
  }
  
  // Mathematics basket keywords
  if (code.startsWith('MA') && (
    name.includes('calculus') || 
    name.includes('differential') || 
    name.includes('complex analysis') ||
    name.includes('variables')
  )) {
    return 'Mathematics Basket';
  }
  
  // ==================== MATERIALS BASKET ====================
  if (code === 'ES118' || code === 'MSE211' || code === 'MSE314') {
    return 'Materials Basket';
  }
  
  if (code.startsWith('MSE') && (
    name.includes('materials') || 
    name.includes('thermodynamics') || 
    name.includes('mechanical behaviour') ||
    name.includes('structure of materials')
  )) {
    return 'Materials Basket';
  }
  
  // ==================== GENERAL EDUCATION ====================
  if (code.startsWith('GE')) {
    return 'General Education';
  }
  
  // ==================== DISCIPLINE CORE ====================
  // CSE Core
  const cseCore = [
    'CS201', 'CS202', 'CS203', 'CS303', 'CS328', 'CS329', 
    'CS330', 'CS331', 'CS332', 'CS333', 'ES242', 'ES301', 'ES336'
  ];
  if (cseCore.includes(code)) {
    return 'Discipline Core';
  }
  
  // EE Core
  const eeCore = [
    'EE221', 'EE223', 'EE224', 'EE225', 'EE226', 'EE227',
    'EE311', 'EE312', 'EE313', 'EE321', 'EE322', 'EE323',
    'EE332', 'EE333', 'EE341', 'EE411', 'EE431'
  ];
  if (eeCore.includes(code)) {
    return 'Discipline Core';
  }
  
  // ME Core
  const meCore = [
    'ME206', 'ME207', 'ME208', 'ME209', 'ME321', 'ME322',
    'ME331', 'ME332', 'ME333', 'ME334', 'ME335', 'ME337',
    'ME351', 'ME352', 'ME361', 'ME362', 'ME461', 'ME462'
  ];
  if (meCore.includes(code)) {
    return 'Discipline Core';
  }
  
  // CL Core
  const clCore = [
    'CL201', 'CL202', 'CL203', 'CL204', 'CL205', 'CL221',
    'CL313', 'CL314', 'CL315', 'CL316', 'CL317', 'CL321',
    'CL322', 'CL325', 'CL326', 'CL327', 'CL328', 'CL351',
    'CL352', 'CL422', 'CL424', 'CL425', 'CL451'
  ];
  if (clCore.includes(code)) {
    return 'Discipline Core';
  }
  
  // CE Core
  const ceCore = [
    'CE201', 'CE202', 'CE203', 'CE301', 'CE302', 'CE303',
    'CE304', 'CE305', 'CE306', 'CE307', 'CE308', 'CE309',
    'CE310', 'CE311', 'CE312', 'CE313', 'CE314', 'CE315',
    'CE401', 'CE402', 'CE403', 'CE404'
  ];
  if (ceCore.includes(code)) {
    return 'Discipline Core';
  }
  
  // MSE Core
  const mseCore = [
    'MSE202', 'MSE203', 'MSE204', 'MSE205', 'MSE206', 'MSE207',
    'MSE210', 'MSE302', 'MSE303', 'MSE304', 'MSE305', 'MSE307',
    'MSE310', 'MSE312', 'MSE313', 'MSE314', 'MSE315', 'MSE316',
    'MSE352', 'MSE355', 'MSE402'
  ];
  if (mseCore.includes(code)) {
    return 'Discipline Core';
  }
  
  // ICDT Core
  const icdtCore = [
    'EE221', 'EE226', 'EE227', 'EE312', 'EE322',
    'EE323', 'ES626', 'EE617', 'EE651'
  ];
  if (icdtCore.includes(code)) {
    return 'Discipline Core';
  }
  
  // ==================== DISCIPLINE ELECTIVE ====================
  // CSE Electives
  const cseElective = [
    'CS327', 'CS431', 'CS432', 'CS434', 'CS435', 'CS436',
    'CS607', 'CS610', 'CS612', 'CS613', 'CS614', 'CS615',
    'CS616', 'CS617', 'CS618', 'CS619', 'CS620', 'CS621',
    'ES335', 'ES404', 'ES413', 'ES417', 'ES645', 'ES661',
    'ES666', 'ES667', 'ES670'
  ];
  if (cseElective.includes(code)) {
    return 'Discipline Elective';
  }
  
  // EE Electives
  const eeElective = [
    'EE426', 'EE604', 'EE605', 'EE609', 'EE611', 'EE617',
    'EE618', 'EE619', 'EE629', 'EE639', 'EE644', 'EE648',
    'EE651', 'EE652', 'EE653', 'EE654', 'EE655', 'EE656',
    'EE657', 'EE658', 'EE659', 'EE660', 'EE663', 'EE664',
    'EE665', 'EE666', 'EE667', 'EE668', 'EE670', 'ES414',
    'ES416', 'ES608', 'ES612', 'ES616', 'ES626', 'ES641',
    'ES655', 'ES657', 'ES663', 'ES665', 'ES675', 'ES676',
    'ES677'
  ];
  if (eeElective.includes(code)) {
    return 'Discipline Elective';
  }
  
  // ME Electives
  const meElective = [
    'ME491I', 'ME605', 'ME606', 'ME628', 'ME639', 'ME640',
    'ME643', 'ME645', 'ME646', 'ME647', 'ME648', 'ES408',
    'ES607', 'ES613', 'ES621', 'ES624', 'ES632', 'ES642',
    'ES646', 'ES648', 'ES651', 'ES653', 'ES656', 'ES671',
    'ES332'
  ];
  if (meElective.includes(code)) {
    return 'Discipline Elective';
  }
  
  // CL Electives
  const clElective = [
    'CL324', 'CL353', 'CL426', 'CL427', 'CL492I', 'CL601',
    'CL602', 'CL604', 'CL605', 'CL627', 'CL628', 'CL629',
    'CL630', 'CL631', 'ES604', 'ES617', 'ES635', 'ES658',
    'ES662', 'ES664'
  ];
  if (clElective.includes(code)) {
    return 'Discipline Elective';
  }
  
  // CE Electives
  const ceElective = [
    'CE491', 'CE601', 'CE602', 'CE605', 'CE607', 'CE611',
    'CE615', 'CE622', 'CE625', 'CE627', 'CE628', 'CE629',
    'CE632', 'CE633', 'CE634', 'CE635', 'CE636', 'CE637',
    'CE638', 'ES622'
  ];
  if (ceElective.includes(code)) {
    return 'Discipline Elective';
  }
  
  // MSE Electives
  const mseElective = [
    'MSE403', 'MSE602', 'MSE603', 'MSE604', 'MSE605',
    'MSE621', 'MSE622', 'MSE627', 'MSE629', 'MSE631',
    'MSE632', 'MSE633A', 'MSE634', 'MSE635', 'ES415',
    'ES623'
  ];
  if (mseElective.includes(code)) {
    return 'Discipline Elective';
  }
  
  // ==================== OPEN ELECTIVE ====================
  // Design courses
  if (code.startsWith('DES')) {
    return 'Open Elective';
  }
  
  // Management courses
  if (code.startsWith('MS')) {
    return 'Open Elective';
  }
  
  // Special Topics and other open electives
  const openElectiveKeywords = [
    'special topics', 'special topic', 'elective', 'open elective',
    'foundations', 'introduction to', 'perspectives', 'principles'
  ];
  
  if (openElectiveKeywords.some(keyword => name.includes(keyword))) {
    return 'Open Elective';
  }
  
  // ==================== PROJECT ====================
  if (code === 'OPC' || code === 'IN498') {
    return 'Project';
  }
  
  if (code.includes('299') || code.includes('399') || code.includes('499')) {
    return 'Project';
  }
  
  if (name.includes('project') || name.includes('thesis') || name.includes('capstone')) {
    return 'Project';
  }
  
  // ==================== EXTERNAL EXPOSURE ====================
  if (code === 'IN498') {
    return 'External Exposure';
  }
  
  // ==================== DEFAULT ====================
  // If it's an ES course not caught above
  if (code.startsWith('ES')) {
    return 'Institute Core';
  }
  
  // If it's an advanced course with no specific basket
  if (code.match(/^[A-Z]{2,4}\d{3}/)) {
    // Check if it's likely a discipline elective
    if (code.startsWith('CS') || code.startsWith('EE') || 
        code.startsWith('ME') || code.startsWith('CL') || 
        code.startsWith('CE') || code.startsWith('MSE')) {
      return 'Discipline Elective';
    }
  }
  
  // Default fallback
  return 'Institute Core';
};

/**
 * Get all available departments for dropdown selection
 */
export const getAllDepartments = () => {
  return [
    'CSE', 'AI', 'EE', 'ME', 'CL', 'CE', 'MSE', 'ICDT',
    'Physics', 'Chemistry', 'Maths', 'Biological', 'Cognitive Science',
    'Earth Sciences', 'HSS', 'Design', 'Management', 'Institute'
  ];
};

/**
 * Get basket types for dropdown selection
 */
export const getAllBasketTypes = () => {
  return [
    'Institute Core',
    'HSS',
    'Science Basket',
    'Mathematics Basket',
    'Materials Basket',
    'General Education',
    'Discipline Core',
    'Discipline Elective',
    'Open Elective',
    'Project',
    'External Exposure'
  ];
};

/**
 * Check if a course is likely a core course based on code
 */
export const isCoreCourse = (courseCode) => {
  const code = courseCode.toUpperCase();
  
  // Check if it's in any discipline core list
  const corePatterns = [
    /^CS[23]\d{2}/, // CS201-399
    /^EE[23]\d{2}/, // EE201-399
    /^ME[23]\d{2}/, // ME201-399
    /^CL[23]\d{2}/, // CL201-399
    /^CE[23]\d{2}/, // CE201-399
    /^MSE[23]\d{2}/, // MSE201-399
    /^ES[12][0-9]{2}/ // ES100-299
  ];
  
  return corePatterns.some(pattern => pattern.test(code));
};

/**
 * Get department code from full department name
 */
export const getDepartmentCode = (departmentName) => {
  const map = {
    'CSE': 'CS',
    'AI': 'AI',
    'EE': 'EE',
    'ME': 'ME',
    'CL': 'CL',
    'CE': 'CE',
    'MSE': 'MSE',
    'ICDT': 'ICDT',
    'Physics': 'PH',
    'Chemistry': 'CH',
    'Maths': 'MA',
    'Biological': 'BE',
    'Cognitive Science': 'CG',
    'Earth Sciences': 'EH',
    'HSS': 'HS',
    'Design': 'DES',
    'Management': 'MS',
    'Institute': 'ES'
  };
  
  return map[departmentName] || 'ES';
};