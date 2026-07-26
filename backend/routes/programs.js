// backend/routes/programs.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { 
  generateProgramRequirements, 
  getDisciplines, 
  getProgramTypes,
  getApplicableProgramTypes,
  calculateDualMajorCredits,
  findCommonCoreCourses,
  DISCIPLINE_BASE,
  COURSE_CREDITS
} from '../data/programRequirements.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

const router = express.Router();

// ==================== GET ENDPOINTS ====================

// Get all available disciplines (including non-BTech disciplines)
router.get('/disciplines', async (req, res) => {
  try {
    const disciplines = getDisciplines();
    // Filter to only show disciplines that can be selected as BTech majors
    const btechDisciplines = disciplines.filter(d => 
      ['CSE', 'AI', 'EE', 'ME', 'CL', 'CE', 'MSE', 'ICDT'].includes(d.code)
    );
    res.json(btechDisciplines);
  } catch (error) {
    logger.error('Disciplines error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all disciplines (including non-BTech for course mapping)
router.get('/all-disciplines', async (req, res) => {
  try {
    const disciplines = getDisciplines();
    res.json(disciplines);
  } catch (error) {
    logger.error('All disciplines error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all program types
router.get('/program-types', async (req, res) => {
  try {
    const types = getProgramTypes();
    res.json(types);
  } catch (error) {
    logger.error('Program types error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course credits map
router.get('/course-credits', async (req, res) => {
  try {
    res.json(COURSE_CREDITS);
  } catch (error) {
    logger.error('Course credits error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by code
router.get('/course/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const courseCode = code.toUpperCase();
    
    // Import course catalog dynamically
    const { getCourseByCode } = await import('../data/courseCatalog.js');
    const course = getCourseByCode(courseCode);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    logger.error('Course lookup error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applicable program types for a user
router.get('/applicable-programs', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Calculate CPI from completed courses
    const Course = (await import('../models/Course.js')).default;
    const courses = await Course.find({ userId: req.userId, isPlanned: false });
    
    let totalPoints = 0;
    let totalCredits = 0;
    const gradeMap = { 
      'A+': 10, 'A': 10, 'A-': 9, 'B': 8, 
      'B-': 7, 'C': 6, 'C-': 5, 'D': 4, 'F': 0 
    };
    
    courses.forEach(c => {
      if (c.grade && gradeMap[c.grade] !== undefined) {
        totalPoints += gradeMap[c.grade] * c.credits;
        totalCredits += c.credits;
      }
    });
    const cpi = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    // Check for fail grades
    const hasFailGrades = courses.some(c => c.grade === 'F' || c.grade === 'E');
    
    // Get current semester
    const currentSemester = user.currentSemester || 1;
    
    // Get applicable program types
    const applicableTypes = getApplicableProgramTypes(
      user.primaryDiscipline || 'CSE',
      cpi,
      currentSemester,
      hasFailGrades
    );
    
    // Get BTech disciplines for selection
    const allDisciplines = getDisciplines();
    const btechDisciplines = allDisciplines.filter(d => 
      ['CSE', 'AI', 'EE', 'ME', 'CL', 'CE', 'MSE', 'ICDT'].includes(d.code)
    );
    
    // Get available secondary disciplines (all BTech disciplines except primary)
    const availableSecondary = btechDisciplines.filter(d => d.code !== user.primaryDiscipline);
    
    res.json({
      currentProgram: {
        type: user.programType || 'BTech',
        primaryDiscipline: user.primaryDiscipline || 'CSE',
        secondaryDiscipline: user.secondaryDiscipline || null
      },
      cpi: parseFloat(cpi.toFixed(2)),
      hasFailGrades,
      currentSemester,
      applicableTypes,
      disciplines: btechDisciplines,
      availableSecondaryDisciplines: availableSecondary
    });
  } catch (error) {
    logger.error('Applicable programs error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's current program requirements
router.get('/my-requirements', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // If requirements not cached, generate them
    if (!user.programRequirements) {
      const requirements = generateProgramRequirements(
        user.primaryDiscipline || 'CSE',
        user.programType || 'BTech',
        user.secondaryDiscipline || null
      );
      user.programRequirements = requirements;
      await user.save();
    }
    
    res.json(user.programRequirements);
  } catch (error) {
    logger.error('My requirements error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== POST ENDPOINTS ====================

// Generate requirements for a specific program combination
router.post('/generate-requirements', authenticate, async (req, res) => {
  try {
    const { primaryDiscipline, programType, secondaryDiscipline } = req.body;
    
    if (!primaryDiscipline || !programType) {
      return res.status(400).json({ message: 'Primary discipline and program type are required' });
    }
    
    // Validate primary discipline
    const validDisciplines = ['CSE', 'AI', 'EE', 'ME', 'CL', 'CE', 'MSE', 'ICDT'];
    if (!validDisciplines.includes(primaryDiscipline)) {
      return res.status(400).json({ message: 'Invalid primary discipline' });
    }
    
    // Validate secondary discipline for dual programs
    if ((programType === 'DualMajor' || programType === 'DualDegree' || programType === 'MScDual') && 
        secondaryDiscipline && 
        !validDisciplines.includes(secondaryDiscipline)) {
      return res.status(400).json({ message: 'Invalid secondary discipline' });
    }
    
    const requirements = generateProgramRequirements(
      primaryDiscipline,
      programType,
      secondaryDiscipline || null
    );
    
    // If Dual Major, also return detailed breakdown
    if (programType === 'DualMajor' && secondaryDiscipline) {
      const dualInfo = calculateDualMajorCredits(primaryDiscipline, secondaryDiscipline);
      requirements.dualMajorBreakdown = {
        ...dualInfo,
        primaryDisciplineName: DISCIPLINE_BASE[primaryDiscipline]?.name || primaryDiscipline,
        secondaryDisciplineName: DISCIPLINE_BASE[secondaryDiscipline]?.name || secondaryDiscipline,
        totalAdditionalCredits: dualInfo.additionalCredits,
        coreCoursesToComplete: dualInfo.secondaryCoreCourses || [],
        commonCoreCourses: dualInfo.commonCourses || []
      };
    }
    
    // If Dual Degree, add MTech details
    if (programType === 'DualDegree' || programType === 'MScDual') {
      requirements.mtechDetails = {
        additionalCredits: 72,
        courseCredits: 24,
        thesisCredits: 32,
        totalDuration: '7 years (14 semesters)',
        fellowshipEligibility: 'CPI >= 8.0 or valid GATE score',
        notes: [
          'Minimum 24 credits through MTech courses',
          'Minimum 32 credits through MTech thesis',
          'Open elective requirement reduced by 4 credits',
          'Maximum 2 U grades in thesis allowed'
        ]
      };
      
      if (secondaryDiscipline) {
        requirements.mtechDetails.secondaryDiscipline = DISCIPLINE_BASE[secondaryDiscipline]?.name || secondaryDiscipline;
      }
    }
    
    res.json(requirements);
  } catch (error) {
    logger.error('Generate requirements error: %o', error);
    res.status(400).json({ message: error.message });
  }
});

// Calculate dual major breakdown for preview
router.post('/dual-major-preview', authenticate, async (req, res) => {
  try {
    const { primaryDiscipline, secondaryDiscipline } = req.body;
    
    if (!primaryDiscipline || !secondaryDiscipline) {
      return res.status(400).json({ message: 'Both disciplines are required' });
    }
    
    // Validate disciplines
    const validDisciplines = ['CSE', 'AI', 'EE', 'ME', 'CL', 'CE', 'MSE', 'ICDT'];
    if (!validDisciplines.includes(primaryDiscipline) || !validDisciplines.includes(secondaryDiscipline)) {
      return res.status(400).json({ message: 'Invalid discipline selected' });
    }
    
    if (primaryDiscipline === secondaryDiscipline) {
      return res.status(400).json({ message: 'Primary and secondary disciplines must be different' });
    }
    
    const dualInfo = calculateDualMajorCredits(primaryDiscipline, secondaryDiscipline);
    const primary = DISCIPLINE_BASE[primaryDiscipline];
    const secondary = DISCIPLINE_BASE[secondaryDiscipline];
    
    if (!primary || !secondary) {
      return res.status(404).json({ message: 'Discipline not found' });
    }
    
    const totalCreditsRequired = primary.totalCredits + dualInfo.additionalCredits;
    
    res.json({
      primaryDiscipline: primary.name,
      secondaryDiscipline: secondary.name,
      primaryTotalCredits: primary.totalCredits,
      secondaryCoreCredits: dualInfo.secondaryCoreCredits,
      commonCoreCredits: dualInfo.commonCredits,
      commonCourses: dualInfo.commonCourses,
      additionalCreditsNeeded: dualInfo.additionalCredits,
      totalCreditsRequired: totalCreditsRequired,
      secondaryCoreCourses: dualInfo.secondaryCoreCourses,
      breakdown: {
        'Primary Discipline Total': primary.totalCredits,
        'Secondary Core Courses': dualInfo.secondaryCoreCredits,
        'Less: Common Courses': -dualInfo.commonCredits,
        'Additional Credits Required': dualInfo.additionalCredits,
        'Final Total Credits': totalCreditsRequired
      },
      summary: `${secondary.name} has ${dualInfo.secondaryCoreCredits} credits of core courses. ` +
               `${dualInfo.commonCredits} credits are common with ${primary.name}. ` +
               `You need ${dualInfo.additionalCredits} additional credits for Dual Major. ` +
               `Total credits required: ${totalCreditsRequired}`
    });
  } catch (error) {
    logger.error('Dual major preview error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get common courses between two disciplines
router.post('/common-courses', authenticate, async (req, res) => {
  try {
    const { primaryDiscipline, secondaryDiscipline } = req.body;
    
    if (!primaryDiscipline || !secondaryDiscipline) {
      return res.status(400).json({ message: 'Both disciplines are required' });
    }
    
    if (primaryDiscipline === secondaryDiscipline) {
      return res.status(400).json({ message: 'Disciplines must be different' });
    }
    
    const commonCourses = findCommonCoreCourses(primaryDiscipline, secondaryDiscipline);
    
    const primary = DISCIPLINE_BASE[primaryDiscipline];
    const secondary = DISCIPLINE_BASE[secondaryDiscipline];
    
    if (!primary || !secondary) {
      return res.status(404).json({ message: 'Discipline not found' });
    }
    
    // Get course details with credits and names
    const courseDetails = commonCourses.map(code => ({
      courseCode: code,
      credits: COURSE_CREDITS[code] || 0
    }));
    
    const totalCommonCredits = courseDetails.reduce((sum, c) => sum + c.credits, 0);
    
    res.json({
      primaryDiscipline: primary.name,
      secondaryDiscipline: secondary.name,
      commonCourses: courseDetails,
      totalCommonCredits: totalCommonCredits,
      primaryCoreCourses: primary.disciplineCoreCourses,
      secondaryCoreCourses: secondary.disciplineCoreCourses,
      primaryCoreCredits: primary.disciplineCoreCredits,
      secondaryCoreCredits: secondary.disciplineCoreCredits,
      summary: `${primary.name} and ${secondary.name} have ${commonCourses.length} common core courses ` +
               `totaling ${totalCommonCredits} credits.`
    });
  } catch (error) {
    logger.error('Common courses error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get discipline details by code
router.get('/discipline/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const discipline = DISCIPLINE_BASE[code];
    
    if (!discipline) {
      return res.status(404).json({ message: 'Discipline not found' });
    }
    
    res.json({
      code: code,
      name: discipline.name,
      totalCredits: discipline.totalCredits,
      disciplineCoreCredits: discipline.disciplineCoreCredits,
      disciplineCoreCourses: discipline.disciplineCoreCourses,
      disciplineElectiveCredits: discipline.disciplineElectiveCredits,
      basketRequirements: discipline.basketRequirements
    });
  } catch (error) {
    logger.error('Discipline details error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Validate program combination
router.post('/validate-program', authenticate, async (req, res) => {
  try {
    const { primaryDiscipline, programType, secondaryDiscipline } = req.body;
    
    const validDisciplines = ['CSE', 'AI', 'EE', 'ME', 'CL', 'CE', 'MSE', 'ICDT'];
    const validProgramTypes = ['BTech', 'DualMajor', 'DualDegree', 'MScDual'];
    
    const errors = [];
    
    // Validate primary discipline
    if (!primaryDiscipline || !validDisciplines.includes(primaryDiscipline)) {
      errors.push('Invalid or missing primary discipline');
    }
    
    // Validate program type
    if (!programType || !validProgramTypes.includes(programType)) {
      errors.push('Invalid or missing program type');
    }
    
    // Validate secondary discipline for dual programs
    if (programType !== 'BTech') {
      if (!secondaryDiscipline) {
        errors.push('Secondary discipline is required for dual programs');
      } else if (!validDisciplines.includes(secondaryDiscipline)) {
        errors.push('Invalid secondary discipline');
      } else if (secondaryDiscipline === primaryDiscipline) {
        errors.push('Secondary discipline must be different from primary discipline');
      }
    }
    
    // Check if discipline supports the chosen program type
    if (programType === 'DualMajor' || programType === 'DualDegree' || programType === 'MScDual') {
      const discipline = DISCIPLINE_BASE[primaryDiscipline];
      if (discipline) {
        // Check if discipline allows dual programs
        if (programType === 'DualMajor' && !discipline.availableForDualMajor) {
          errors.push(`${discipline.name} does not offer Dual Major program`);
        }
        if ((programType === 'DualDegree' || programType === 'MScDual') && !discipline.availableForDualDegree) {
          errors.push(`${discipline.name} does not offer Dual Degree program`);
        }
      }
    }
    
    // Get user's current CPI for eligibility check
    const user = await User.findById(req.userId);
    if (user) {
      const Course = (await import('../models/Course.js')).default;
      const courses = await Course.find({ userId: req.userId, isPlanned: false });
      
      let totalPoints = 0, totalCredits = 0;
      const gradeMap = { 'A+': 10, 'A': 10, 'A-': 9, 'B': 8, 'B-': 7, 'C': 6, 'C-': 5, 'D': 4, 'F': 0 };
      courses.forEach(c => {
        if (c.grade && gradeMap[c.grade] !== undefined) {
          totalPoints += gradeMap[c.grade] * c.credits;
          totalCredits += c.credits;
        }
      });
      const cpi = totalCredits > 0 ? totalPoints / totalCredits : 0;
      const hasFailGrades = courses.some(c => c.grade === 'F' || c.grade === 'E');
      const currentSemester = user.currentSemester || 1;
      
      // Check eligibility
      const applicableTypes = getApplicableProgramTypes(primaryDiscipline, cpi, currentSemester, hasFailGrades);
      const applicable = applicableTypes.find(t => t.code === programType);
      
      if (applicable && !applicable.isEligible) {
        errors.push(`Not eligible for ${applicable.label}: ${applicable.reason}`);
      }
    }
    
    res.json({
      isValid: errors.length === 0,
      errors: errors,
      program: {
        primaryDiscipline,
        programType,
        secondaryDiscipline: secondaryDiscipline || null
      }
    });
  } catch (error) {
    logger.error('Validate program error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;