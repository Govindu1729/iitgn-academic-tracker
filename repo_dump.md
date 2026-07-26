# Repository Structure

```
iitgn-academic-tracker
├── LICENSE
├── README.md
├── backend
│   ├── data
│   │   ├── courseCatalog.js
│   │   └── programRequirements.js
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── Course.js
│   │   ├── ProgramRequirement.js
│   │   └── User.js
│   ├── package.json
│   ├── package.json.save
│   ├── routes
│   │   ├── analytics.js
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── programs.js
│   ├── server.js
│   ├── test
│   │   ├── analytics.test.js
│   │   ├── auth.test.js
│   │   └── setupTest.js
│   └── utils
│       ├── basketMapper.js
│       └── logger.js
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── src
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── AddEditCourseModal.jsx
│   │   │   ├── AddEditPlannedModal.jsx
│   │   │   ├── BulkImportModal.jsx
│   │   │   ├── CPIWarning.jsx
│   │   │   ├── CourseSearchInput.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── UserProfileDropdown.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── data
│   │   │   └── courseCatalog.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── BasketTrackingPage.jsx
│   │   │   ├── CourseHistoryPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── HonoursMinorPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── ProgramSetupPage.jsx
│   │   │   └── SemesterPlannerPage.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   └── utils
│   │       ├── basketMapper.js
│   │       ├── departmentDetector.js
│   │       ├── exportExcel.js
│   │       ├── gpaCalculator.js
│   │       └── programRequirements.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── generate-markdown.js
├── package.json
└── server.js
```

# File Contents

## README.md

```md
# IITGN Academic Tracker

Academic tracking system for IIT Gandhinagar students.

## Features
- 🔐 JWT Authentication
- 📚 Course management with grades
- 📊 CPI calculator (10-point scale)
- 🎯 Basket tracking for degree requirements
- 📅 Semester planner with credit limits
- 📎 Excel export
- 🏆 Honours & Minor tracking
- 📋 Bulk import from IMS portal
- 🔍 Course search with autocomplete
- 📱 Fully responsive design

## Tech Stack
- Backend: Node.js, Express, MongoDB, JWT
- Frontend: React, Vite, Tailwind CSS, Recharts

## Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Backend + Frontend Setup
```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev
# IITGN Academic Tracker - Update

```

## backend/data/courseCatalog.js

```js
// backend/data/courseCatalog.js
// Pre-populated course catalog based on IITGN timetables
export const courseCatalog = [
  // First Year Institute Core
  { courseCode: 'FP100', courseName: 'Foundation Programme', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES101', courseName: 'Engineering Graphics', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES112', courseName: 'Computing', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES115', courseName: 'Design, Innovation and Prototyping', credits: 5, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'MA103', courseName: 'Calculus of Single Variable and Linear Algebra', credits: 4, basketType: 'Institute Core', department: 'Maths' },
  { courseCode: 'HS191', courseName: 'Introduction to Writing I', credits: 2, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS192', courseName: 'Introduction to Writing II', credits: 2, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'BS192', courseName: 'Undergraduate Science Laboratory', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'PE101', courseName: 'Physical Education', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'PE102', courseName: 'Physical Education', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'PE103', courseName: 'Physical Education', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'PE104', courseName: 'Physical Education', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN101', courseName: 'Comprehensive Viva Voce', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN102', courseName: 'Comprehensive Viva Voce', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN103', courseName: 'Comprehensive Viva Voce', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN104', courseName: 'Comprehensive Viva Voce', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN105', courseName: 'Comprehensive Viva Voce', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN106', courseName: 'Comprehensive Viva Voce', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN107', courseName: 'Comprehensive Viva Voce', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN108', courseName: 'Comprehensive Viva Voce', credits: 0, basketType: 'Institute Core', department: 'Institute' },

  // Second Year Institute Core
  { courseCode: 'ES113', courseName: 'Data-Centric Computing', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES114', courseName: 'Probability, Statistics and Data Visualization', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES116', courseName: 'Principles and Applications of Electrical Engineering', credits: 5, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES117', courseName: 'The World of Engineering', credits: 2, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES118', courseName: 'Materials for the Future', credits: 3, basketType: 'Materials Basket', department: 'MSE' },
  { courseCode: 'ES119', courseName: 'Principles of Artificial Intelligence', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'GE101', courseName: 'General Education I', credits: 2, basketType: 'General Education', department: 'Institute' },
  { courseCode: 'GE201', courseName: 'General Education II', credits: 2, basketType: 'General Education', department: 'Institute' },
  { courseCode: 'MA104', courseName: 'Ordinary Differential Equations', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'MA203', courseName: 'Numerical Methods', credits: 2, basketType: 'Institute Core', department: 'Maths' },
  { courseCode: 'MA204', courseName: 'Introduction to Partial Differential Equations', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'MA205', courseName: 'Calculus of Several Variables', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'MA206', courseName: 'Introduction to Complex Analysis', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'ES211', courseName: 'Thermodynamics', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES212', courseName: 'Fluid Mechanics', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES214', courseName: 'Discrete Mathematics', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES221', courseName: 'Mechanics of Solids', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES242', courseName: 'Data Structures and Algorithms I', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES243', courseName: 'Biology for Engineers', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES244', courseName: 'Signals, Systems and Random Processes', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES245', courseName: 'Control Systems', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES301', courseName: 'Data Structures and Algorithms II', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'ES335', courseName: 'Machine Learning', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES336', courseName: 'Computer Organization and Architecture', credits: 4, basketType: 'Discipline Core', department: 'CSE' },

  // HSS Courses
  { courseCode: 'HS151', courseName: 'Economics', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS221', courseName: 'Introduction to Philosophy', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS201', courseName: 'World Civilizations and Cultures', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS103', courseName: 'French Studies', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS104', courseName: 'Foundational Sanskrit', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS111', courseName: 'Urdu Script and Poetry', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS112', courseName: 'Urdu Poetry Interpretation', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS152', courseName: 'Japanese Language for Beginners', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS153', courseName: 'Advance Japanese Learning', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS154', courseName: 'Mandarin for Beginners', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS155', courseName: 'Mandarin for Beginners II', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS223', courseName: 'Sanskrit Literature', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS510', courseName: 'Perspectives on Indian Civilization', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS512', courseName: 'Political Thought', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS520', courseName: 'Ancient Indian Architecture', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS524', courseName: 'Qualitative Research Methods', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS631', courseName: 'Digital Cultures and New Media', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS647', courseName: 'Literature, Theory and Social Context', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS651', courseName: 'Critical Perspectives in Sociology', credits: 4, basketType: 'HSS', department: 'HSS' },

  // Science Basket Courses
  { courseCode: 'PH201', courseName: 'Introduction to Electrodynamics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  { courseCode: 'PH202', courseName: 'Introduction to Quantum Physics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  { courseCode: 'PH203', courseName: 'Solid State Physics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  { courseCode: 'CH203', courseName: 'Fundamentals and Applications of Spectroscopy', credits: 4, basketType: 'Science Basket', department: 'Chemistry' },
  { courseCode: 'CH302', courseName: 'Electrochemical Science and Engineering', credits: 4, basketType: 'Science Basket', department: 'Chemistry' },
  { courseCode: 'CG503', courseName: 'Fundamentals of Cognitive Psychology', credits: 4, basketType: 'Science Basket', department: 'Cognitive Science' },
  { courseCode: 'CG505', courseName: 'Fundamental Neuroscience', credits: 4, basketType: 'Science Basket', department: 'Cognitive Science' },
  { courseCode: 'EH303', courseName: 'Introduction to Earth Sciences', credits: 4, basketType: 'Science Basket', department: 'Earth Sciences' },
  { courseCode: 'EH304', courseName: 'Drone Data Acquisition Processing and Interpretation', credits: 2, basketType: 'Science Basket', department: 'Earth Sciences' },
  { courseCode: 'BS401', courseName: 'Nanoscale Science', credits: 4, basketType: 'Science Basket', department: 'Chemistry' },

  // CSE Discipline Courses
  { courseCode: 'CS201', courseName: 'Theory of Computing', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS202', courseName: 'Software Tools and Techniques for CSE', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS203', courseName: 'Software Tools and Techniques for AI', credits: 4, basketType: 'Discipline Core', department: 'AI' },
  { courseCode: 'CS303', courseName: 'Mathematical Foundations for AI', credits: 4, basketType: 'Discipline Core', department: 'AI' },
  { courseCode: 'CS328', courseName: 'Introduction to Data Science', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS329', courseName: 'Foundations of AI: Multiagent Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS330', courseName: 'Operating Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS331', courseName: 'Computer Networks', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS327', courseName: 'Compilers', credits: 5, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS431', courseName: 'Computer and Network Security', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS432', courseName: 'Databases', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS434', courseName: 'Software Engineering and Testing', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS435', courseName: 'Human-Computer Interaction', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS436', courseName: 'History of Computing and its Applications to Domains', credits: 2, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS610', courseName: 'Algorithms', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS612', courseName: 'Computer Systems', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS613', courseName: 'Natural Language Processing', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS614', courseName: 'Advanced Algorithms', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS615', courseName: 'Advanced Computer Networks', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS616', courseName: 'Distributed Systems and Cloud Computing', credits: 5, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS617', courseName: 'Computational Complexity Theory', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS618', courseName: 'Theoretical Foundations of ML', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS619', courseName: 'CS Theory Toolkit', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS620', courseName: 'Incentives and Machine Learning', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'CS621', courseName: 'Ethics of AI', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES666', courseName: 'Computer Vision', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES667', courseName: 'Deep Learning', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES670', courseName: 'Matrix Methods for Signal Processing, Data Science and ML', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },

  // EE Discipline Courses
  { courseCode: 'EE221', courseName: 'Electronic Devices', credits: 3, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE223', courseName: 'Electrical Machines', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE224', courseName: 'Power Systems', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE225', courseName: 'Unveiling the Semiconductor World', credits: 2, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE226', courseName: 'Semiconductor Devices', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE227', courseName: 'CMOS Circuit Design', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE312', courseName: 'Engineering Electromagnetics', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE322', courseName: 'Analog and Mixed Signal Circuits', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE323', courseName: 'Digital Signal Processing', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE333', courseName: 'Power Electronics', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE341', courseName: 'Communication Systems', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE426', courseName: 'Electric Vehicle Technology', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE617', courseName: 'VLSI Design', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE644', courseName: 'Physics of Transistors', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE648', courseName: 'Dynamic Behaviour of Electric Machines', credits: 5, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE651', courseName: 'CMOS Analog IC Design', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE659', courseName: 'Smart Grid', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE660', courseName: 'Power Management IC Design', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE663', courseName: 'Advanced Wireless Communications', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE664', courseName: 'High Frequency Engineering', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'EE670', courseName: 'AI for Electrical Engineering', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'ES616', courseName: 'Digital Control Systems', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'ES626', courseName: 'Microfabrication and Semiconductor Processes', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'ES657', courseName: 'Biomedical Ultrasound', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'ES663', courseName: 'Smart Renewable Energy Systems', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'ES668', courseName: '5G and Beyond', credits: 4, basketType: 'Discipline Elective', department: 'EE' },
  { courseCode: 'ES675', courseName: 'Photonics - Principles and Applications', credits: 4, basketType: 'Discipline Elective', department: 'EE' },

  // ME Discipline Courses
  { courseCode: 'ME206', courseName: 'Statics and Dynamics', credits: 4, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME207', courseName: 'Fluid Dynamics', credits: 5, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME208', courseName: 'Vibrations', credits: 2, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME209', courseName: 'Principles of Manufacturing Processes', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME333', courseName: 'Mechanics of Materials', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME334', courseName: 'Heat and Mass Transfer', credits: 4, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME335', courseName: 'Synthesis and Analysis of Mechanisms', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME337', courseName: 'Mechanical Systems Design', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME362', courseName: 'Introduction to Manufacturing Systems and Metrology', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME605', courseName: 'Computational Fluid Dynamics', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ME628', courseName: 'Advanced Fluid Mechanics', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ME639', courseName: 'Introduction to Robotics', credits: 5, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ME640', courseName: 'Fracture Mechanics', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ME648', courseName: 'Mathematical Tools for Mechanical Engineers', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ES408', courseName: 'Mechatronics', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ES607', courseName: 'Foundations of Fluid Dynamics', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ES613', courseName: 'Modern Control Theory', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ES621', courseName: 'Advanced Solid Mechanics', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ES646', courseName: 'Elastodynamics and Vibrations', credits: 4, basketType: 'Discipline Elective', department: 'ME' },
  { courseCode: 'ES656', courseName: 'Human-Robot Interaction', credits: 4, basketType: 'Discipline Elective', department: 'ME' },

  // ChemE Discipline Courses
  { courseCode: 'CL201', courseName: 'Chemical Process Calculations', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL202', courseName: 'Chemical Engineering Thermodynamics', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL203', courseName: 'Process Fluid Mechanics', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL204', courseName: 'Heat Transfer', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL205', courseName: 'Chemical Reaction Engineering I', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL313', courseName: 'Chemical Reaction Engineering II', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL314', courseName: 'Separation Processes I', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL315', courseName: 'Process Dynamics and Control', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL316', courseName: 'Separation Processes II', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL317', courseName: 'Process Synthesis, Design and Simulation', credits: 4, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL325', courseName: 'Transport Phenomena', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL326', courseName: 'Integrated Chemical Engineering Lab I', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL327', courseName: 'Integrated Chemical Engineering Lab II', credits: 2, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL324', courseName: 'Introduction to Polymer Science and Engineering', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL353', courseName: 'Introduction to Process Safety', credits: 2, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL426', courseName: 'Biochemical Engineering', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL601', courseName: 'Advance Transport Phenomena', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL602', courseName: 'Advanced Thermodynamics', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL604', courseName: 'Advanced Reaction Engineering', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL627', courseName: 'Particulate Solids: Processing and Surface Engineering', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL629', courseName: 'Fundamentals of Aerosol Science', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },

  // Civil Discipline Courses
  { courseCode: 'CE201', courseName: 'Earth Materials and Processes', credits: 2, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE202', courseName: 'Sustainability and Environment', credits: 3, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE203', courseName: 'Geospatial Engineering', credits: 3, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE301', courseName: 'Soil Mechanics', credits: 5, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE302', courseName: 'Structural Analysis', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE310', courseName: 'Hydrology and Hydraulics', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE311', courseName: 'Design of Reinforced Concrete Structures', credits: 5, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE312', courseName: 'Design of Steel Structures', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE313', courseName: 'Environmental Science and Engineering', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE314', courseName: 'Geotechnical Engineering', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE403', courseName: 'Construction Technology and Management', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE404', courseName: 'Transportation Engineering', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE315', courseName: 'Civil Engineering Materials', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE601', courseName: 'Advanced Geotechnical Engineering', credits: 5, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE607', courseName: 'Advanced Structural Analysis', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE611', courseName: 'Advanced Engineering Hydrology', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE622', courseName: 'Structural Dynamics', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE625', courseName: 'Advanced Hydraulic Engineering', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE627', courseName: 'Slopes and Retaining Structures', credits: 2, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE634', courseName: 'Air Pollution Control Engineering', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE635', courseName: 'Pavement Materials and Design', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE637', courseName: 'Infrastructure Systems: Planning and Management', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },
  { courseCode: 'CE638', courseName: 'Advanced Concrete Technology', credits: 4, basketType: 'Discipline Elective', department: 'Civil' },

  // MSE Discipline Courses
  { courseCode: 'MSE202', courseName: 'Materials Thermodynamics', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE204', courseName: 'Transport Phenomena in Materials Engineering', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE205', courseName: 'Mechanical Behaviour of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE206', courseName: 'Physics of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE207', courseName: 'Structure of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE210', courseName: 'Microstructural Engineering', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE302', courseName: 'Corrosion and Degradation of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE304', courseName: 'Principles of Metal Extraction and Refining', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE307', courseName: 'Materials Processing', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE312', courseName: 'Materials and Environment', credits: 2, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE313', courseName: 'Polymers, Ceramics and Composites', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE314', courseName: 'Materials Selection and Design', credits: 3, basketType: 'Materials Basket', department: 'MSE' },
  { courseCode: 'MSE315', courseName: 'Introduction to Computational Materials Engineering', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE316', courseName: 'Corrosion and Degradation of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE352', courseName: 'Material Characterization Techniques', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE403', courseName: 'Science and Technology of Welding and Joining', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE602', courseName: 'Computational Materials Engineering', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE603', courseName: 'Thin Film Processing and Characterization', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE604', courseName: 'Deformation Behaviour of Materials', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE621', courseName: 'Process Plant Design', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE629', courseName: 'Structure and Defects of Materials', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE632', courseName: 'Characterization of Materials', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE634', courseName: 'Semiconductor Materials and Fabrication Process', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },

  // Project and External Exposure
  { courseCode: 'OPC', courseName: 'Open Project Course', credits: 4, basketType: 'Project', department: 'Institute' },
  { courseCode: 'IN498', courseName: 'External Exposure', credits: 4, basketType: 'External Exposure', department: 'Institute' },
  { courseCode: 'XX299', courseName: 'Level 2 Project', credits: 4, basketType: 'Project', department: 'Institute' },
  { courseCode: 'XX399', courseName: 'Level 3 Project', credits: 4, basketType: 'Project', department: 'Institute' },
  { courseCode: 'XX499', courseName: 'Level 4 Project', credits: 4, basketType: 'Project', department: 'Institute' },
];

export const searchCatalog = (query) => {
  return courseCatalog.filter(course => 
    course.courseCode.toLowerCase().includes(query.toLowerCase()) ||
    course.courseName.toLowerCase().includes(query.toLowerCase())
  );
};

```

## backend/data/programRequirements.js

```js
const programRequirementsData = {
  BTech_CSE: {
    programName: 'B.Tech Computer Science & Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 36,
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
  BTech_AI: {
    programName: 'B.Tech Artificial Intelligence',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
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
  // ... other programs copied from previous source
  BTech_EE: {
    programName: 'B.Tech Electrical Engineering',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
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
  BTech_ME: {
    programName: 'B.Tech Mechanical Engineering',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
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
  BTech_ChemE: {
    programName: 'B.Tech Chemical Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 42,
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
  BTech_Civil: {
    programName: 'B.Tech Civil Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 42,
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
  BTech_MSE: {
    programName: 'B.Tech Materials Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 42,
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
  BTech_ICDT: {
    programName: 'B.Tech Integrated Circuit Design & Technology',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
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
  BTech_DoubleMajor: {
    programName: 'B.Tech with Double Major',
    totalCreditsRequired: 190,
    disciplineCoreCredits: 36,
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
      { basketName: 'Project', minCredits: 4, isMandatory: true },
      { basketName: 'Double Major', minCredits: 20, isMandatory: true }
    ]
  },
  BTech_MTech_Dual: {
    programName: 'B.Tech-M.Tech Dual Degree',
    totalCreditsRequired: 242,
    disciplineCoreCredits: 24,
    disciplineElectiveCredits: 0,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 24, isMandatory: true },
      { basketName: 'MTech Thesis', minCredits: 32, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_MSc_Dual: {
    programName: 'B.Tech-M.Sc Dual Degree',
    totalCreditsRequired: 242,
    disciplineCoreCredits: 30,
    disciplineElectiveCredits: 12,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 30, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 12, isMandatory: true },
      { basketName: 'MSc Project', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 12, isMandatory: true }
    ]
  }
};

export default programRequirementsData;

```

## backend/middleware/auth.js

```js
// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

```

## backend/models/Course.js

```js
// backend/models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    min: 0.5,
    max: 6
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'F', 'P', 'NP', '', 'IP'],
    default: ''
  },
  semester: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  basketType: {
    type: String,
    required: true,
    enum: ['Institute Core', 'HSS', 'Science Basket', 'Mathematics Basket', 'Materials Basket', 'General Education', 'Discipline Core', 'Discipline Elective', 'Open Elective', 'Project', 'External Exposure', 'Honours', 'Minor', 'Other']
  },
  department: {
    type: String,
    enum: ['CSE', 'AI', 'EE', 'ME', 'CE', 'CL', 'MSE', 'ICDT', 'Physics', 'Chemistry', 'Maths', 'Cognitive Science', 'Biology', 'Earth Sciences', 'HSS', 'Institute', 'Other'],
    default: 'Institute'
  },
  isPlanned: {
    type: Boolean,
    default: false
  },
  isPassFail: {
    type: Boolean,
    default: false
  },
  isHonoursCourse: {
    type: Boolean,
    default: false
  },
  isMinorCourse: {
    type: Boolean,
    default: false
  },
  semesterOrder: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

// Index for efficient queries
courseSchema.index({ userId: 1, semester: 1 });
courseSchema.index({ userId: 1, basketType: 1 });

export default mongoose.model('Course', courseSchema);

```

## backend/models/ProgramRequirement.js

```js
// backend/models/ProgramRequirement.js
import mongoose from 'mongoose';

const basketRequirementSchema = new mongoose.Schema({
  basketName: { type: String, required: true },
  minCredits: { type: Number, required: true },
  maxCredits: { type: Number, default: 999 },
  isMandatory: { type: Boolean, default: true }
});

const programRequirementSchema = new mongoose.Schema({
  programCode: { type: String, required: true, unique: true },
  programName: { type: String, required: true },
  admissionYearStart: { type: Number, required: true },
  admissionYearEnd: { type: Number, default: null },
  totalCreditsRequired: { type: Number, required: true },
  basketRequirements: [basketRequirementSchema],
  disciplineCoreCredits: { type: Number, required: true },
  disciplineElectiveCredits: { type: Number, required: true },
  honoursAdditionalCredits: { type: Number, default: 20 },
  minorAdditionalCredits: { type: Number, default: 20 },
  maxCreditsPerSemester: { type: Number, default: 28 },
  normalCreditsPerSemester: { type: Number, default: 22 },
  overloadAllowedCPI: { type: Number, default: 7.0 }
});

export default mongoose.model('ProgramRequirement', programRequirementSchema);

```

## backend/models/User.js

```js
// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  program: {
    type: String,
    enum: ['BTech_CSE', 'BTech_AI', 'BTech_EE', 'BTech_ME', 'BTech_ChemE', 'BTech_Civil', 'BTech_MSE', 'BTech_ICDT', 'BTech_MTech_Dual', 'BTech_MSc_Dual'],
    default: 'BTech_CSE'
  },
  admissionYear: {
    type: Number,
    required: true,
    default: 2026
  },
  pursuingHonours: {
    type: Boolean,
    default: false
  },
  pursuingMinor: {
    type: Boolean,
    default: false
  },
  minorDiscipline: {
    type: String,
    default: ''
  },
  refreshTokens: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);

```

## backend/package.json

```json
{
  "name": "iitgn-academic-tracker-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "mocha --exit --recursive \"test/**/*.test.js\""
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "exceljs": "^4.3.0",
    "express": "^4.18.2",
    "express-rate-limit": "^6.11.2",
    "express-validator": "^6.14.3",
    "helmet": "^7.2.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.0",
    "winston": "^3.19.0"
  },
  "devDependencies": {
    "mocha": "^10.2.0",
    "mongodb-memory-server": "^8.12.1",
    "nodemon": "^3.1.14"
  }
}

```

## backend/routes/analytics.js

```js
// backend/routes/analytics.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import programRequirementsData from '../data/programRequirements.js';
import normalizeBasketName from '../utils/basketMapper.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Grade to points mapping for IITGN (10-point scale)
const gradeToPoints = {
  'A+': 11.0, 'A': 10.0, 'A-': 9.0,
  'B+': 8.0, 'B': 7.0, 
  'C': 6.0, 'C-': 5.0,
  'D': 4.0, 'F': 0.0,
  'P': null, 'NP': null, 'IP': null
};

// Get GPA/CPI breakdown
router.get('/gpa', authenticate, async (req, res) => {
  try {
    const courses = await Course.find({ 
      userId: req.userId,
      isPlanned: false,
      grade: { $nin: ['', 'P', 'NP', 'IP'] }
    });
    
    let totalPoints = 0;
    let totalCredits = 0;
    const semesterWiseGPA = {};
    
    courses.forEach(course => {
      const points = gradeToPoints[course.grade];
      if (points !== null && points !== undefined) {
        const key = `${course.academicYear}-${course.semester}`;
        if (!semesterWiseGPA[key]) {
          semesterWiseGPA[key] = { points: 0, credits: 0 };
        }
        semesterWiseGPA[key].points += points * course.credits;
        semesterWiseGPA[key].credits += course.credits;
        totalPoints += points * course.credits;
        totalCredits += course.credits;
      }
    });
    
    const overallCPI = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    const semesterGPA = {};
    Object.keys(semesterWiseGPA).forEach(sem => {
      semesterGPA[sem] = semesterWiseGPA[sem].credits > 0 
        ? semesterWiseGPA[sem].points / semesterWiseGPA[sem].credits 
        : 0;
    });
    
    res.json({
      overallCPI: parseFloat(overallCPI.toFixed(2)),
      semesterWiseGPA: semesterGPA,
      totalGradedCredits: totalCredits,
      totalCourses: courses.length
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get basket-wise credit summary
router.get('/basket-summary', authenticate, async (req, res) => {
  try {
    const courses = await Course.find({ 
      userId: req.userId,
      isPlanned: false
    });
    
    const basketCredits = {};
    const basketCourses = {};
    // Normalize basket keys and ensure numeric credits
    courses.forEach(course => {
      const key = normalizeBasketName(course.basketType);
      const credits = Number(course.credits) || 0;
      if (!basketCredits[key]) {
        basketCredits[key] = 0;
        basketCourses[key] = [];
      }
      // Count credits unless explicitly failed (F or NP)
      const failed = (course.grade === 'F' || course.grade === 'NP');
      if (!failed) basketCredits[key] += credits;
      basketCourses[key].push({
        courseCode: course.courseCode,
        courseName: course.courseName,
        credits,
        grade: course.grade,
        isPassed: !failed
      });
    });
    
    res.json({
      basketCredits,
      basketCourses,
      totalCompletedCredits: Object.values(basketCredits).reduce((s, v) => s + v, 0)
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get credit status vs program requirements
router.get('/credits-status', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const programCode = user.program || 'BTech_CSE';
    const requirements = programRequirementsData[programCode];
    if (!requirements) return res.status(404).json({ message: 'Program requirements not found' });

    const completedCourses = await Course.find({ userId: req.userId, isPlanned: false });

    // Sum completed credits per basket; exclude failed courses
    const completedByBasket = {};
    completedCourses.forEach(c => {
      const key = normalizeBasketName(c.basketType);
      const credits = Number(c.credits) || 0;
      const failed = (c.grade === 'F' || c.grade === 'NP');
      if (!completedByBasket[key]) completedByBasket[key] = 0;
      if (!failed) completedByBasket[key] += credits;
    });

    const baskets = requirements.basketRequirements.map(b => {
      const name = b.basketName;
      const required = Number(b.minCredits) || 0;
      const completed = Number(completedByBasket[name] || 0);
      const remaining = Math.max(0, required - completed);
      return { basketName: name, required, completed, remaining };
    });

    const requiredTotal = Number(requirements.totalCreditsRequired || baskets.reduce((s, b) => s + b.required, 0));
    const completedTotal = Object.values(completedByBasket).reduce((s, v) => s + v, 0);
    const remainingTotal = Math.max(0, requiredTotal - completedTotal);

    res.json({
      programCode,
      programName: requirements.programName,
      requiredTotal,
      completedTotal,
      remainingTotal,
      baskets
    });
  } catch (error) {
    logger.error('Credits status error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get planned vs completed analysis
router.get('/progress-analysis', authenticate, async (req, res) => {
  try {
    const allCourses = await Course.find({ userId: req.userId });
    
    const completed = allCourses.filter(c => !c.isPlanned);
    const planned = allCourses.filter(c => c.isPlanned);
    
    const completedBySemester = {};
    completed.forEach(c => {
      const key = `${c.academicYear}-${c.semester}`;
      if (!completedBySemester[key]) completedBySemester[key] = 0;
      completedBySemester[key] += c.credits;
    });
    
    const plannedBySemester = {};
    planned.forEach(c => {
      const key = `${c.academicYear}-${c.semester}`;
      if (!plannedBySemester[key]) plannedBySemester[key] = 0;
      plannedBySemester[key] += c.credits;
    });
    
    res.json({
      totalCompletedCredits: completed.reduce((sum, c) => sum + c.credits, 0),
      totalPlannedCredits: planned.reduce((sum, c) => sum + c.credits, 0),
      totalCoursesCompleted: completed.length,
      totalCoursesPlanned: planned.length,
      completedBySemester,
      plannedBySemester
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

```

## backend/routes/auth.js

```js
// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || '15m';
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || '30d';
const REFRESH_COOKIE_NAME = 'refreshToken';
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

function createAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function createRefreshToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: REFRESH_EXPIRES });
}

// Signup
router.post('/signup', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, program, admissionYear, pursuingHonours, pursuingMinor, minorDiscipline } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ 
      email, 
      password, 
      program: program || 'BTech_CSE',
      admissionYear: admissionYear || 2026,
      pursuingHonours: pursuingHonours || false,
      pursuingMinor: pursuingMinor || false,
      minorDiscipline: minorDiscipline || ''
    });
    await user.save();

    // Create tokens
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    // store refresh token
    user.refreshTokens.push(refreshToken);
    await user.save();
    // set HttpOnly cookie
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

    res.status(201).json({ 
      accessToken, 
      user: { 
        id: user._id, 
        email: user.email,
        program: user.program,
        admissionYear: user.admissionYear,
        pursuingHonours: user.pursuingHonours,
        pursuingMinor: user.pursuingMinor,
        minorDiscipline: user.minorDiscipline
      } 
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // generate tokens
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    // store refresh token
    user.refreshTokens.push(refreshToken);
    await user.save();
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

    res.json({ 
      accessToken, 
      user: { 
        id: user._id, 
        email: user.email,
        program: user.program,
        admissionYear: user.admissionYear,
        pursuingHonours: user.pursuingHonours,
        pursuingMinor: user.pursuingMinor,
        minorDiscipline: user.minorDiscipline
      } 
    });
  } catch (error) {
    logger.error('Login error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Refresh access token
router.post('/refresh', async (req, res) => {
  try {
    const token = req.cookies[REFRESH_COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // check token exists (rotation)
    if (!user.refreshTokens.includes(token)) {
      return res.status(401).json({ message: 'Refresh token revoked' });
    }

    // rotate tokens: remove old, add new
    const newAccessToken = createAccessToken(user._id);
    const newRefreshToken = createRefreshToken(user._id);

    user.refreshTokens = user.refreshTokens.filter(t => t !== token);
    user.refreshTokens.push(newRefreshToken);
    await user.save();

    res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, refreshCookieOptions);
    res.json({ accessToken: newAccessToken, user: {
      id: user._id,
      email: user.email,
      program: user.program,
      admissionYear: user.admissionYear,
      pursuingHonours: user.pursuingHonours,
      pursuingMinor: user.pursuingMinor,
      minorDiscipline: user.minorDiscipline
    }});
  } catch (error) {
    logger.error('Refresh error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout - invalidate refresh token
router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies[REFRESH_COOKIE_NAME];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (user) {
          user.refreshTokens = user.refreshTokens.filter(t => t !== token);
          await user.save();
        }
      } catch (e) {
        // ignore invalid token
      }
    }
    res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions);
    res.json({ message: 'Logged out' });
  } catch (error) {
    logger.error('Logout error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile (protected route)
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { program, pursuingHonours, pursuingMinor, minorDiscipline } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (program !== undefined) user.program = program;
    if (pursuingHonours !== undefined) user.pursuingHonours = pursuingHonours;
    if (pursuingMinor !== undefined) user.pursuingMinor = pursuingMinor;
    if (minorDiscipline !== undefined) user.minorDiscipline = minorDiscipline;
    
    await user.save();
    
    res.json({ 
      user: { 
        id: user._id, 
        email: user.email,
        program: user.program,
        admissionYear: user.admissionYear,
        pursuingHonours: user.pursuingHonours,
        pursuingMinor: user.pursuingMinor,
        minorDiscipline: user.minorDiscipline
      } 
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

```

## backend/routes/courses.js

```js
// backend/routes/courses.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import Course from '../models/Course.js';
import ExcelJS from 'exceljs';
import normalizeBasketName from '../utils/basketMapper.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Get all courses for user
router.get('/', authenticate, async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.userId }).sort({ academicYear: -1, semesterOrder: 1, createdAt: -1 });
    res.json(courses);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get courses by semester
router.get('/by-semester', authenticate, async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.userId });
    const grouped = courses.reduce((acc, course) => {
      const key = `${course.academicYear}-${course.semester}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(course);
      return acc;
    }, {});
    res.json(grouped);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a course
router.post('/', authenticate, async (req, res) => {
  try {
    const { courseCode, courseName, credits, grade, semester, academicYear, basketType, department, isPlanned, isPassFail, isHonoursCourse, isMinorCourse, semesterOrder } = req.body;
    // Basic validation
    if (!courseCode || !courseName || !credits) {
      return res.status(400).json({ message: 'courseCode, courseName and credits are required' });
    }
    
    const course = new Course({
      userId: req.userId,
      courseCode,
      courseName,
      credits,
      grade: grade || '',
      semester,
      academicYear,
      basketType: normalizeBasketName(basketType),
      department: department || 'Other',
      isPlanned: isPlanned || false,
      isPassFail: isPassFail || false,
      isHonoursCourse: isHonoursCourse || false,
      isMinorCourse: isMinorCourse || false,
      semesterOrder: semesterOrder || 1
    });
    
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    logger.error('Add course error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a course
router.put('/:id', authenticate, async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, userId: req.userId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const { courseCode, courseName, credits, grade, semester, academicYear, basketType, department, isPlanned, isPassFail, isHonoursCourse, isMinorCourse, semesterOrder } = req.body;
    
    if (courseCode !== undefined) course.courseCode = courseCode;
    if (courseName !== undefined) course.courseName = courseName;
    if (credits !== undefined) course.credits = credits;
    if (grade !== undefined) course.grade = grade;
    if (semester !== undefined) course.semester = semester;
    if (academicYear !== undefined) course.academicYear = academicYear;
    if (basketType !== undefined) course.basketType = normalizeBasketName(basketType);
    if (department !== undefined) course.department = department;
    if (isPlanned !== undefined) course.isPlanned = isPlanned;
    if (isPassFail !== undefined) course.isPassFail = isPassFail;
    if (isHonoursCourse !== undefined) course.isHonoursCourse = isHonoursCourse;
    if (isMinorCourse !== undefined) course.isMinorCourse = isMinorCourse;
    if (semesterOrder !== undefined) course.semesterOrder = semesterOrder;
    
    await course.save();
    res.json(course);
  } catch (error) {
    logger.error('Update course error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a course
// backend/routes/courses.js - Make sure this exists
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted' });
  } catch (error) {
    logger.error('Delete error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export courses to Excel (server-side)
router.get('/export', authenticate, async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.userId }).sort({ academicYear: -1, semesterOrder: 1 });

    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Courses');

    ws.columns = [
      { header: 'Course Code', key: 'courseCode', width: 15 },
      { header: 'Course Name', key: 'courseName', width: 40 },
      { header: 'Credits', key: 'credits', width: 10 },
      { header: 'Grade', key: 'grade', width: 8 },
      { header: 'Semester', key: 'semester', width: 12 },
      { header: 'Academic Year', key: 'academicYear', width: 12 },
      { header: 'Basket', key: 'basketType', width: 20 },
      { header: 'Department', key: 'department', width: 12 },
      { header: 'Planned', key: 'isPlanned', width: 8 }
    ];

    courses.forEach(c => {
      ws.addRow({
        courseCode: c.courseCode,
        courseName: c.courseName,
        credits: c.credits,
        grade: c.grade || '',
        semester: c.semester,
        academicYear: c.academicYear,
        basketType: normalizeBasketName(c.basketType),
        department: c.department,
        isPlanned: c.isPlanned ? 'Yes' : 'No'
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `courses-${req.userId}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(Buffer.from(buffer));
  } catch (error) {
    logger.error('Export courses error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

```

## backend/routes/programs.js

```js
import express from 'express';

const router = express.Router();

// Program requirements data for IITGN
const programRequirementsData = {
  BTech_CSE: {
    programName: 'B.Tech Computer Science & Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 36,
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
  BTech_AI: {
    programName: 'B.Tech Artificial Intelligence',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
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
  BTech_EE: {
    programName: 'B.Tech Electrical Engineering',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
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
  BTech_ME: {
    programName: 'B.Tech Mechanical Engineering',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
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
  BTech_ChemE: {
    programName: 'B.Tech Chemical Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 42,
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
  BTech_Civil: {
    programName: 'B.Tech Civil Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 42,
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
  }
};

// Get program requirements (no auth needed for now)
router.get('/requirements/:programCode', async (req, res) => {
  try {
    const { programCode } = req.params;
    const requirements = programRequirementsData[programCode];
    
    if (!requirements) {
      return res.status(404).json({ message: 'Program requirements not found' });
    }
    
    res.json(requirements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all available programs (no auth needed for now)
router.get('/list', async (req, res) => {
  try {
    const programs = Object.keys(programRequirementsData).map(code => ({
      code,
      name: programRequirementsData[code].programName,
      totalCredits: programRequirementsData[code].totalCreditsRequired
    }));
    res.json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

```

## backend/server.js

```js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './utils/logger.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import programRoutes from './routes/programs.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fail fast if critical env vars are missing
if (!process.env.JWT_SECRET) {
  logger.error('FATAL: JWT_SECRET is not set. Set it in your environment and restart.');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  logger.error('FATAL: MONGODB_URI is not set. Set it in your environment and restart.');
  process.exit(1);
}

// ✅ FIXED CORS Configuration
const allowedOrigins = [
  'https://iitgn-academic-tracker.vercel.app',
  'https://iitgn-academic-tracker-c4vs.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger.warn('Blocked origin: %s', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Security headers
app.use(helmet());

// Parse cookies for future refresh-token support
app.use(cookieParser());

// Global rate limiter (conservative)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// Middleware
app.use(express.json());

// Routes
// Stricter limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/analytics', analyticsRoutes);

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  // explicit options for compatibility
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => logger.info('Server running on port %s', PORT));
  })
  .catch(err => {
    logger.error('MongoDB connection error: %o', err);
    process.exit(1);
  });
```

## backend/test/analytics.test.js

```js
import express from 'express';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import assert from 'assert';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth.js';
import analyticsRoutes from '../routes/analytics.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { startTestDB, stopTestDB } from './setupTest.js';

dotenv.config();

let app;
let agent;
let accessToken;
let userId;

before(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
  await startTestDB();

  app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/auth', authRoutes);
  app.use('/api/analytics', analyticsRoutes);

  agent = request.agent(app);

  // signup and get access token
  const signupRes = await agent.post('/api/auth/signup').send({ email: 'analytics@example.com', password: 'password123' });
  accessToken = signupRes.body.accessToken;
  userId = signupRes.body.user.id;
});

after(async () => {
  await stopTestDB();
});

afterEach(async () => {
  await Course.deleteMany({});
});

describe('Analytics routes', () => {
  it('should compute credits-status with normalized baskets', async () => {
    // Insert courses with alias basket names
    await Course.create({ userId, courseCode: 'C1', courseName: 'Core 1', credits: 4, grade: 'A', semester: 'I', academicYear: '2023-24', basketType: 'dept core', department: 'CSE' });
    await Course.create({ userId, courseCode: 'C2', courseName: 'Elective 1', credits: 3, grade: 'B', semester: 'I', academicYear: '2023-24', basketType: 'discipline-elective', department: 'CSE' });
    await Course.create({ userId, courseCode: 'C3', courseName: 'HSS 1', credits: 2, grade: 'F', semester: 'I', academicYear: '2023-24', basketType: 'hss', department: 'HSS' });

    const res = await agent.get('/api/analytics/credits-status').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(res.status, 200);
    const body = res.body;
    assert.equal(body.programCode, 'BTech_CSE');
    // find Discipline Core basket
    const discCore = body.baskets.find(b => b.basketName === 'Discipline Core');
    assert.ok(discCore);
    assert.equal(discCore.completed, 4);
    // discipline elective
    const discElect = body.baskets.find(b => b.basketName === 'Discipline Elective');
    assert.ok(discElect);
    assert.equal(discElect.completed, 3);
    // hss should not count failed course
    const hss = body.baskets.find(b => b.basketName === 'HSS');
    if (hss) assert.equal(hss.completed, 0);
  });

  it('should return GPA data', async () => {
    await Course.create({ userId, courseCode: 'G1', courseName: 'GPA1', credits: 4, grade: 'A', semester: 'I', academicYear: '2023-24', basketType: 'Institute Core' });
    await Course.create({ userId, courseCode: 'G2', courseName: 'GPA2', credits: 3, grade: 'B', semester: 'II', academicYear: '2023-25', basketType: 'Institute Core' });

    const res = await agent.get('/api/analytics/gpa').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(res.status, 200);
    const body = res.body;
    assert.ok(typeof body.overallCPI === 'number');
    assert.ok(body.totalGradedCredits >= 7);
  });
});

```

## backend/test/auth.test.js

```js
import express from 'express';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import assert from 'assert';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth.js';
import { startTestDB, stopTestDB } from './setupTest.js';
import User from '../models/User.js';

dotenv.config();

let app;
let agent;

before(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
  await startTestDB();

  app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/auth', authRoutes);

  agent = request.agent(app);
});

after(async () => {
  await stopTestDB();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth routes', () => {
  it('should signup a user and set refresh cookie', async () => {
    const res = await agent.post('/api/auth/signup').send({ email: 'test@example.com', password: 'password123' });
    assert.equal(res.status, 201);
    assert.ok(res.body.accessToken);
    assert.ok(res.body.user);
    const cookies = res.headers['set-cookie'];
    assert.ok(cookies && cookies.some(c => c.startsWith('refreshToken')));
  });

  it('should login existing user and return tokens', async () => {
    // create user via signup
    await agent.post('/api/auth/signup').send({ email: 'a@a.com', password: 'password123' });
    const res = await agent.post('/api/auth/login').send({ email: 'a@a.com', password: 'password123' });
    assert.equal(res.status, 200);
    assert.ok(res.body.accessToken);
    const cookies = res.headers['set-cookie'];
    assert.ok(cookies && cookies.some(c => c.startsWith('refreshToken')));
  });

  it('should refresh token using refresh cookie', async () => {
    // signup to get cookie
    const signupRes = await agent.post('/api/auth/signup').send({ email: 'b@b.com', password: 'password123' });
    const cookies = signupRes.headers['set-cookie'];
    assert.ok(cookies && cookies.some(c => c.startsWith('refreshToken')));

    // use agent which preserves cookies
    const refreshRes = await agent.post('/api/auth/refresh');
    assert.equal(refreshRes.status, 200);
    assert.ok(refreshRes.body.accessToken);
    const newCookies = refreshRes.headers['set-cookie'];
    assert.ok(newCookies && newCookies.some(c => c.startsWith('refreshToken')));
  });

  it('should logout and clear cookie', async () => {
    await agent.post('/api/auth/signup').send({ email: 'c@c.com', password: 'password123' });
    const res = await agent.post('/api/auth/logout');
    assert.equal(res.status, 200);
    const cookies = res.headers['set-cookie'];
    // cookie should be cleared (contains Expires or Max-Age=0)
    assert.ok(cookies && cookies.some(c => /refreshToken=.*;(?:.*(Expires=Thu, 01 Jan 1970)|Max-Age=0)/i.test(c) || /refreshToken=;/i.test(c)));
  });
});

```

## backend/test/setupTest.js

```js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export async function startTestDB() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: 'test' });
  return uri;
}

export async function stopTestDB() {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }
  if (mongoServer) await mongoServer.stop();
}

```

## backend/utils/basketMapper.js

```js
const canonicalMap = new Map([
  // Discipline Core variations
  ['discipline core', 'Discipline Core'],
  ['dept core', 'Discipline Core'],
  ['dept-core', 'Discipline Core'],
  // Discipline Elective variations
  ['discipline elective', 'Discipline Elective'],
  ['discipline-elective', 'Discipline Elective'],
  ['dept elective', 'Discipline Elective'],
  // Institute Core
  ['institute core', 'Institute Core'],
  ['institute-core', 'Institute Core'],
  ['core', 'Institute Core'],
  // HSS
  ['hss', 'HSS'],
  // Science Basket
  ['science basket', 'Science Basket'],
  ['science', 'Science Basket'],
  // Mathematics Basket
  ['mathematics basket', 'Mathematics Basket'],
  ['math basket', 'Mathematics Basket'],
  ['mathematics', 'Mathematics Basket'],
  // Materials Basket
  ['materials basket', 'Materials Basket'],
  ['materials', 'Materials Basket'],
  // General Education
  ['general education', 'General Education'],
  ['gen ed', 'General Education'],
  ['general', 'General Education'],
  // Open Elective
  ['open elective', 'Open Elective'],
  ['open', 'Open Elective'],
  ['oe', 'Open Elective'],
  // Project
  ['project', 'Project'],
  ['capstone', 'Project'],
  // Other / fallback
  ['other', 'Other']
]);

export function normalizeBasketName(raw) {
  if (!raw) return 'Other';
  const key = String(raw).trim().toLowerCase();
  if (canonicalMap.has(key)) return canonicalMap.get(key);

  // Try fuzzy matching by removing punctuation and extra spaces
  const cleaned = key.replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (canonicalMap.has(cleaned)) return canonicalMap.get(cleaned);

  // If not recognized, title-case the cleaned string
  return cleaned.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

export default normalizeBasketName;

```

## backend/utils/logger.js

```js
import winston from 'winston';

const { combine, timestamp, errors, json, splat } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    json()
  ),
  transports: [new winston.transports.Console()]
});

export default logger;

```

## frontend/index.html

```html
<!-- frontend/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IITGN Academic Tracker | Track Your Degree Progress</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

## frontend/package.json

```json
{
  "name": "iitgn-academic-tracker-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.2",
    "focus-trap-react": "^9.0.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-router-dom": "^6.20.0",
    "recharts": "^2.10.3",
    "vercel": "^56.5.0",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}

```

## frontend/postcss.config.js

```js
// frontend/postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

## frontend/src/App.jsx

```jsx
// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

// Lazy load pages - only loaded when needed
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const BasketTrackingPage = lazy(() => import('./pages/BasketTrackingPage'));
const CourseHistoryPage = lazy(() => import('./pages/CourseHistoryPage'));
const SemesterPlannerPage = lazy(() => import('./pages/SemesterPlannerPage'));
const ProgramSetupPage = lazy(() => import('./pages/ProgramSetupPage'));
const HonoursMinorPage = lazy(() => import('./pages/HonoursMinorPage'));

// Loading component
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-right" />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/setup" element={
                <ProtectedRoute>
                  <ProgramSetupPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/basket-tracking" element={
                <ProtectedRoute>
                  <BasketTrackingPage />
                </ProtectedRoute>
              } />
              <Route path="/course-history" element={
                <ProtectedRoute>
                  <CourseHistoryPage />
                </ProtectedRoute>
              } />
              <Route path="/semester-planner" element={
                <ProtectedRoute>
                  <SemesterPlannerPage />
                </ProtectedRoute>
              } />
              <Route path="/honours-minor" element={
                <ProtectedRoute>
                  <HonoursMinorPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
```

## frontend/src/components/AddEditCourseModal.jsx

```jsx
import { useState, useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
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

  const modalRef = useRef(null);
  const firstFieldRef = useRef(null);

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

  // Focus management and keyboard handling for accessibility
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement;
    // focus the first input when modal opens
    requestAnimationFrame(() => {
      firstFieldRef.current?.focus();
    });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      try { prev?.focus(); } catch (e) {}
    };
  }, [isOpen, onClose]);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog" aria-modal="true" aria-labelledby="add-course-title">
      <FocusTrap active={isOpen} focusTrapOptions={{ initialFocus: () => firstFieldRef.current }}>
        <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <h2 id="add-course-title" className="text-lg md:text-xl font-bold">{course ? 'Edit Course' : 'Add Course'}</h2>
            <button aria-label="Close dialog" onClick={onClose} className="ml-3 text-gray-500 hover:text-gray-700">✕</button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-3 md:space-y-4">
          <div>
            <label htmlFor="course-code-input" className="block text-sm font-medium mb-1">Course Code *</label>
            <CourseSearchInput
              inputId="course-code-input"
              refInput={firstFieldRef}
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
            <label htmlFor="course-name-input" className="block text-sm font-medium mb-1">Course Name</label>
            <input id="course-name-input" type="text" value={formData.courseName} onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm" required />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="credits-input" className="block text-sm font-medium mb-1">Credits</label>
              <input id="credits-input" type="number" step="0.5" min="0.5" max="6" value={formData.credits}
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
              <label htmlFor="semester-select" className="block text-sm font-medium mb-1">Semester</label>
              <select value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                id="semester-select" className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="I">I</option><option value="II">II</option><option value="Summer">Summer</option>
              </select>
            </div>
            <div>
              <label htmlFor="academic-year-select" className="block text-sm font-medium mb-1">Academic Year</label>
              <select id="academic-year-select" value={formData.academicYear} onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm">
                <option>2024-25</option><option>2025-26</option><option>2026-27</option>
                <option>2027-28</option><option>2028-29</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="basket-select" className="block text-sm font-medium mb-1">Basket</label>
            <select id="basket-select" value={formData.basketType} onChange={(e) => setFormData({ ...formData, basketType: e.target.value })}
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
      </FocusTrap>
    </div>
  );
}

```

## frontend/src/components/AddEditPlannedModal.jsx

```jsx
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

```

## frontend/src/components/BulkImportModal.jsx

```jsx
// frontend/src/components/BulkImportModal.jsx
import { useState } from 'react';
import toast from 'react-hot-toast';

// Helper functions for auto-detection (same as before)
const detectDepartment = (courseCode) => {
  const code = courseCode.toUpperCase();
  if (code.startsWith('CS')) return 'CSE';
  if (code.startsWith('ES')) return 'Institute';
  if (code.startsWith('MA')) return 'Maths';
  if (code.startsWith('PH')) return 'Physics';
  if (code.startsWith('CH')) return 'Chemistry';
  if (code.startsWith('HS')) return 'HSS';
  if (code.startsWith('EE')) return 'EE';
  if (code.startsWith('ME')) return 'ME';
  if (code.startsWith('CE')) return 'Civil';
  if (code.startsWith('CL')) return 'ChemE';
  if (code.startsWith('MSE')) return 'MSE';
  if (code.startsWith('IN')) return 'Institute';
  if (code.startsWith('PE')) return 'Institute';
  if (code.startsWith('BS')) return 'Institute';
  if (code.startsWith('GE')) return 'Institute';
  if (code.startsWith('FP')) return 'Institute';
  return 'Other';
};

const detectBasketType = (courseCode, courseName) => {
  const code = courseCode.toUpperCase();
  const name = courseName.toLowerCase();
  
  // Institute Core
  if (['FP100', 'ES101', 'ES112', 'ES115', 'ES116', 'ES117', 'MA103', 'MA104', 'MA203', 'BS192', 'PE101', 'PE102', 'PE103', 'PE104', 'IN101', 'IN102', 'IN103', 'IN104', 'IN105', 'IN106', 'IN107', 'IN108', 'ES113', 'ES114', 'ES119', 'ES211', 'ES212', 'ES214', 'ES221', 'ES242', 'ES243', 'ES244', 'ES245'].includes(code)) {
    return 'Institute Core';
  }
  
  // HSS
  if (code.startsWith('HS') || name.includes('writing') || name.includes('philosophy') || name.includes('economics') || name.includes('civilization') || name.includes('language') || name.includes('french') || name.includes('japanese') || name.includes('mandarin') || name.includes('urdu') || name.includes('sanskrit')) {
    return 'HSS';
  }
  
  // Science Basket
  if (['PH201', 'PH202', 'PH203', 'CH203', 'CH302', 'CG503', 'CG505', 'EH303', 'EH304', 'BS401'].includes(code)) {
    return 'Science Basket';
  }
  
  // Mathematics Basket
  if (['MA204', 'MA205', 'MA206'].includes(code)) {
    return 'Mathematics Basket';
  }
  
  // Materials Basket
  if (['ES118', 'MSE211', 'MSE314', 'MSE202', 'MSE204', 'MSE207', 'MSE210'].includes(code)) {
    return 'Materials Basket';
  }
  
  // General Education
  if (code.startsWith('GE')) {
    return 'General Education';
  }
  
  // Discipline Core (CSE/AI)
  if (['CS201', 'CS202', 'CS203', 'CS303', 'CS328', 'CS329', 'CS330', 'CS331', 'ES242', 'ES301', 'ES336', 'CS303'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (EE)
  if (['EE221', 'EE223', 'EE224', 'EE225', 'EE226', 'EE227', 'EE312', 'EE322', 'EE323', 'EE333', 'EE341'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (ME)
  if (['ME206', 'ME207', 'ME208', 'ME209', 'ME333', 'ME334', 'ME335', 'ME337', 'ME362'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (ChemE)
  if (['CL201', 'CL202', 'CL203', 'CL204', 'CL205', 'CL313', 'CL314', 'CL315', 'CL316', 'CL317', 'CL325', 'CL326', 'CL327'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (Civil)
  if (['CE201', 'CE202', 'CE203', 'CE301', 'CE302', 'CE310', 'CE311', 'CE312', 'CE313', 'CE314', 'CE403', 'CE404'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Discipline Core (MSE)
  if (['MSE202', 'MSE204', 'MSE205', 'MSE206', 'MSE207', 'MSE210', 'MSE302', 'MSE304', 'MSE307', 'MSE312', 'MSE313', 'MSE315'].includes(code)) {
    return 'Discipline Core';
  }
  
  // Project
  if (code === 'OPC' || (code.includes('299') || code.includes('399') || code.includes('499')) || name.includes('project')) {
    return 'Project';
  }
  
  return 'Discipline Elective';
};

export default function BulkImportModal({ isOpen, onClose, onImport, existingCourseCodes = [] }) {
  const [importText, setImportText] = useState('');
  const [preview, setPreview] = useState([]);
  const [detectedSemester, setDetectedSemester] = useState('');
  const [detectedYear, setDetectedYear] = useState('');
  const [duplicateAction, setDuplicateAction] = useState('skip'); // 'skip', 'replace', 'keep-both'
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const parseIMSData = (text) => {
    const lines = text.split('\n');
    const courses = [];
    let currentSemester = '';
    let currentYear = '';
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;
      
      if (line.includes('Academic Period:')) {
        const match = line.match(/Academic Period:\s*(\d{4}-\d{4})\s*Semester\s*(\w+)/i);
        if (match) {
          currentYear = match[1];
          currentSemester = match[2];
        }
        continue;
      }
      
      if (line.match(/^semester\s+\w+$/i)) {
        const semMatch = line.match(/semester\s+(\w+)/i);
        if (semMatch) {
          currentSemester = semMatch[1];
        }
        continue;
      }
      
      if (line.match(/^course\s+no/i) || 
          line.match(/^course\s+name/i) || 
          line.match(/^credit/i) ||
          line === 'Course No' ||
          line === 'Course Name' ||
          line === 'Credit') {
        continue;
      }
      
      if (line.match(/^[-]+$/) || line.match(/^[=]+$/)) {
        continue;
      }
      
      const parts = line.split(/\t+/);
      
      if (parts.length >= 3) {
        let courseCode = parts[0].trim();
        courseCode = courseCode.replace(/\s+/g, '');
        
        let courseName = parts[1].trim();
        let credits = parseFloat(parts[2].trim());
        
        if (isNaN(credits) || credits === 0) {
          continue;
        }
        
        courses.push({
          courseCode: courseCode,
          courseName: courseName,
          credits: credits,
          grade: '',
          semester: currentSemester || 'I',
          academicYear: currentYear || '2026-27'
        });
      }
    }
    
    return courses;
  };

  const checkDuplicates = (courses) => {
    return courses.map(course => ({
      ...course,
      isDuplicate: existingCourseCodes.includes(course.courseCode),
      existingCourse: existingCourseCodes.includes(course.courseCode)
    }));
  };

  const handlePreview = () => {
    if (!importText.trim()) {
      toast.error('Please paste IMS course data');
      return;
    }
    
    let parsed = parseIMSData(importText);
    if (parsed.length === 0) {
      toast.error('No valid courses found');
      return;
    }
    
    // Check for duplicates
    parsed = checkDuplicates(parsed);
    const duplicateCount = parsed.filter(c => c.isDuplicate).length;
    
    if (parsed.length > 0) {
      setDetectedSemester(parsed[0].semester);
      setDetectedYear(parsed[0].academicYear);
    }
    
    setPreview(parsed);
    setShowDuplicateWarning(duplicateCount > 0);
    
    if (duplicateCount > 0) {
      toast.warning(`Found ${duplicateCount} course(s) already in your record`);
    } else {
      toast.success(`Found ${parsed.length} new courses`);
    }
  };

  const getFilteredCourses = () => {
    if (duplicateAction === 'skip') {
      return preview.filter(c => !c.isDuplicate);
    } else if (duplicateAction === 'replace') {
      // For replace, we still return duplicates but they will replace existing ones
      return preview;
    } else {
      // keep-both - return all
      return preview;
    }
  };

  const handleImport = () => {
    if (preview.length === 0) {
      toast.error('No courses to import');
      return;
    }
    
    const filteredCourses = getFilteredCourses();
    const duplicatesToReplace = duplicateAction === 'replace' ? preview.filter(c => c.isDuplicate) : [];
    const newCourses = filteredCourses.filter(c => !c.isDuplicate);
    
    if (filteredCourses.length === 0) {
      toast.error('No new courses to import after filtering duplicates');
      return;
    }
    
    // Enrich courses with department and basket
    const enrichedCourses = filteredCourses.map(course => ({
      ...course,
      department: detectDepartment(course.courseCode),
      basketType: detectBasketType(course.courseCode, course.courseName)
    }));
    
    onImport(enrichedCourses, detectedSemester, detectedYear, {
      action: duplicateAction,
      duplicatesToReplace: duplicatesToReplace.map(c => c.courseCode)
    });
    
    setImportText('');
    setPreview([]);
    setDetectedSemester('');
    setDetectedYear('');
    setShowDuplicateWarning(false);
    onClose();
  };

  if (!isOpen) return null;

  // Get duplicate info for display
  const duplicateCourses = preview.filter(c => c.isDuplicate);
  const newCourses = preview.filter(c => !c.isDuplicate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Bulk Import from IMS Portal</h2>
        <p className="text-sm text-gray-600 mb-4">
          Copy and paste your course table directly from IMS
        </p>
        
        <div className="mb-4">
          <div className="bg-gray-100 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap mb-3">
            Academic Period: 2023-2024 Semester II<br/>
            Course No	Course Name	Credit<br/>
            ES 101	Engineering Graphics	3<br/>
            ES 112	Computing	3
          </div>
          
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste your IMS course data here..."
            rows={8}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue font-mono text-sm"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePreview}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Preview Courses
          </button>
        </div>

        {/* Duplicate Handling Options */}
        {showDuplicateWarning && duplicateCourses.length > 0 && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="font-semibold text-yellow-800 mb-2">
              ⚠️ {duplicateCourses.length} duplicate course(s) detected
            </p>
            <div className="text-sm text-yellow-700 mb-3">
              Already in your record: {duplicateCourses.map(c => c.courseCode).join(', ')}
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateAction"
                  value="skip"
                  checked={duplicateAction === 'skip'}
                  onChange={() => setDuplicateAction('skip')}
                />
                <span className="text-sm">Skip duplicates (only import {newCourses.length} new courses)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateAction"
                  value="replace"
                  checked={duplicateAction === 'replace'}
                  onChange={() => setDuplicateAction('replace')}
                />
                <span className="text-sm">Replace existing courses (delete old, import new versions)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="duplicateAction"
                  value="keep-both"
                  checked={duplicateAction === 'keep-both'}
                  onChange={() => setDuplicateAction('keep-both')}
                />
                <span className="text-sm">Keep both (add duplicates as separate entries)</span>
              </label>
            </div>
          </div>
        )}

        {preview.length > 0 && (
          <>
            <div className="mb-2 text-sm text-gray-600">
              📅 {detectedYear} - Semester {detectedSemester}
              {showDuplicateWarning && (
                <span className="ml-2 text-orange-600">
                  ({newCourses.length} new, {duplicateCourses.length} duplicates)
                </span>
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Preview ({preview.length} courses)</h3>
              <div className="bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-2">Code</th>
                      <th className="pb-2">Course Name</th>
                      <th className="pb-2">Credits</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.slice(0, 15).map((course, idx) => (
                      <tr key={idx} className={`border-t ${course.isDuplicate ? 'bg-yellow-50' : ''}`}>
                        <td className="py-1 font-mono text-xs">{course.courseCode}</td>
                        <td className="py-1 text-sm">{course.courseName}</td>
                        <td className="py-1">{course.credits}</td>
                        <td className="py-1">
                          {course.isDuplicate ? (
                            <span className="text-xs text-yellow-600">⚠️ Duplicate</span>
                          ) : (
                            <span className="text-xs text-green-600">✓ New</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {preview.length > 15 && (
                      <tr className="border-t">
                        <td colSpan="4" className="py-2 text-gray-400 text-center">
                          ... and {preview.length - 15} more courses
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end space-x-3 border-t pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={preview.length === 0 || (showDuplicateWarning && duplicateAction === 'skip' && newCourses.length === 0)}
            className={`px-4 py-2 rounded-lg transition ${
              preview.length > 0 && !(showDuplicateWarning && duplicateAction === 'skip' && newCourses.length === 0)
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Import {duplicateAction === 'skip' && newCourses.length > 0 ? newCourses.length : preview.length} Course(s)
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
          <p className="font-semibold mb-1">💡 Duplicate Handling:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Skip</strong> - Only add courses you haven't taken before</li>
            <li><strong>Replace</strong> - Delete old version and add new version (useful for updating grades)</li>
            <li><strong>Keep Both</strong> - Add duplicate as separate entry (not recommended)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

```

## frontend/src/components/CPIWarning.jsx

```jsx
// frontend/src/components/CPIWarning.jsx
export default function CPIWarning({ cpi, children }) {
  const isLowCPI = cpi < 6.0;
  const isMediumCPI = cpi >= 6.0 && cpi < 7.0;
  const isGoodCPI = cpi >= 7.0 && cpi < 8.5;
  const isExcellentCPI = cpi >= 8.5;
  
  if (isLowCPI) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-red-600 text-xl mr-3">⚠️</span>
          <div>
            <p className="font-semibold text-red-800">CPI below 6.0</p>
            <p className="text-red-700 text-sm">Your current CPI is {cpi.toFixed(2)}. Please consult your faculty advisor.</p>
          </div>
        </div>
        {children}
      </div>
    );
  }
  
  if (isMediumCPI) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-yellow-600 text-xl mr-3">📊</span>
          <div>
            <p className="font-semibold text-yellow-800">CPI: {cpi.toFixed(2)}</p>
            <p className="text-yellow-700 text-sm">You need CPI ≥ 7.0 for semester overload permission.</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (isGoodCPI) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-green-600 text-xl mr-3">🎯</span>
          <div>
            <p className="font-semibold text-green-800">CPI: {cpi.toFixed(2)}</p>
            <p className="text-green-700 text-sm">Good standing! You are eligible for overload (up to 32 credits with advisor approval).</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (isExcellentCPI) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-blue-600 text-xl mr-3">🏆</span>
          <div>
            <p className="font-semibold text-blue-800">Excellent CPI: {cpi.toFixed(2)}</p>
            <p className="text-blue-700 text-sm">Eligible for fellowship (CPI ≥ 8.0) and academic honors.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}

```

## frontend/src/components/CourseSearchInput.jsx

```jsx
// frontend/src/components/CourseSearchInput.jsx
import { useState, useEffect, useRef } from 'react';

// Full course catalog - MOVED OUTSIDE COMPONENT (this is correct)
const COURSE_CATALOG = [
  // First Year Institute Core
  { courseCode: 'FP100', courseName: 'Foundation Programme', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES101', courseName: 'Engineering Graphics', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES112', courseName: 'Computing', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES115', courseName: 'Design, Innovation and Prototyping', credits: 5, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES119', courseName: 'Principles of Artificial Intelligence', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'MA103', courseName: 'Calculus of Single Variable and Linear Algebra', credits: 4, basketType: 'Institute Core', department: 'Maths' },
  { courseCode: 'HS191', courseName: 'Introduction to Writing I', credits: 2, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS192', courseName: 'Introduction to Writing II', credits: 2, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'BS192', courseName: 'Undergraduate Science Laboratory', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'PE101', courseName: 'Physical Education', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  
  // Second Year
  { courseCode: 'ES113', courseName: 'Data-Centric Computing', credits: 3, basketType: 'Institute Core', department: 'Institute', applicableBatches: ['2022-23', '2023-24', '2024-25'] },
  { courseCode: 'ES114', courseName: 'Probability, Statistics and Data Visualization', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES116', courseName: 'Principles and Applications of Electrical Engineering', credits: 5, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES117', courseName: 'The World of Engineering', credits: 2, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES118', courseName: 'Materials for the Future', credits: 3, basketType: 'Materials Basket', department: 'MSE' },
  { courseCode: 'GE101', courseName: 'General Education I', credits: 2, basketType: 'General Education', department: 'Institute' },
  { courseCode: 'GE201', courseName: 'General Education II', credits: 2, basketType: 'General Education', department: 'Institute' },
  { courseCode: 'MA104', courseName: 'Ordinary Differential Equations', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'MA203', courseName: 'Numerical Methods', credits: 2, basketType: 'Institute Core', department: 'Maths' },
  { courseCode: 'MA205', courseName: 'Calculus of Several Variables', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'MA206', courseName: 'Introduction to Complex Analysis', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'ES211', courseName: 'Thermodynamics', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES214', courseName: 'Discrete Mathematics', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES221', courseName: 'Mechanics of Solids', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES242', courseName: 'Data Structures and Algorithms I', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'ES243', courseName: 'Biology for Engineers', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES244', courseName: 'Signals, Systems and Random Processes', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES245', courseName: 'Control Systems', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES301', courseName: 'Data Structures and Algorithms II', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'ES335', courseName: 'Machine Learning', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES336', courseName: 'Computer Organization and Architecture', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  
  // HSS Courses
  { courseCode: 'HS151', courseName: 'Economics', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS221', courseName: 'Introduction to Philosophy', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS201', courseName: 'World Civilizations and Cultures', credits: 4, basketType: 'HSS', department: 'HSS' },
  
  // Science Basket
  { courseCode: 'PH201', courseName: 'Introduction to Electrodynamics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  { courseCode: 'PH202', courseName: 'Introduction to Quantum Physics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  { courseCode: 'PH203', courseName: 'Solid State Physics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  
  // CSE Courses
  { courseCode: 'CS201', courseName: 'Theory of Computing', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS202', courseName: 'Software Tools and Techniques for CSE', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS203', courseName: 'Software Tools and Techniques for AI', credits: 4, basketType: 'Discipline Core', department: 'AI' },
  { courseCode: 'CS328', courseName: 'Introduction to Data Science', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS329', courseName: 'Foundations of AI: Multiagent Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS330', courseName: 'Operating Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS331', courseName: 'Computer Networks', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS432', courseName: 'Databases', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  
  // EE Courses (Updated: EE 341 replaces EE 313 for 2025-26)
  { courseCode: 'EE221', courseName: 'Electronic Devices', credits: 3, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE223', courseName: 'Electrical Machines', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE224', courseName: 'Power Systems', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE226', courseName: 'Semiconductor Devices', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE312', courseName: 'Engineering Electromagnetics', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE322', courseName: 'Analog and Mixed Signal Circuits', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE323', courseName: 'Digital Signal Processing', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE333', courseName: 'Power Electronics', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE313', courseName: 'Communication Systems', credits: 3, basketType: 'Discipline Core', department: 'EE', applicableBatches: ['2022-23', '2023-24', '2024-25'] },
  { courseCode: 'EE341', courseName: 'Communication Systems', credits: 4, basketType: 'Discipline Core', department: 'EE', applicableBatches: ['2025-26', '2026-27', '2027-28'] },
  
  // ME Courses
  { courseCode: 'ME206', courseName: 'Statics and Dynamics', credits: 4, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME207', courseName: 'Fluid Dynamics', credits: 5, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME208', courseName: 'Vibrations', credits: 2, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME209', courseName: 'Principles of Manufacturing Processes', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME333', courseName: 'Mechanics of Materials', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME334', courseName: 'Heat and Mass Transfer', credits: 4, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME335', courseName: 'Synthesis and Analysis of Mechanisms', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME337', courseName: 'Mechanical Systems Design', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME362', courseName: 'Introduction to Manufacturing Systems and Metrology', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  
  // ChemE Courses
  { courseCode: 'CL201', courseName: 'Chemical Process Calculations', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL202', courseName: 'Chemical Engineering Thermodynamics', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL203', courseName: 'Process Fluid Mechanics', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL204', courseName: 'Heat Transfer', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL205', courseName: 'Chemical Reaction Engineering I', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL313', courseName: 'Chemical Reaction Engineering II', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL314', courseName: 'Separation Processes I', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL315', courseName: 'Process Dynamics and Control', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL316', courseName: 'Separation Processes II', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL317', courseName: 'Process Synthesis, Design and Simulation', credits: 4, basketType: 'Discipline Core', department: 'ChemE' },
  
  // Civil Courses
  { courseCode: 'CE201', courseName: 'Earth Materials and Processes', credits: 2, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE202', courseName: 'Sustainability and Environment', credits: 3, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE203', courseName: 'Geospatial Engineering', credits: 3, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE301', courseName: 'Soil Mechanics', credits: 5, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE302', courseName: 'Structural Analysis', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE310', courseName: 'Hydrology and Hydraulics', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE311', courseName: 'Design of Reinforced Concrete Structures', credits: 5, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE312', courseName: 'Design of Steel Structures', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE403', courseName: 'Construction Technology and Management', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE404', courseName: 'Transportation Engineering', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  
  // MSE Courses
  { courseCode: 'MSE202', courseName: 'Materials Thermodynamics', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE204', courseName: 'Transport Phenomena in Materials Engineering', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE205', courseName: 'Mechanical Behaviour of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE206', courseName: 'Physics of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE207', courseName: 'Structure of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE210', courseName: 'Microstructural Engineering', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE302', courseName: 'Corrosion and Degradation of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE304', courseName: 'Principles of Metal Extraction and Refining', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE307', courseName: 'Materials Processing', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE313', courseName: 'Polymers, Ceramics and Composites', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE314', courseName: 'Materials Selection and Design', credits: 3, basketType: 'Materials Basket', department: 'MSE' },
];

// Helper function to get applicable courses based on admission year
export const getApplicableCourses = (admissionYear) => {
  if (!admissionYear) return COURSE_CATALOG;
  
  const yearRange = `${admissionYear}-${String(Number(admissionYear) + 1).slice(-2)}`;
  
  return COURSE_CATALOG.filter(course => {
    // If no batch restriction, show for all
    if (!course.applicableBatches) return true;
    // Check if course is applicable for this batch
    return course.applicableBatches.includes(yearRange);
  });
};

export default function CourseSearchInput({ 
  value, 
  onChange, 
  onSelect, 
  placeholder = "Search course...", 
  className = "",
  admissionYear = null, // Pass admission year from parent
  inputId = undefined,
  refInput = undefined
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const [highlighted, setHighlighted] = useState(-1);

  // Get applicable courses based on admission year
  const applicableCourses = getApplicableCourses(admissionYear);

  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const searchTerm = value.toLowerCase();
    const filtered = applicableCourses.filter(course => 
      course.courseCode.toLowerCase().includes(searchTerm) ||
      course.courseName.toLowerCase().includes(searchTerm)
    ).slice(0, 8);
    
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [value, applicableCourses]);

  const handleSelect = (course) => {
    onChange(course.courseCode);
    if (onSelect) {
      onSelect(course);
    }
    setShowSuggestions(false);
    setHighlighted(-1);
    // return focus to input after selecting
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      if (highlighted >= 0 && suggestions[highlighted]) {
        handleSelect(suggestions[highlighted]);
        e.preventDefault();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlighted(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1">
      <input
        id={inputId}
        ref={(el) => {
          inputRef.current = el;
          if (refInput) refInput.current = el;
        }}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        aria-controls={inputId ? `${inputId}-listbox` : undefined}
        aria-activedescendant={highlighted >= 0 ? (inputId ? `${inputId}-option-${highlighted}` : undefined) : undefined}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div 
          id={inputId ? `${inputId}-listbox` : undefined}
          ref={suggestionsRef} 
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {suggestions.map((course, idx) => (
            <div 
              id={inputId ? `${inputId}-option-${idx}` : undefined}
              key={idx} 
              role="option"
              aria-selected={highlighted === idx}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(course)} 
              className={`px-3 py-2 cursor-pointer border-b last:border-0 ${highlighted === idx ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-sm">{course.courseCode}</span>
                  <span className="ml-2 text-sm text-gray-600">{course.courseName}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400">{course.credits} cr</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {course.basketType === 'Institute Core' ? 'Core' : 
                     course.basketType === 'Discipline Core' ? 'Dept Core' :
                     course.basketType === 'Discipline Elective' ? 'Elective' : 
                     course.basketType === 'HSS' ? 'HSS' : 'Other'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {value.length >= 2 && suggestions.length === 0 && (
        <div className="text-xs text-gray-400 mt-1">
          No matches. Try "CS", "MA", "ES", "EE", "ME", "CL", "CE"
        </div>
      )}
    </div>
  );
}
```

## frontend/src/components/Navbar.jsx

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';

export default function Navbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="text-lg md:text-2xl font-bold text-blue-600 truncate">
            IITGN Academic Tracker
          </Link>
          
          {/* Desktop Navigation */}
          {user ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <Link to="/basket-tracking" className="text-gray-700 hover:text-blue-600">Baskets</Link>
                <Link to="/course-history" className="text-gray-700 hover:text-blue-600">Courses</Link>
                <Link to="/semester-planner" className="text-gray-700 hover:text-blue-600">Planner</Link>
                <Link to="/honours-minor" className="text-gray-700 hover:text-blue-600">Honours/Minor</Link>
                <UserProfileDropdown />
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </>
          ) : (
            <Link to="/" className="text-gray-700 hover:text-blue-600">Login</Link>
          )}
        </div>
        
        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Dashboard</Link>
              <Link to="/basket-tracking" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Baskets</Link>
              <Link to="/course-history" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Courses</Link>
              <Link to="/semester-planner" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Planner</Link>
              <Link to="/honours-minor" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Honours/Minor</Link>
              <div className="pt-2 border-t">
                <UserProfileDropdown />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

```

## frontend/src/components/ProgressBar.jsx

```jsx
// frontend/src/components/ProgressBar.jsx
export default function ProgressBar({ label, current, target, color = 'blue', showPercentage = true }) {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const isComplete = current >= target;
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600',
    teal: 'bg-teal-600',
    pink: 'bg-pink-600'
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-gray-500">
            {current} / {target} credits
            {showPercentage && ` (${Math.round(percentage)}%)`}
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${colorClasses[color]} rounded-full h-2.5 transition-all duration-500 ${isComplete ? 'bg-green-600' : ''}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {isComplete && target > 0 && (
        <p className="text-xs text-green-600 mt-1">✓ Requirement met</p>
      )}
    </div>
  );
}

```

## frontend/src/components/ProtectedRoute.jsx

```jsx
// frontend/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iitgn-blue"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/" />;
}

```

## frontend/src/components/UserProfileDropdown.jsx

```jsx
// frontend/src/components/UserProfileDropdown.jsx
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user's display name from email
  const getDisplayName = () => {
    if (!user?.email) return 'User';
    const emailPrefix = user.email.split('@')[0];
    // Convert to title case
    return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
  };

  const getInitials = () => {
    if (!user?.email) return 'U';
    const emailPrefix = user.email.split('@')[0];
    return emailPrefix.charAt(0).toUpperCase();
  };

  const getRollNumber = () => {
    if (!user?.email) return 'Not available';
    const emailPrefix = user.email.split('@')[0];
    // If email has numbers at the end, treat as roll number
    const match = emailPrefix.match(/\d+$/);
    if (match) return match[0];
    return emailPrefix;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleSettings = () => {
    navigate('/program-setup');
    setIsOpen(false);
  };

  // Generate a consistent color based on email
  const getProfileColor = () => {
    if (!user?.email) return 'bg-gray-500';
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = user.email.length % colors.length;
    return colors[index];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 focus:outline-none"
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getProfileColor()}`}>
          {getInitials()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700">{getDisplayName()}</p>
          <p className="text-xs text-gray-500">{getRollNumber()}</p>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Profile Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold ${getProfileColor()}`}>
                {getInitials()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{getDisplayName()}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-xs text-gray-400 mt-1">Roll No: {getRollNumber()}</p>
              </div>
            </div>
          </div>

          {/* Program Info */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-500">Program</p>
            <p className="text-sm font-medium text-gray-700">
              {user?.program?.replace('BTech_', 'B.Tech ') || 'Not set'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Admission Year: {user?.admissionYear || 'Not set'}</p>
          </div>

          {/* Honours/Minor Status */}
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Honours Track</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${user?.pursuingHonours ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {user?.pursuingHonours ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">Minor Track</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${user?.pursuingMinor ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {user?.pursuingMinor ? `Active (${user?.minorDiscipline || '?'})` : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleSettings}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Program Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

```

## frontend/src/context/AuthContext.jsx

```jsx
// frontend/src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to refresh access token using HttpOnly refresh cookie
    (async () => {
      try {
        const res = await api.post('/auth/refresh');
        const { accessToken, user } = res.data;
        if (accessToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
        if (user) {
          setUser(user);
          try { localStorage.setItem('user', JSON.stringify(user)); } catch (e) {}
        }
      } catch (e) {
        // no valid session
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { accessToken, user } = res.data;
      if (accessToken) api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      if (user) {
        setUser(user);
        try { localStorage.setItem('user', JSON.stringify(user)); } catch (e) {}
      }
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (email, password, program, admissionYear) => {
    try {
      const res = await api.post('/auth/signup', { 
        email, 
        password, 
        program: program || 'BTech_CSE',
        admissionYear: admissionYear || 2026
      });
      const { accessToken, user } = res.data;
      if (accessToken) api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      if (user) {
        setUser(user);
        try { localStorage.setItem('user', JSON.stringify(user)); } catch (e) {}
      }
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const updateProfile = async (updates) => {
    try {
      const res = await api.put('/auth/profile', updates);
      const updatedUser = res.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };

  const logout = () => {
    (async () => {
      try {
        await api.post('/auth/logout');
      } catch (e) {
        // ignore
      }
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      toast.success('Logged out');
    })();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

```

## frontend/src/data/courseCatalog.js

```js
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

```

## frontend/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }
  
  /* Responsive font sizes */
  h1 {
    @apply text-2xl md:text-3xl lg:text-4xl font-bold;
  }
  
  h2 {
    @apply text-xl md:text-2xl font-semibold;
  }
  
  /* Better touch targets for mobile */
  button, 
  a,
  [role="button"] {
    @apply min-h-[44px] md:min-h-0;
  }

  /* Visible focus styles for keyboard users */
  button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [role="button"]:focus-visible {
    @apply outline-none ring-2 ring-offset-2 ring-blue-500;
  }
  
  /* Responsive tables */
  table {
    @apply w-full text-sm md:text-base;
  }
  
  th, td {
    @apply px-3 py-2 md:px-6 md:py-3;
  }
}

@layer components {
  /* Responsive container */
  .container-responsive {
    @apply px-3 sm:px-4 md:px-6 lg:px-8 mx-auto;
  }
  
  /* Responsive card grid */
  .card-grid {
    @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6;
  }
  
  /* Responsive stats cards */
  .stat-card {
    @apply bg-white rounded-lg shadow-md p-3 md:p-4 lg:p-6;
  }
  
  /* Responsive buttons */
  .btn-responsive {
    @apply px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition;
  }
  
  /* Mobile-friendly table wrapper */
  .table-responsive {
    @apply overflow-x-auto -mx-3 md:mx-0;
  }
  
  .table-responsive table {
    @apply min-w-[600px] md:min-w-full;
  }
}

/* Custom scrollbar for better mobile experience */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

```

## frontend/src/main.jsx

```jsx
// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

## frontend/src/pages/BasketTrackingPage.jsx

```jsx
// frontend/src/pages/BasketTrackingPage.jsx
import { useState, useEffect } from 'react';
import { courseAPI, programAPI } from '../services/api';
import { getCreditsByBasket } from '../utils/gpaCalculator';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/ProgressBar';
import { basketLabels, basketOrder } from '../utils/programRequirements';
import toast from 'react-hot-toast';

export default function BasketTrackingPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [programRequirements, setProgramRequirements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedBasket, setExpandedBasket] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [coursesRes, requirementsRes] = await Promise.all([
        courseAPI.getAll(),
        programAPI.getRequirements(user?.program || 'BTech_CSE')
      ]);
      setCourses(coursesRes.data.filter(c => !c.isPlanned));
      setProgramRequirements(requirementsRes.data);
    } catch (error) {
      toast.error('Failed to load basket data');
    } finally {
      setLoading(false);
    }
  };

  const basketCredits = getCreditsByBasket(courses);
  
  // Group courses by basket
  const coursesByBasket = {};
  courses.forEach(course => {
    if (!coursesByBasket[course.basketType]) {
      coursesByBasket[course.basketType] = [];
    }
    coursesByBasket[course.basketType].push(course);
  });

  const getTargetForBasket = (basketName) => {
    const req = programRequirements?.basketRequirements?.find(r => r.basketName === basketName);
    return req?.minCredits || 0;
  };

  const getProgressStatus = (basketName) => {
    const current = basketCredits[basketName] || 0;
    const target = getTargetForBasket(basketName);
    if (target === 0) return 'info';
    if (current >= target) return 'complete';
    if (current >= target * 0.75) return 'good';
    if (current >= target * 0.5) return 'moderate';
    return 'low';
  };

  const statusColors = {
    complete: 'text-green-600 bg-green-50',
    good: 'text-blue-600 bg-blue-50',
    moderate: 'text-yellow-600 bg-yellow-50',
    low: 'text-red-600 bg-red-50',
    info: 'text-gray-600 bg-gray-50'
  };

  const statusLabels = {
    complete: '✓ Complete',
    good: 'Good Progress',
    moderate: 'Halfway There',
    low: 'Needs Attention',
    info: 'Optional'
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iitgn-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Basket Tracking</h1>
        <p className="text-gray-500">Track your progress across IITGN degree requirements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-iitgn-blue">{courses.length}</div>
          <div className="text-sm text-gray-500">Total Courses</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{Object.keys(basketCredits).length}</div>
          <div className="text-sm text-gray-500">Baskets Active</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Object.values(basketCredits).reduce((a, b) => a + b, 0)}
          </div>
          <div className="text-sm text-gray-500">Total Credits</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {programRequirements?.basketRequirements?.filter(r => {
              const current = basketCredits[r.basketName] || 0;
              return current >= r.minCredits && r.minCredits > 0;
            }).length || 0}
          </div>
          <div className="text-sm text-gray-500">Requirements Met</div>
        </div>
      </div>

      {/* Basket List */}
      <div className="space-y-4">
        {basketOrder.map(basket => {
          const current = basketCredits[basket] || 0;
          const target = getTargetForBasket(basket);
          const status = getProgressStatus(basket);
          const coursesInBasket = coursesByBasket[basket] || [];
          const isExpanded = expandedBasket === basket;

          if (target === 0 && coursesInBasket.length === 0) return null;

          return (
            <div key={basket} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Basket Header */}
              <div 
                className="p-5 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setExpandedBasket(isExpanded ? null : basket)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-800">{basket}</h2>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
                        {statusLabels[status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{basketLabels[basket]?.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        <span className="font-semibold">{current}</span> / {target} credits
                      </span>
                      {target > 0 && (
                        <span className="text-gray-500">
                          {Math.round((current / target) * 100)}% complete
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <ProgressBar
                        current={current}
                        target={target || 1}
                        color={basketLabels[basket]?.color?.split('-')[1] || 'blue'}
                        showPercentage={false}
                      />
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {isExpanded ? '▲' : '▼'}
                  </div>
                </div>
              </div>

              {/* Expanded Courses List */}
              {isExpanded && (
                <div className="border-t bg-gray-50 p-4">
                  <h3 className="font-medium text-gray-700 mb-3">Courses in this basket ({coursesInBasket.length})</h3>
                  {coursesInBasket.length > 0 ? (
                    <div className="space-y-2">
                      {coursesInBasket.map(course => (
                        <div key={course._id} className="bg-white rounded p-3 flex justify-between items-center">
                          <div>
                            <span className="font-mono text-sm text-gray-500">{course.courseCode}</span>
                            <span className="ml-2">{course.courseName}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">{course.credits} credits</span>
                            {course.grade && <span className="ml-3 font-semibold">{course.grade}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No courses added yet in this basket</p>
                  )}
                  
                  {target > 0 && current < target && (
                    <div className="mt-3 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                      💡 Need {target - current} more credits in {basket}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-2">Basket Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded-full"></div><span>Complete (≥ target)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-full"></div><span>Good (≥75%)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div><span>Moderate (≥50%)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span>Needs Attention (&lt;50%)</span></div>
        </div>
      </div>
    </div>
  );
}

```

## frontend/src/pages/CourseHistoryPage.jsx

```jsx
import { useState, useEffect } from 'react';
import { courseAPI, analyticsAPI } from '../services/api';
import AddEditCourseModal from '../components/AddEditCourseModal';
import BulkImportModal from '../components/BulkImportModal';
import { calculateCPI, calculateTotalCredits } from '../utils/gpaCalculator';
import { exportToExcel, exportGPAReport } from '../utils/exportExcel';
import normalizeBasketName from '../utils/basketMapper';
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
          basketType: normalizeBasketName(course.basketType || 'Discipline Core'),
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

```

## frontend/src/pages/DashboardPage.jsx

```jsx
import { useState, useEffect } from 'react';
import { courseAPI, analyticsAPI, programAPI } from '../services/api';
import { calculateCPI, calculateTotalCredits, getCreditsByBasket } from '../utils/gpaCalculator';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/ProgressBar';
import CPIWarning from '../components/CPIWarning';
import { programList, basketOrder, basketLabels } from '../utils/programRequirements';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programRequirements, setProgramRequirements] = useState(null);
  const [cpiData, setCpiData] = useState({ overallCPI: 0, semesterWiseGPA: {} });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [coursesRes, requirementsRes, gpaRes] = await Promise.all([
        courseAPI.getAll(),
        programAPI.getRequirements(user?.program || 'BTech_CSE'),
        analyticsAPI.getGPA()
      ]);
      setCourses(coursesRes.data);
      setProgramRequirements(requirementsRes.data);
      setCpiData(gpaRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const completedCourses = courses.filter(c => !c.isPlanned);
  const totalCredits = calculateTotalCredits(completedCourses);
  const basketCredits = getCreditsByBasket(completedCourses);
  const cpi = calculateCPI(completedCourses);
  // frontend/src/pages/DashboardPage.jsx
// Add batch-specific logic

  const getBatchSpecificRequirements = (program, admissionYear) => {
  // For EE students admitted from 2025-26
    if (program === 'BTech_EE' && admissionYear >= 2025) {
      return {
        totalCredits: 172,
        note: 'EE 341 (4 credits) replaces EE 313 (3 credits)'
      };
   }
  
  // For all students from 2025-26
    if (admissionYear >= 2025) {
      return {
       note: 'ES 119 (Principles of AI) replaces ES 113 (Data Centric Computing)'
     };
   }
  
   return {};
  };
  const getSemesterCreditsData = () => {
    const semesterCredits = {};
    completedCourses.forEach(course => {
      const key = `${course.academicYear} Sem ${course.semester}`;
      semesterCredits[key] = (semesterCredits[key] || 0) + course.credits;
    });
    return Object.entries(semesterCredits).map(([name, credits]) => ({ name, credits })).slice(-6);
  };

  const semesterCreditsData = getSemesterCreditsData();

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec489a'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-500">{programList[user?.program]?.name || user?.program}</p>
      </div>

      <CPIWarning cpi={cpi} />

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">CPI</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-blue-600">{cpi.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">Credits</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-green-600">{totalCredits}</div>
          <div className="text-xs text-gray-400">/ {programRequirements?.totalCreditsRequired || 170}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">Courses</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-purple-600">{completedCourses.length}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs md:text-sm text-gray-500">Planned</div>
          <div className="text-xl md:text-3xl lg:text-4xl font-bold text-orange-600">{courses.filter(c => c.isPlanned).length}</div>
        </div>
      </div>

      {/* Charts - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
        {/* Basket Progress */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Basket Progress</h2>
          <div className="space-y-3 md:space-y-4">
            {basketOrder.slice(0, 5).map(basket => {
              const requirement = programRequirements?.basketRequirements?.find(r => r.basketName === basket);
              const target = requirement?.minCredits || 0;
              const current = basketCredits[basket] || 0;
              if (target === 0 && current === 0) return null;
              return (
                <ProgressBar
                  key={basket}
                  label={basket}
                  current={current}
                  target={target}
                  color={basketLabels[basket]?.color || 'blue'}
                />
              );
            })}
          </div>
        </div>

        {/* Credits per Semester */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Credits per Semester</h2>
          {semesterCreditsData.length > 0 ? (
            <div className="h-48 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={semesterCreditsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 32]} />
                  <Tooltip />
                  <Bar dataKey="credits" fill="#3b82f6">
                    {semesterCreditsData.map((entry, index) => (
                      <Cell key={index} fill={entry.credits > 28 ? '#ef4444' : entry.credits > 22 ? '#f59e0b' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Add courses to see chart</p>
          )}
        </div>
      </div>

      {/* Recent Courses - Responsive Table */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Recent Courses</h2>
        {completedCourses.slice(0, 5).length > 0 ? (
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs md:text-sm font-medium text-gray-500">Code</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-500">Course</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-500">Credits</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-500">Grade</th>
                </tr>
              </thead>
              <tbody>
                {completedCourses.slice(0, 5).map(course => (
                  <tr key={course._id} className="border-b">
                    <td className="py-2 md:py-3 font-mono text-xs md:text-sm">{course.courseCode}</td>
                    <td className="py-2 md:py-3 text-sm md:text-base truncate max-w-[150px] md:max-w-none">{course.courseName}</td>
                    <td className="py-2 md:py-3 text-sm">{course.credits}</td>
                    <td className="py-2 md:py-3 text-sm font-semibold">{course.grade || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No courses added yet</p>
        )}
      </div>
    </div>
  );
}

```

## frontend/src/pages/HonoursMinorPage.jsx

```jsx
// frontend/src/pages/HonoursMinorPage.jsx
import { useState, useEffect } from 'react';
import { courseAPI, programAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { calculateTotalCredits } from '../utils/gpaCalculator';
import ProgressBar from '../components/ProgressBar';
import toast from 'react-hot-toast';

export default function HonoursMinorPage() {
  const { user, updateProfile } = useAuth();
  const [courses, setCourses] = useState([]);
  const [requirements, setRequirements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [coursesRes, requirementsRes] = await Promise.all([
        courseAPI.getAll(),
        programAPI.getRequirements(user?.program || 'BTech_CSE')
      ]);
      setCourses(coursesRes.data);
      setRequirements(requirementsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Honours courses (courses marked as isHonoursCourse)
  const honoursCourses = courses.filter(c => c.isHonoursCourse && !c.isPlanned);
  const honoursCredits = calculateTotalCredits(honoursCourses);
  const honoursRequired = requirements?.honoursAdditionalCredits || 20;
  const honoursProgress = Math.min((honoursCredits / honoursRequired) * 100, 100);
  const honoursComplete = honoursCredits >= honoursRequired;

  // Minor courses (courses marked as isMinorCourse)
  const minorCourses = courses.filter(c => c.isMinorCourse && !c.isPlanned);
  const minorCredits = calculateTotalCredits(minorCourses);
  const minorRequired = requirements?.minorAdditionalCredits || 20;
  const minorProgress = Math.min((minorCredits / minorRequired) * 100, 100);
  const minorComplete = minorCredits >= minorRequired;

  const toggleHonours = async () => {
    const success = await updateProfile({ pursuingHonours: !user?.pursuingHonours });
    if (success) {
      setEditing(false);
      fetchData();
    }
  };

  const toggleMinor = async () => {
    const success = await updateProfile({ pursuingMinor: !user?.pursuingMinor });
    if (success) {
      setEditing(false);
      fetchData();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iitgn-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Honours & Minor Tracking</h1>
        <p className="text-gray-500">Track additional credits for Honours and Minor degrees</p>
      </div>

      {/* Honours Section */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">🏆 Honours in {user?.program?.replace('BTech_', '')}</h2>
              <p className="text-blue-100 text-sm">Deepen your core competence with additional courses</p>
            </div>
            <button
              onClick={toggleHonours}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                user?.pursuingHonours 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
            >
              {user?.pursuingHonours ? 'Disable Honours Track' : 'Enable Honours Track'}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {user?.pursuingHonours ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Progress: {honoursCredits} / {honoursRequired} credits</span>
                  <span className={honoursComplete ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                    {Math.round(honoursProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`rounded-full h-3 transition-all duration-500 ${honoursComplete ? 'bg-green-600' : 'bg-blue-600'}`}
                    style={{ width: `${honoursProgress}%` }}
                  ></div>
                </div>
              </div>

              {honoursComplete && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg text-green-700 text-sm">
                  ✓ Congratulations! You have completed the Honours requirement.
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Requirements:</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Complete {honoursRequired} additional credits in your discipline</li>
                  <li>Include at least one project course beyond the Open Project Course</li>
                  <li>Two open electives from base programme may count towards Honours</li>
                </ul>
              </div>

              {honoursCourses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Courses Counted for Honours ({honoursCourses.length})</h3>
                  <div className="space-y-2">
                    {honoursCourses.map(course => (
                      <div key={course._id} className="bg-gray-50 rounded p-3 flex justify-between items-center">
                        <div>
                          <span className="font-mono text-sm text-gray-500">{course.courseCode}</span>
                          <span className="ml-2">{course.courseName}</span>
                        </div>
                        <span className="text-sm text-gray-500">{course.credits} credits</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {honoursCredits < honoursRequired && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-yellow-700 text-sm">
                  💡 Need {honoursRequired - honoursCredits} more Honours credits. Mark courses as "Honours" when adding them.
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>Enable Honours track to start tracking additional credits.</p>
              <p className="text-sm mt-1">Honours requires {honoursRequired} additional credits.</p>
            </div>
          )}
        </div>
      </div>

      {/* Minor Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">📘 Minor{user?.minorDiscipline ? ` in ${user.minorDiscipline}` : ''}</h2>
              <p className="text-purple-100 text-sm">Develop expertise in another discipline</p>
            </div>
            <button
              onClick={toggleMinor}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                user?.pursuingMinor 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white text-purple-600 hover:bg-gray-100'
              }`}
            >
              {user?.pursuingMinor ? 'Disable Minor Track' : 'Enable Minor Track'}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {user?.pursuingMinor ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Progress: {minorCredits} / {minorRequired} credits</span>
                  <span className={minorComplete ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                    {Math.round(minorProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`rounded-full h-3 transition-all duration-500 ${minorComplete ? 'bg-green-600' : 'bg-purple-600'}`}
                    style={{ width: `${minorProgress}%` }}
                  ></div>
                </div>
              </div>

              {minorComplete && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg text-green-700 text-sm">
                  ✓ Congratulations! You have completed the Minor requirement.
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Requirements:</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Complete {minorRequired} additional credits in {user?.minorDiscipline || 'another discipline'}</li>
                  <li>Two open electives from base programme may count towards Minor</li>
                  <li>Courses must be approved by the minor discipline</li>
                </ul>
              </div>

              {minorCourses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Courses Counted for Minor ({minorCourses.length})</h3>
                  <div className="space-y-2">
                    {minorCourses.map(course => (
                      <div key={course._id} className="bg-gray-50 rounded p-3 flex justify-between items-center">
                        <div>
                          <span className="font-mono text-sm text-gray-500">{course.courseCode}</span>
                          <span className="ml-2">{course.courseName}</span>
                        </div>
                        <span className="text-sm text-gray-500">{course.credits} credits</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {minorCredits < minorRequired && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-yellow-700 text-sm">
                  💡 Need {minorRequired - minorCredits} more Minor credits. Mark courses as "Minor" when adding them.
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>Enable Minor track to start tracking additional credits.</p>
              <p className="text-sm mt-1">Minor requires {minorRequired} additional credits in another discipline.</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-semibold mb-1">📌 Important Notes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Honours and Minor are add-ons to the base BTech degree</li>
          <li>You can claim Honours/Minor at graduation based on collected credits</li>
          <li>A maximum of two open electives can be counted towards Honours/Minor requirements</li>
          <li>Honours requires at least one project course beyond the Open Project Course</li>
          <li>For multiple minors or honours+minor, maximum two open electives can be counted</li>
        </ul>
      </div>
    </div>
  );
}

```

## frontend/src/pages/LandingPage.jsx

```jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { programList } from '../utils/programRequirements';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('BTech_CSE');
  const [admissionYear, setAdmissionYear] = useState(2026);
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  // Use useEffect for navigation instead of doing it during render
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success;
    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await signup(email, password, program, admissionYear);
    }
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4">
              <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                IIT Gandhinagar
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Track Your Academic Journey
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Plan courses, calculate CPI, and track your degree requirements
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl">📚</div>
                <div className="text-sm font-medium">Course History</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl">🎯</div>
                <div className="text-sm font-medium">Basket Tracking</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl">📊</div>
                <div className="text-sm font-medium">CPI Calculator</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                <div className="text-2xl">📅</div>
                <div className="text-sm font-medium">Semester Planner</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-center mb-6">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">IITGN Email</label>
                  <input
                    type="email"
                    placeholder="username@iitgn.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">Program</label>
                      <select
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {Object.entries(programList).map(([code, { name }]) => (
                          <option key={code} value={code}>{name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Admission Year</label>
                      <select
                        value={admissionYear}
                        onChange={(e) => setAdmissionYear(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {[2022, 2023, 2024, 2025, 2026, 2027].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </form>
              <p className="text-center mt-4 text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-blue-600 hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

## frontend/src/pages/ProgramSetupPage.jsx

```jsx
// frontend/src/pages/ProgramSetupPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { programAPI } from '../services/api';
import { programList, basketLabels } from '../utils/programRequirements';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ProgramSetupPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [program, setProgram] = useState(user?.program || 'BTech_CSE');
  const [pursuingHonours, setPursuingHonours] = useState(user?.pursuingHonours || false);
  const [pursuingMinor, setPursuingMinor] = useState(user?.pursuingMinor || false);
  const [minorDiscipline, setMinorDiscipline] = useState(user?.minorDiscipline || '');
  const [requirements, setRequirements] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequirements();
  }, [program]);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const res = await programAPI.getRequirements(program);
      setRequirements(res.data);
    } catch (error) {
      toast.error('Failed to load program requirements');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const success = await updateProfile({
      program,
      pursuingHonours,
      pursuingMinor,
      minorDiscipline: pursuingMinor ? minorDiscipline : ''
    });
    if (success) {
      navigate('/dashboard');
    }
  };

  const minorOptions = ['CSE', 'AI', 'EE', 'ME', 'CE', 'CL', 'MSE', 'Physics', 'Chemistry', 'Maths', 'HSS', 'Management'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iitgn-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-iitgn-blue px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Program Setup</h1>
          <p className="text-blue-100 text-sm">Configure your academic program and track graduation requirements</p>
        </div>

        <div className="p-6">
          {/* Program Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2">Select Your Program</label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
            >
              {Object.entries(programList).map(([code, { name }]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">This determines your basket requirements and graduation criteria</p>
          </div>

          {/* Requirements Summary */}
          {requirements && (
            <div className="mb-8 bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold text-gray-700 mb-3">Program Requirements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white rounded p-2 text-center">
                  <div className="font-bold text-iitgn-blue">{requirements.totalCreditsRequired}</div>
                  <div className="text-gray-500">Total Credits</div>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <div className="font-bold text-green-600">{requirements.disciplineCoreCredits}</div>
                  <div className="text-gray-500">Core Credits</div>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <div className="font-bold text-purple-600">{requirements.disciplineElectiveCredits}</div>
                  <div className="text-gray-500">Elective Credits</div>
                </div>
              </div>
            </div>
          )}

          {/* Honours Option */}
          <div className="mb-6 border rounded-lg p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={pursuingHonours}
                onChange={(e) => setPursuingHonours(e.target.checked)}
                className="mt-1 mr-3"
              />
              <div>
                <span className="font-semibold text-gray-800">Pursuing Honours (+20 credits)</span>
                <p className="text-sm text-gray-500">
                  Complete 20 additional credits in your discipline, including at least one project course beyond the Open Project Course.
                </p>
              </div>
            </label>
          </div>

          {/* Minor Option */}
          <div className="mb-8 border rounded-lg p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={pursuingMinor}
                onChange={(e) => setPursuingMinor(e.target.checked)}
                className="mt-1 mr-3"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-800">Pursuing Minor (+20 credits)</span>
                <p className="text-sm text-gray-500">
                  Complete 20 additional credits in another discipline or focus area.
                </p>
              </div>
            </label>
            
            {pursuingMinor && (
              <div className="mt-4 ml-6">
                <label className="block text-gray-700 text-sm mb-1">Minor Discipline</label>
                <select
                  value={minorDiscipline}
                  onChange={(e) => setMinorDiscipline(e.target.value)}
                  className="w-full md:w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-iitgn-blue"
                >
                  <option value="">Select minor discipline</option>
                  {minorOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Basket Requirements Preview */}
          {requirements && (
            <div className="mb-8">
              <h2 className="font-semibold text-gray-700 mb-3">Basket Requirements Preview</h2>
              <div className="space-y-2">
                {requirements.basketRequirements?.slice(0, 8).map(req => (
                  <div key={req.basketName} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{req.basketName}</span>
                    <span className="font-medium">{req.minCredits} credits required</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">More baskets will appear as you add courses</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={handleSave}
              className="bg-iitgn-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save & Continue to Dashboard
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">📌 Note:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>You can change these settings later from your profile</li>
          <li>Honours and Minor require additional credits beyond the base degree</li>
          <li>Maximum of two open electives can be counted towards Honours/Minor requirements</li>
          <li>Pass/Fail conversion allowed for max 2 courses during the entire programme</li>
        </ul>
      </div>
    </div>
  );
}

```

## frontend/src/pages/SemesterPlannerPage.jsx

```jsx
// frontend/src/pages/SemesterPlannerPage.jsx
import { useState, useEffect } from 'react';
import { courseAPI } from '../services/api';
import AddEditPlannedModal from '../components/AddEditPlannedModal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
// In SemesterPlannerPage.jsx, add import and update AddEditPlannedModal to use autocomplete
import CourseSearchInput from '../components/CourseSearchInput';

// Then in AddEditPlannedModal, replace the course code input with CourseSearchInput similarly

const MAX_CREDITS_PER_SEMESTER = 28;
const NORMAL_CREDITS_PER_SEMESTER = 22;
const OVERLOAD_CPI_THRESHOLD = 7.0;

export default function SemesterPlannerPage() {
  const { user } = useAuth();
  const [plannedCourses, setPlannedCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [cpi, setCpi] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await courseAPI.getAll();
      setPlannedCourses(res.data.filter(c => c.isPlanned));
      setCompletedCourses(res.data.filter(c => !c.isPlanned));
      
      // Calculate CPI from completed courses
      const gradedCourses = res.data.filter(c => !c.isPlanned && c.grade && !['P', 'NP', 'IP'].includes(c.grade));
      let totalPoints = 0, totalCredits = 0;
      const gradeToPoints = { 'A+': 10, 'A': 10, 'A-': 9, 'B+': 8, 'B': 7, 'B-': 6, 'C+': 5, 'C': 4, 'C-': 3, 'D+': 2, 'D': 1, 'F': 0 };
      gradedCourses.forEach(c => {
        const points = gradeToPoints[c.grade];
        if (points !== undefined) {
          totalPoints += points * c.credits;
          totalCredits += c.credits;
        }
      });
      setCpi(totalCredits > 0 ? totalPoints / totalCredits : 0);
    } catch (error) {
      toast.error('Failed to load planned courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      if (editingCourse) {
        await courseAPI.update(editingCourse._id, courseData);
        toast.success('Planned course updated');
      } else {
        await courseAPI.create(courseData);
        toast.success('Course added to plan');
      }
      fetchCourses();
      setEditingCourse(null);
    } catch (error) {
      toast.error('Failed to save planned course');
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Remove this course from your plan?')) {
      try {
        await courseAPI.delete(id);
        toast.success('Course removed from plan');
        fetchCourses();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const canOverload = cpi >= OVERLOAD_CPI_THRESHOLD;
  const effectiveMaxCredits = canOverload ? 32 : MAX_CREDITS_PER_SEMESTER;

  const groupedBySemester = plannedCourses.reduce((acc, course) => {
    const key = `${course.academicYear} - Semester ${course.semester}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {});

  const sortedSemesters = Object.keys(groupedBySemester).sort();

  const getSemesterCredits = (semester) => {
    return groupedBySemester[semester]?.reduce((sum, c) => sum + c.credits, 0) || 0;
  };

  const getTotalPlannedCredits = () => {
    return plannedCourses.reduce((sum, c) => sum + c.credits, 0);
  };

  const getTotalRemainingSemesters = () => {
    // Assuming 8 semesters total for BTech
    const currentYear = new Date().getFullYear();
    const admissionYear = user?.admissionYear || 2026;
    const currentSemester = 2; // Assuming we're in Sem II
    const totalSemesters = 8;
    const semestersCompleted = ((currentYear - admissionYear) * 2) + currentSemester;
    return Math.max(0, totalSemesters - semestersCompleted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iitgn-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Semester Planner</h1>
          <p className="text-gray-500">
            Plan future courses • Max {effectiveMaxCredits} credits/semester
            {canOverload && <span className="text-green-600 ml-2">(Overload eligible - CPI ≥ 7.0)</span>}
            {!canOverload && cpi > 0 && <span className="text-orange-600 ml-2">(Need CPI ≥ 7.0 for overload)</span>}
          </p>
        </div>
        <button 
          onClick={() => { setEditingCourse(null); setModalOpen(true); }} 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          + Add Planned Course
        </button>
      </div>

      {/* Planning Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm">Total Planned Credits</div>
          <div className="text-2xl font-bold text-purple-600">{getTotalPlannedCredits()}</div>
          <div className="text-gray-500 text-sm">{plannedCourses.length} courses planned</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm">Remaining Semesters (est.)</div>
          <div className="text-2xl font-bold text-blue-600">{getTotalRemainingSemesters()}</div>
          <div className="text-gray-500 text-sm">Assuming 8-semester track</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm">Current CPI</div>
          <div className="text-2xl font-bold text-green-600">{cpi.toFixed(2)}</div>
          <div className="text-gray-500 text-sm">
            {canOverload ? '✓ Eligible for overload' : 'Need CPI ≥ 7.0 for overload'}
          </div>
        </div>
      </div>

      {sortedSemesters.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No planned courses yet. Start planning your future semesters!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedSemesters.map(semester => {
            const credits = getSemesterCredits(semester);
            const isOverLimit = credits > effectiveMaxCredits;
            const isCloseToLimit = credits > NORMAL_CREDITS_PER_SEMESTER && credits <= effectiveMaxCredits;
            
            return (
              <div 
                key={semester} 
                className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${
                  isOverLimit ? 'border-red-500' : isCloseToLimit ? 'border-yellow-500' : 'border-purple-500'
                }`}
              >
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{semester}</h2>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isOverLimit ? 'bg-red-100 text-red-800' : 
                      isCloseToLimit ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {credits} / {effectiveMaxCredits} credits
                    </span>
                    {isCloseToLimit && !isOverLimit && (
                      <p className="text-xs text-yellow-600 mt-1">Close to limit</p>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  {groupedBySemester[semester].map(course => (
                    <div key={course._id} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">
                          <span className="font-mono text-sm text-gray-500">{course.courseCode}</span>
                          <span className="ml-2">{course.courseName}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.credits} credits • {course.basketType}
                          {course.isHonoursCourse && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1 rounded">Honours</span>}
                          {course.isMinorCourse && <span className="ml-2 text-xs bg-green-100 text-green-700 px-1 rounded">Minor</span>}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button 
                          onClick={() => { setEditingCourse(course); setModalOpen(true); }} 
                          className="text-iitgn-blue text-sm hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course._id)} 
                          className="text-red-600 text-sm hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {isOverLimit && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700">⚠️ This semester exceeds the maximum of {effectiveMaxCredits} credits.</p>
                      <p className="text-xs text-red-600 mt-1">Consider moving some courses to another semester or requesting overload approval from faculty advisor.</p>
                    </div>
                  )}
                  
                  {!isOverLimit && credits < NORMAL_CREDITS_PER_SEMESTER && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">💡 You have {NORMAL_CREDITS_PER_SEMESTER - credits} credits available for additional courses this semester.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recommendation Section */}
      {sortedSemesters.length > 0 && getTotalPlannedCredits() > 0 && (
        <div className="mt-8 bg-blue-50 rounded-lg p-5">
          <h3 className="font-semibold text-blue-800 mb-2">📋 Planning Recommendations</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Normal academic load: {NORMAL_CREDITS_PER_SEMESTER} credits per semester</li>
            <li>Maximum load without overload: {MAX_CREDITS_PER_SEMESTER} credits</li>
            <li>Overload (up to 32 credits) requires CPI ≥ 7.0 and faculty advisor approval</li>
            <li>Don't forget to register for Comprehensive Viva Voce (IN101-108) every active semester</li>
            <li>External exposure (IN498) can count up to 16 credits towards graduation</li>
          </ul>
        </div>
      )}

      <AddEditPlannedModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingCourse(null); }}
        onSubmit={handleAddCourse}
        course={editingCourse}
      />
    </div>
  );
}

```

## frontend/src/services/api.js

```js
// frontend/src/services/api.js
import axios from 'axios';

// ✅ Hardcode to backend URL for testing
const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const courseAPI = {
  getAll: () => api.get('/courses'),
  getBySemester: () => api.get('/courses/by-semester'),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`)
};

export const analyticsAPI = {
  getGPA: () => api.get('/analytics/gpa'),
  getBasketSummary: () => api.get('/analytics/basket-summary'),
  getProgressAnalysis: () => api.get('/analytics/progress-analysis')
};

export const programAPI = {
  getRequirements: (programCode) => api.get(`/programs/requirements/${programCode}`),
  getPrograms: () => api.get('/programs/list')
};

export default api;
```

## frontend/src/utils/basketMapper.js

```js
const canonicalMap = new Map([
  ['discipline core', 'Discipline Core'],
  ['dept core', 'Discipline Core'],
  ['dept-core', 'Discipline Core'],
  ['discipline elective', 'Discipline Elective'],
  ['discipline-elective', 'Discipline Elective'],
  ['dept elective', 'Discipline Elective'],
  ['institute core', 'Institute Core'],
  ['institute-core', 'Institute Core'],
  ['core', 'Institute Core'],
  ['hss', 'HSS'],
  ['science basket', 'Science Basket'],
  ['science', 'Science Basket'],
  ['mathematics basket', 'Mathematics Basket'],
  ['math basket', 'Mathematics Basket'],
  ['mathematics', 'Mathematics Basket'],
  ['materials basket', 'Materials Basket'],
  ['materials', 'Materials Basket'],
  ['general education', 'General Education'],
  ['gen ed', 'General Education'],
  ['general', 'General Education'],
  ['open elective', 'Open Elective'],
  ['open', 'Open Elective'],
  ['oe', 'Open Elective'],
  ['project', 'Project'],
  ['capstone', 'Project'],
  ['other', 'Other']
]);

export function normalizeBasketName(raw) {
  if (!raw) return 'Other';
  const key = String(raw).trim().toLowerCase();
  if (canonicalMap.has(key)) return canonicalMap.get(key);
  const cleaned = key.replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (canonicalMap.has(cleaned)) return canonicalMap.get(cleaned);
  return cleaned.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

export default normalizeBasketName;

```

## frontend/src/utils/departmentDetector.js

```js
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

```

## frontend/src/utils/exportExcel.js

```js
// frontend/src/utils/exportExcel.js
import * as XLSX from 'xlsx';

export const exportToExcel = (courses, fileName = 'course_record') => {
  const exportData = courses.map(course => ({
    'Course Code': course.courseCode,
    'Course Name': course.courseName,
    'Credits': course.credits,
    'Grade': course.grade || 'Not graded',
    'Semester': course.semester,
    'Academic Year': course.academicYear,
    'Category/Basket': course.basketType,
    'Status': course.isPlanned ? 'Planned' : 'Completed',
    'Department': course.department || 'Other'
  }));
  
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Courses');
  XLSX.writeFile(wb, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportGPAReport = (courses, cpi, semesterCPI) => {
  const data = [
    { Metric: 'Overall CPI', Value: cpi.toFixed(2) },
    { Metric: 'Total Credits Completed', Value: courses.filter(c => !c.isPlanned).reduce((s, c) => s + c.credits, 0) },
    { Metric: 'Total Courses', Value: courses.filter(c => !c.isPlanned).length }
  ];
  
  Object.keys(semesterCPI).forEach(sem => {
    data.push({ Metric: `CPI - ${sem}`, Value: semesterCPI[sem].toFixed(2) });
  });
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'CPI_Report');
  XLSX.writeFile(wb, `cpi_report_${new Date().toISOString().split('T')[0]}.xlsx`);
};

```

## frontend/src/utils/gpaCalculator.js

```js
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

```

## frontend/src/utils/programRequirements.js

```js
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

```

## frontend/tailwind.config.js

```js
// frontend/tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iitgn: {
          blue: '#1a56db',
          orange: '#f59e0b',
          green: '#10b981',
          red: '#ef4444',
          dark: '#1f2937'
        }
      }
    },
  },
  plugins: [],
}

```

## frontend/vite.config.js

```js
// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

```

## generate-markdown.js

```js
const fs = require('fs');
const path = require('path');

// Folders/files to ignore
const IGNORE = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.vscode',
  '.idea',
  '__pycache__',
  '*.log',
  'package-lock.json', // optional
  'yarn.lock',
  'repo_dump.md', // avoid self-inclusion
  '.env', // keep secrets out!
  '.env.local',
];

// File extensions to include
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.html', '.md', '.sh', '.py', '.java', '.go', '.rs'];

function shouldInclude(filePath) {
  const base = path.basename(filePath);
  // ignore hidden files except .env? but we ignore .env anyway
  if (base.startsWith('.') && base !== '.env') return false;
  for (const pattern of IGNORE) {
    if (filePath.includes(pattern)) return false;
  }
  return true;
}

function getFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (!shouldInclude(fullPath)) continue;
    if (entry.isDirectory()) {
      getFiles(fullPath, fileList);
    } else {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.includes(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

function generateTree(dir, prefix = '') {
  // simple tree without content
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let tree = '';
  entries.forEach((entry, index) => {
    const fullPath = path.join(dir, entry.name);
    if (!shouldInclude(fullPath)) return;
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    tree += prefix + connector + entry.name + '\n';
    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      tree += generateTree(fullPath, newPrefix);
    }
  });
  return tree;
}

function main() {
  const root = process.cwd();
  console.log('Generating repo dump...');

  // Generate tree
  let output = '# Repository Structure\n\n```\n';
  output += path.basename(root) + '\n';
  output += generateTree(root);
  output += '```\n\n';

  // Generate file contents
  const files = getFiles(root);
  output += '# File Contents\n\n';
  for (const file of files) {
    const relative = path.relative(root, file);
    try {
      const content = fs.readFileSync(file, 'utf8');
      output += `## ${relative}\n\n\`\`\`${path.extname(file).slice(1)}\n${content}\n\`\`\`\n\n`;
    } catch (err) {
      output += `## ${relative}\n\n*Error reading file*\n\n`;
    }
  }

  fs.writeFileSync('repo_dump.md', output, 'utf8');
  console.log('✅ repo_dump.md created successfully!');
}

main();
```

## package.json

```json
{
  "dependencies": {
    "axios": "^1.18.1",
    "bcryptjs": "^3.0.3",
    "jsonwebtoken": "^9.0.3",
    "lucide-react": "^1.26.0",
    "mongoose": "^9.8.0",
    "recharts": "^3.10.0",
    "xlsx": "^0.18.5"
  }
}

```

## server.js

```js
mongoose.connect(process.env.MONGODB_URI)


```

