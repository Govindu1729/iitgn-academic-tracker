// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ 
      token, 
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ 
      token, 
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
