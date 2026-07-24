// backend/routes/analytics.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import programRequirementsData from '../data/programRequirements.js';
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
      const key = (course.basketType || 'Other').trim();
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
      const key = (c.basketType || 'Other').trim();
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
