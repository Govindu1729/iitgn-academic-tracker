// backend/routes/analytics.js
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Course from '../models/Course.js';

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
    console.error(error);
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
    
    courses.forEach(course => {
      if (!basketCredits[course.basketType]) {
        basketCredits[course.basketType] = 0;
        basketCourses[course.basketType] = [];
      }
      basketCredits[course.basketType] += course.credits;
      basketCourses[course.basketType].push({
        courseCode: course.courseCode,
        courseName: course.courseName,
        credits: course.credits,
        grade: course.grade
      });
    });
    
    res.json({
      basketCredits,
      basketCourses,
      totalCompletedCredits: courses.reduce((sum, c) => sum + c.credits, 0)
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
