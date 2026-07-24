// backend/routes/courses.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import Course from '../models/Course.js';

const router = express.Router();

// Get all courses for user
router.get('/', authenticate, async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.userId }).sort({ academicYear: -1, semesterOrder: 1, createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
      basketType,
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
    console.error('Add course error:', error);
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
    if (basketType !== undefined) course.basketType = basketType;
    if (department !== undefined) course.department = department;
    if (isPlanned !== undefined) course.isPlanned = isPlanned;
    if (isPassFail !== undefined) course.isPassFail = isPassFail;
    if (isHonoursCourse !== undefined) course.isHonoursCourse = isHonoursCourse;
    if (isMinorCourse !== undefined) course.isMinorCourse = isMinorCourse;
    if (semesterOrder !== undefined) course.semesterOrder = semesterOrder;
    
    await course.save();
    res.json(course);
  } catch (error) {
    console.error('Update course error:', error);
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
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
