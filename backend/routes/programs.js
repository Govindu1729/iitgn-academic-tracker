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
  DISCIPLINE_BASE
} from '../data/programRequirements.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Get all available disciplines
router.get('/disciplines', async (req, res) => {
  try {
    const disciplines = getDisciplines();
    res.json(disciplines);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all program types
router.get('/program-types', async (req, res) => {
  try {
    const types = getProgramTypes();
    res.json(types);
  } catch (error) {
    logger.error(error);
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
    
    // Get all disciplines for selection
    const disciplines = getDisciplines();
    
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
      disciplines
    });
  } catch (error) {
    logger.error('Applicable programs error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate requirements for a specific program combination
router.post('/generate-requirements', authenticate, async (req, res) => {
  try {
    const { primaryDiscipline, programType, secondaryDiscipline } = req.body;
    
    if (!primaryDiscipline || !programType) {
      return res.status(400).json({ message: 'Primary discipline and program type are required' });
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
        fellowshipEligibility: 'CPI >= 8.0 or valid GATE score'
      };
    }
    
    res.json(requirements);
  } catch (error) {
    logger.error('Generate requirements error: %o', error);
    res.status(400).json({ message: error.message });
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
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Calculate dual major breakdown for preview
router.post('/dual-major-preview', authenticate, async (req, res) => {
  try {
    const { primaryDiscipline, secondaryDiscipline } = req.body;
    
    if (!primaryDiscipline || !secondaryDiscipline) {
      return res.status(400).json({ message: 'Both disciplines required' });
    }
    
    const dualInfo = calculateDualMajorCredits(primaryDiscipline, secondaryDiscipline);
    const primary = DISCIPLINE_BASE[primaryDiscipline];
    const secondary = DISCIPLINE_BASE[secondaryDiscipline];
    
    if (!primary || !secondary) {
      return res.status(404).json({ message: 'Discipline not found' });
    }
    
    res.json({
      primaryDiscipline: primary.name,
      secondaryDiscipline: secondary.name,
      primaryTotalCredits: primary.totalCredits,
      secondaryCoreCredits: dualInfo.secondaryCoreCredits,
      commonCoreCredits: dualInfo.commonCredits,
      commonCourses: dualInfo.commonCourses,
      additionalCreditsNeeded: dualInfo.additionalCredits,
      totalCreditsRequired: primary.totalCredits + dualInfo.additionalCredits,
      secondaryCoreCourses: dualInfo.secondaryCoreCourses,
      breakdown: {
        'Primary Discipline Total': primary.totalCredits,
        'Secondary Core Courses': dualInfo.secondaryCoreCredits,
        'Less: Common Courses': -dualInfo.commonCredits,
        'Additional Credits Required': dualInfo.additionalCredits,
        'Final Total': primary.totalCredits + dualInfo.additionalCredits
      }
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;