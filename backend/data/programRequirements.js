// backend/data/programRequirements.js
// Complete dynamic program requirements for IITGN
// Updated with all departments and courses

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
  },
  // ==================== NEW DEPARTMENTS ====================
  Physics: {
    name: 'Physics',
    code: 'Physics',
    totalCredits: 0, // Not a BTech discipline, only for course mapping
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  Chemistry: {
    name: 'Chemistry',
    code: 'Chemistry',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  Maths: {
    name: 'Mathematics',
    code: 'Maths',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  Biological: {
    name: 'Biological Engineering',
    code: 'Biological',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  'Cognitive Science': {
    name: 'Cognitive Science',
    code: 'Cognitive Science',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  'Earth Sciences': {
    name: 'Earth Sciences',
    code: 'Earth Sciences',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  HSS: {
    name: 'Humanities & Social Sciences',
    code: 'HSS',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  Design: {
    name: 'Design',
    code: 'Design',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  Management: {
    name: 'Management',
    code: 'Management',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  },
  Institute: {
    name: 'Institute Core',
    code: 'Institute',
    totalCredits: 0,
    disciplineCoreCredits: 0,
    disciplineCoreCourses: [],
    disciplineElectiveCredits: 0,
    basketRequirements: []
  }
};

// ==================== COURSE CREDIT MAP ====================
const COURSE_CREDITS = {
  // CSE Core
  'CS201': 4, 'CS202': 4, 'CS203': 4, 'CS303': 4,
  'CS328': 4, 'CS329': 4, 'CS330': 4, 'CS331': 4,
  'CS327': 5, 'CS431': 4, 'CS432': 4, 'CS434': 4,
  'CS435': 4, 'CS436': 2, 'CS607': 4, 'CS610': 4,
  'CS612': 4, 'CS613': 4, 'CS614': 4, 'CS615': 3,
  'CS616': 5, 'CS617': 4, 'CS618': 4, 'CS619': 4,
  'CS620': 4, 'CS621': 4, 'CS332': 4, 'CS333': 4,
  
  // Institute Core
  'ES101': 3, 'ES112': 3, 'ES113': 3, 'ES114': 3,
  'ES115': 5, 'ES116': 5, 'ES117': 2, 'ES118': 3,
  'ES119': 4, 'ES202': 4, 'ES204': 4, 'ES211': 3,
  'ES212': 4, 'ES214': 4, 'ES221': 4, 'ES242': 4,
  'ES243': 4, 'ES244': 4, 'ES245': 4, 'ES246': 2,
  'ES247': 4, 'ES301': 4, 'ES332': 4, 'ES333': 4,
  'ES335': 4, 'ES336': 4, 'ES337': 3, 'ES404': 4,
  'ES408': 4, 'ES410': 4, 'ES413': 4, 'ES414': 4,
  'ES415': 4, 'ES416': 4, 'ES417': 4, 'ES418': 4,
  'ES604': 4, 'ES606': 4, 'ES607': 4, 'ES608': 4,
  'ES612': 4, 'ES613': 4, 'ES616': 4, 'ES617': 4,
  'ES621': 4, 'ES622': 4, 'ES623': 4, 'ES624': 4,
  'ES626': 4, 'ES627': 4, 'ES632': 4, 'ES635': 4,
  'ES641': 4, 'ES642': 4, 'ES645': 4, 'ES646': 4,
  'ES648': 4, 'ES651': 4, 'ES653': 4, 'ES655': 4,
  'ES656': 4, 'ES657': 4, 'ES658': 4, 'ES661': 4,
  'ES662': 4, 'ES663': 4, 'ES664': 4, 'ES665': 4,
  'ES666': 4, 'ES667': 4, 'ES668': 4, 'ES670': 4,
  'ES671': 4, 'ES673': 4, 'ES675': 4, 'ES676': 4,
  'ES677': 4, 'MA103': 4, 'BS191': 4, 'BS192': 3,
  'FP100': 4, 'FP501': 2, 'FP601': 2, 'FP602': 4,
  'FP602(CH)': 4, 'FP602(PH)': 4,
  
  // EE Core
  'EE221': 3, 'EE223': 4, 'EE224': 4, 'EE225': 2,
  'EE226': 4, 'EE227': 4, 'EE311': 4, 'EE312': 4,
  'EE313': 3, 'EE321': 5, 'EE322': 4, 'EE323': 4,
  'EE332': 4, 'EE333': 4, 'EE341': 4, 'EE411': 4,
  'EE431': 2, 'EE426': 4, 'EE604': 4, 'EE605': 4,
  'EE609': 4, 'EE611': 4, 'EE617': 4, 'EE618': 2,
  'EE619': 4, 'EE629': 4, 'EE639': 4, 'EE644': 4,
  'EE648': 5, 'EE651': 4, 'EE652': 2, 'EE653': 2,
  'EE654': 4, 'EE655': 4, 'EE656': 2, 'EE657': 4,
  'EE658': 4, 'EE659': 4, 'EE660': 4, 'EE663': 4,
  'EE664': 4, 'EE665': 4, 'EE666': 4, 'EE667': 2,
  'EE668': 4, 'EE670': 4,
  
  // ME Core
  'ME206': 4, 'ME207': 5, 'ME208': 2, 'ME209': 3,
  'ME321': 4, 'ME322': 4, 'ME331': 4, 'ME332': 4,
  'ME333': 3, 'ME334': 4, 'ME335': 3, 'ME337': 3,
  'ME351': 2, 'ME352': 2, 'ME361': 2, 'ME362': 3,
  'ME461': 2, 'ME462': 4, 'ME491-I': 4, 'ME605': 4,
  'ME606': 4, 'ME628': 4, 'ME639': 4, 'ME640': 4,
  'ME643': 4, 'ME645': 4, 'ME646': 4, 'ME647': 4,
  'ME648': 4,
  
  // CL Core
  'CL201': 3, 'CL202': 3, 'CL203': 3, 'CL204': 3,
  'CL205': 3, 'CL221': 4, 'CL313': 3, 'CL314': 3,
  'CL315': 3, 'CL316': 3, 'CL317': 4, 'CL321': 4,
  'CL322': 4, 'CL325': 3, 'CL326': 3, 'CL327': 2,
  'CL328': 2, 'CL351': 2, 'CL352': 2, 'CL422': 4,
  'CL424': 3, 'CL425': 4, 'CL451': 2, 'CL324': 4,
  'CL353': 2, 'CL426': 4, 'CL427': 4, 'CL492-I': 2,
  'CL601': 4, 'CL602': 4, 'CL604': 4, 'CL605': 4,
  'CL627': 4, 'CL628': 4, 'CL629': 4, 'CL630': 4,
  'CL631': 4,
  
  // CE Core
  'CE201': 2, 'CE202': 3, 'CE203': 3, 'CE301': 5,
  'CE302': 4, 'CE303': 4, 'CE304': 4, 'CE305': 2,
  'CE306': 2, 'CE307': 2, 'CE308': 4, 'CE309': 2,
  'CE310': 4, 'CE311': 5, 'CE312': 4, 'CE313': 4,
  'CE314': 4, 'CE315': 4, 'CE401': 4, 'CE402': 4,
  'CE403': 4, 'CE404': 4, 'CE491': 4, 'CE601': 5,
  'CE602': 5, 'CE605': 4, 'CE607': 4, 'CE611': 4,
  'CE615': 4, 'CE622': 4, 'CE625': 4, 'CE627': 2,
  'CE628': 4, 'CE629': 4, 'CE632': 4, 'CE633': 4,
  'CE634': 4, 'CE635': 4, 'CE636': 4, 'CE637': 4,
  'CE638': 4,
  
  // MSE Core
  'MSE202': 4, 'MSE203': 4, 'MSE204': 4, 'MSE205': 4,
  'MSE206': 4, 'MSE207': 4, 'MSE210': 4, 'MSE302': 4,
  'MSE303': 5, 'MSE304': 4, 'MSE305': 4, 'MSE307': 4,
  'MSE310': 4, 'MSE312': 2, 'MSE313': 4, 'MSE314': 3,
  'MSE315': 4, 'MSE316': 4, 'MSE352': 4, 'MSE355': 4,
  'MSE402': 4, 'MSE403': 4, 'MSE602': 4, 'MSE603': 4,
  'MSE604': 4, 'MSE605': 4, 'MSE621': 4, 'MSE622': 4,
  'MSE627': 4, 'MSE629': 4, 'MSE631': 4, 'MSE632': 4,
  'MSE633A': 3, 'MSE634': 4, 'MSE635': 4,
  
  // ICDT Core
  'ES626': 4, 'EE617': 4, 'EE651': 4,
  
  // HSS
  'HS103': 4, 'HS104': 4, 'HS105': 4, 'HS108': 2,
  'HS111': 4, 'HS112': 4, 'HS151': 4, 'HS152': 4,
  'HS153': 4, 'HS154': 4, 'HS155': 4, 'HS191': 2,
  'HS192': 2, 'HS201': 4, 'HS221': 4, 'HS223': 4,
  'HS224': 2, 'HS305': 4, 'HS326': 4, 'HS327': 4,
  'HS392': 2, 'HS421': 4, 'HS425': 4, 'HS426': 4,
  'HS510': 4, 'HS512': 4, 'HS513': 4, 'HS514': 4,
  'HS515': 4, 'HS518': 4, 'HS519': 4, 'HS520': 4,
  'HS521': 4, 'HS522': 4, 'HS523': 4, 'HS524': 4,
  'HS525': 4, 'HS526': 4, 'HS527': 4, 'HS610': 4,
  'HS631': 4, 'HS635': 4, 'HS642': 4, 'HS645': 4,
  'HS647': 4, 'HS650': 4, 'HS651': 4, 'HS652': 4,
  'HS653': 2, 'HS654': 2, 'HS655': 2, 'HS656': 4,
  'HS191-I': 4, 'HS191-II': 4, 'HS191-III': 4,
  'HS491-III': 4, 'HS491-VIII': 4, 'HS491-XI': 4,
  'HS491-XIII': 4, 'HS492-III': 2, 'HS492-VII': 2,
  'HS507': 4, 'HS508': 4, 'HS591-I': 4, 'HS591-VI': 4,
  'HS691-I': 4, 'HS691-IX': 4, 'HS691-VII': 4,
  'HS691-X': 4, 'HS691-XI': 4, 'HS692-II': 2,
  'HS692-III': 2,
  
  // Science Basket
  'PH201': 4, 'PH202': 4, 'PH203': 4, 'PH409': 4,
  'PH410': 4, 'CH203': 4, 'CH302': 4, 'CH401': 4,
  'BS401': 4, 'CG503': 4, 'CG504': 4, 'CG505': 4,
  'CG506': 4, 'CG507': 2, 'CG517': 4, 'CG601': 4,
  'CG604': 4, 'CG605': 4, 'CG606': 4, 'CG607': 4,
  'CG608': 4, 'CG612': 4, 'CG614': 4, 'CG591-I': 4,
  'CG591-II': 4, 'CG691-IV': 4, 'CG691-VI': 4,
  'CG691-VII': 4, 'CG691-VIII': 4, 'CG692-I': 2,
  'CG692-II': 2, 'EH303': 4, 'EH304': 2, 'EH601': 4,
  'EH602': 4, 'EH604': 4, 'EH605': 4, 'EH608': 4,
  'EH610': 4, 'EH611': 4, 'EH612': 4, 'EH613': 4,
  'EH614': 4, 'EH615': 4, 'EH616': 4, 'EH619': 4,
  'EH621': 4, 'EH622': 4, 'EH623': 4, 'EH625': 4,
  'EH626': 4, 'EH627': 4, 'EH628': 4, 'EH629': 4,
  'EH630': 4, 'EH691-II': 4, 'EH691-III': 4,
  'EH691-IX': 4, 'EH691-X': 4,
  
  // Mathematics
  'MA104': 2, 'MA203': 2, 'MA204': 2, 'MA205': 2,
  'MA206': 2, 'MA501': 4, 'MA502': 4, 'MA504': 4,
  'MA507': 4, 'MA509': 4, 'MA510': 4, 'MA512': 4,
  'MA592': 1, 'MA600-I': 4, 'MA601': 4, 'MA602': 4,
  'MA605': 4, 'MA606': 4, 'MA623': 4, 'MA624': 4,
  'MA625': 4, 'MA626': 4, 'MA627': 4, 'MA628': 4,
  'MA629': 4, 'MA630': 4, 'MA631': 4, 'MA632': 4,
  'MA633': 4, 'MA634': 4, 'MA636': 4, 'MA637': 4,
  'MA638': 4, 'MA639': 4, 'MA640': 4, 'MA641': 4,
  'MA642': 2, 'MA643': 4, 'MA691-III': 4, 'MA691-IV': 4,
  'MA691-V': 4,
  
  // General Education
  'GE101': 2, 'GE201': 2,
  
  // Physics
  'PH404': 4, 'PH502': 4, 'PH503': 4, 'PH504': 4,
  'PH505': 4, 'PH506': 4, 'PH507': 4, 'PH508': 4,
  'PH509': 4, 'PH510': 4, 'PH513': 4, 'PH605': 4,
  'PH607': 4, 'PH608': 4, 'PH609': 4, 'PH610': 4,
  'PH611': 4, 'PH612': 4, 'PH614': 4, 'PH615': 4,
  'PH616': 4, 'PH643': 4, 'PH644': 4, 'PH645': 4,
  'PH646': 4, 'PH647': 4, 'PH648': 4, 'PH649': 4,
  'PH652': 4, 'PH691-III': 4, 'PH691-IV': 4,
  'PH691-V': 4,
  
  // Chemistry
  'CH301': 2, 'CH503': 4, 'CH506': 4, 'CH508': 4,
  'CH510': 4, 'CH511': 4, 'CH512': 4, 'CH513': 4,
  'CH522': 2, 'CH523': 2, 'CH524': 2, 'CH525': 2,
  'CH526': 4, 'CH527': 4, 'CH592-I': 4, 'CH602': 4,
  'CH615': 4, 'CH616': 4, 'CH622': 4, 'CH624': 4,
  'CH626': 4, 'CH627': 4, 'CH628': 4, 'CH629': 4,
  'CH630': 4, 'CH632': 4, 'CH633': 4, 'CH634': 4,
  'CH635': 4, 'CH636': 4, 'CH638': 4, 'CH639': 4,
  'CH640': 4, 'CH641': 4, 'CH642': 4,
  
  // Biological Engineering
  'BE301': 2, 'BE303': 4, 'BE304': 4, 'BE401': 2,
  'BE402': 2, 'BE403': 4, 'BE404': 4, 'BE405': 4,
  'BE406': 4, 'BE407': 4, 'BE601': 4, 'BE603': 4,
  'BE605': 2, 'BE606': 4, 'BE607': 4, 'BE608': 4,
  'BE610': 4, 'BE613': 4, 'BE614': 4, 'BE615': 4,
  'BE616': 4, 'BE617': 4, 'BE618': 4, 'BE619': 4,
  'BE621': 2, 'BE622': 4, 'BE623': 2, 'BE624': 4,
  'BE691-I': 4, 'BE692': 2,
  
  // Design
  'DES201': 4, 'DES302': 4, 'DES303': 4, 'DES491': 4,
  'DES491-I': 4, 'DES591-I': 4, 'DES601': 4, 'DES602': 4,
  'DES603': 4, 'DES604': 4, 'DES605': 4, 'DES691': 4,
  'DES691-I': 4, 'DES691-II': 4, 'DES691-III': 4,
  
  // Management
  'MS204': 2, 'MS306': 4, 'MS403': 4, 'MS404': 2,
  'MS408': 4, 'MS410': 2, 'MS491': 4, 'MS491-I': 4,
  'MS491-VI': 4, 'MS491-VII': 4, 'MS491-VIII': 4,
  'MS491-XI': 4, 'MS491-XIII': 4, 'MS491-XIV': 4,
  'MS491-XV': 3, 'MS492-I': 2, 'MS492-II': 2,
  'MS492-III': 2, 'MS492-IV': 2, 'MS492-V': 2,
  'MS492-VIII': 2,
  
  // Projects
  'OPC': 4, 'IN498': 4, 'XX299': 4, 'XX399': 4, 'XX499': 4,
  
  // Other
  'IN304': 4, 'IN402': 4, 'IN491': 4, 'ES2XX': 3,
  'HS3XX': 4, 'ES311': 4, 'ES321': 4, 'ES331': 4,
  
  // PE
  'PE101': 0, 'PE102': 0, 'PE103': 0, 'PE104': 0,
  'PE500': 0, 'PE600': 0,
  
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