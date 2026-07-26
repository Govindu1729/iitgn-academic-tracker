// frontend/src/components/CourseSearchInput.jsx
import { useState, useEffect, useRef } from 'react';

// Full course catalog - MOVED OUTSIDE COMPONENT (this is correct)
const COURSE_CATALOG = [
  // ==================== 2022-23 Batch Specific ====================
  // These courses were offered only for 2022-23 batch
  
  // Old curriculum courses (replaced in later batches)
  { courseCode: 'ES113', courseName: 'Data-Centric Computing', credits: 3, basketType: 'Institute Core', department: 'Institute', applicableBatches: ['2022-23', '2023-24'] },
  { courseCode: 'ES114', courseName: 'Probability, Statistics and Data Visualization', credits: 3, basketType: 'Institute Core', department: 'Institute', applicableBatches: ['2022-23'] },
  { courseCode: 'EE313', courseName: 'Communication Systems', credits: 3, basketType: 'Discipline Core', department: 'EE', applicableBatches: ['2022-23', '2023-24', '2024-25'] },
  
  // ==================== 2023-24 Batch Specific ====================
  { courseCode: 'ES119', courseName: 'Principles of Artificial Intelligence', credits: 4, basketType: 'Institute Core', department: 'Institute', applicableBatches: ['2023-24', '2024-25', '2025-26', '2026-27'] },
  { courseCode: 'EE341', courseName: 'Communication Systems', credits: 4, basketType: 'Discipline Core', department: 'EE', applicableBatches: ['2025-26', '2026-27', '2027-28'] },
  
  // ==================== First Year Institute Core (All Batches) ====================
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
  
  // Comprehensive Viva Voce (All Semesters)
  { courseCode: 'IN101', courseName: 'Comprehensive Viva Voce I', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN102', courseName: 'Comprehensive Viva Voce II', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN103', courseName: 'Comprehensive Viva Voce III', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN104', courseName: 'Comprehensive Viva Voce IV', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN105', courseName: 'Comprehensive Viva Voce V', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN106', courseName: 'Comprehensive Viva Voce VI', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN107', courseName: 'Comprehensive Viva Voce VII', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'IN108', courseName: 'Comprehensive Viva Voce VIII', credits: 0, basketType: 'Institute Core', department: 'Institute' },

  // ==================== Second Year Institute Core ====================
  { courseCode: 'ES116', courseName: 'Principles and Applications of Electrical Engineering', credits: 5, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES117', courseName: 'The World of Engineering', credits: 2, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES118', courseName: 'Materials for the Future', credits: 3, basketType: 'Materials Basket', department: 'MSE' },
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

  // ==================== HSS Courses (All) ====================
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

  // ==================== Science Basket ====================
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

  // ==================== CSE Discipline Courses ====================
  // Core
  { courseCode: 'CS201', courseName: 'Theory of Computing', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS202', courseName: 'Software Tools and Techniques for CSE', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS203', courseName: 'Software Tools and Techniques for AI', credits: 4, basketType: 'Discipline Core', department: 'AI' },
  { courseCode: 'CS303', courseName: 'Mathematical Foundations for AI', credits: 4, basketType: 'Discipline Core', department: 'AI' },
  { courseCode: 'CS328', courseName: 'Introduction to Data Science', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS329', courseName: 'Foundations of AI: Multiagent Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS330', courseName: 'Operating Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS331', courseName: 'Computer Networks', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'ES301', courseName: 'Data Structures and Algorithms II', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'ES336', courseName: 'Computer Organization and Architecture', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  
  // Electives
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
  { courseCode: 'ES335', courseName: 'Machine Learning', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES666', courseName: 'Computer Vision', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES667', courseName: 'Deep Learning', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES670', courseName: 'Matrix Methods for Signal Processing, Data Science and ML', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },

  // ==================== EE Discipline Courses ====================
  // Core
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
  
  // Electives
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

  // ==================== ME Discipline Courses ====================
  // Core
  { courseCode: 'ME206', courseName: 'Statics and Dynamics', credits: 4, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME207', courseName: 'Fluid Dynamics', credits: 5, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME208', courseName: 'Vibrations', credits: 2, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME209', courseName: 'Principles of Manufacturing Processes', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME333', courseName: 'Mechanics of Materials', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME334', courseName: 'Heat and Mass Transfer', credits: 4, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME335', courseName: 'Synthesis and Analysis of Mechanisms', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME337', courseName: 'Mechanical Systems Design', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME362', courseName: 'Introduction to Manufacturing Systems and Metrology', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  
  // Electives
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

  // ==================== ChemE Discipline Courses ====================
  // Core
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
  
  // Electives
  { courseCode: 'CL324', courseName: 'Introduction to Polymer Science and Engineering', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL353', courseName: 'Introduction to Process Safety', credits: 2, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL426', courseName: 'Biochemical Engineering', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL601', courseName: 'Advance Transport Phenomena', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL602', courseName: 'Advanced Thermodynamics', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL604', courseName: 'Advanced Reaction Engineering', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL627', courseName: 'Particulate Solids: Processing and Surface Engineering', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },
  { courseCode: 'CL629', courseName: 'Fundamentals of Aerosol Science', credits: 4, basketType: 'Discipline Elective', department: 'ChemE' },

  // ==================== Civil Discipline Courses ====================
  // Core
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
  
  // Electives
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

  // ==================== MSE Discipline Courses ====================
  // Core
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
  
  // Electives
  { courseCode: 'MSE352', courseName: 'Material Characterization Techniques', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE403', courseName: 'Science and Technology of Welding and Joining', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE602', courseName: 'Computational Materials Engineering', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE603', courseName: 'Thin Film Processing and Characterization', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE604', courseName: 'Deformation Behaviour of Materials', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE621', courseName: 'Process Plant Design', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE629', courseName: 'Structure and Defects of Materials', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE632', courseName: 'Characterization of Materials', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },
  { courseCode: 'MSE634', courseName: 'Semiconductor Materials and Fabrication Process', credits: 4, basketType: 'Discipline Elective', department: 'MSE' },

  // ==================== Project & External Exposure ====================
  { courseCode: 'OPC', courseName: 'Open Project Course', credits: 4, basketType: 'Project', department: 'Institute' },
  { courseCode: 'IN498', courseName: 'External Exposure', credits: 4, basketType: 'External Exposure', department: 'Institute' },
  { courseCode: 'XX299', courseName: 'Level 2 Project', credits: 4, basketType: 'Project', department: 'Institute' },
  { courseCode: 'XX399', courseName: 'Level 3 Project', credits: 4, basketType: 'Project', department: 'Institute' },
  { courseCode: 'XX499', courseName: 'Level 4 Project', credits: 4, basketType: 'Project', department: 'Institute' },
];

// Helper function to get applicable courses based on admission year
export const getApplicableCourses = (admissionYear) => {
  if (!admissionYear) return COURSE_CATALOG;
  const batchYear = `${admissionYear}-${String(admissionYear + 1).slice(-2)}`;
  return COURSE_CATALOG.filter(course => 
    !course.applicableBatches || course.applicableBatches.includes(batchYear)
  );
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