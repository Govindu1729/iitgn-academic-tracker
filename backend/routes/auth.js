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

// ==================== SIGNUP ====================
router.post('/signup', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { 
      email, 
      password, 
      primaryDiscipline = 'CSE',
      programType = 'BTech',
      secondaryDiscipline = '',
      admissionYear = 2026,
      pursuingHonours = false, 
      pursuingMinor = false, 
      minorDiscipline = '',
      currentSemester = 1
    } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ 
      email, 
      password,
      primaryDiscipline,
      programType,
      secondaryDiscipline,
      admissionYear,
      currentSemester,
      pursuingHonours,
      pursuingMinor,
      minorDiscipline
    });
    await user.save();

    // Generate program requirements
    try {
      const { generateProgramRequirements } = await import('../data/programRequirements.js');
      user.programRequirements = generateProgramRequirements(
        primaryDiscipline,
        programType,
        secondaryDiscipline || null
      );
      await user.save();
    } catch (err) {
      logger.warn('Could not generate program requirements: %o', err);
    }

    // Create tokens
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    user.refreshTokens.push(refreshToken);
    await user.save();
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

    res.status(201).json({ 
      accessToken, 
      user: { 
        id: user._id, 
        email: user.email,
        primaryDiscipline: user.primaryDiscipline,
        programType: user.programType,
        secondaryDiscipline: user.secondaryDiscipline || '',
        programName: user.programName,
        admissionYear: user.admissionYear,
        currentSemester: user.currentSemester,
        pursuingHonours: user.pursuingHonours,
        pursuingMinor: user.pursuingMinor,
        minorDiscipline: user.minorDiscipline || '',
        programRequirements: user.programRequirements
      } 
    });
  } catch (error) {
    logger.error('Signup error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== LOGIN ====================
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

    // Generate program requirements if not present
    if (!user.programRequirements) {
      try {
        const { generateProgramRequirements } = await import('../data/programRequirements.js');
        user.programRequirements = generateProgramRequirements(
          user.primaryDiscipline || 'CSE',
          user.programType || 'BTech',
          user.secondaryDiscipline || null
        );
        await user.save();
      } catch (err) {
        logger.warn('Could not generate program requirements: %o', err);
      }
    }

    // Generate tokens
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    user.refreshTokens.push(refreshToken);
    await user.save();
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

    res.json({ 
      accessToken, 
      user: { 
        id: user._id, 
        email: user.email,
        primaryDiscipline: user.primaryDiscipline || 'CSE',
        programType: user.programType || 'BTech',
        secondaryDiscipline: user.secondaryDiscipline || '',
        programName: user.programName,
        admissionYear: user.admissionYear,
        currentSemester: user.currentSemester || 1,
        pursuingHonours: user.pursuingHonours || false,
        pursuingMinor: user.pursuingMinor || false,
        minorDiscipline: user.minorDiscipline || '',
        programRequirements: user.programRequirements
      } 
    });
  } catch (error) {
    logger.error('Login error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== REFRESH TOKEN ====================
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

    if (!user.refreshTokens.includes(token)) {
      return res.status(401).json({ message: 'Refresh token revoked' });
    }

    const newAccessToken = createAccessToken(user._id);
    const newRefreshToken = createRefreshToken(user._id);

    user.refreshTokens = user.refreshTokens.filter(t => t !== token);
    user.refreshTokens.push(newRefreshToken);
    await user.save();

    res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, refreshCookieOptions);
    res.json({ 
      accessToken: newAccessToken, 
      user: {
        id: user._id,
        email: user.email,
        primaryDiscipline: user.primaryDiscipline || 'CSE',
        programType: user.programType || 'BTech',
        secondaryDiscipline: user.secondaryDiscipline || '',
        programName: user.programName,
        admissionYear: user.admissionYear,
        currentSemester: user.currentSemester || 1,
        pursuingHonours: user.pursuingHonours || false,
        pursuingMinor: user.pursuingMinor || false,
        minorDiscipline: user.minorDiscipline || '',
        programRequirements: user.programRequirements
      }
    });
  } catch (error) {
    logger.error('Refresh error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== LOGOUT ====================
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

// ==================== UPDATE PROFILE ====================
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { 
      primaryDiscipline,
      programType,
      secondaryDiscipline,
      pursuingHonours, 
      pursuingMinor, 
      minorDiscipline,
      currentSemester,
      profilePicture
    } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    if (primaryDiscipline !== undefined) user.primaryDiscipline = primaryDiscipline;
    if (programType !== undefined) user.programType = programType;
    if (secondaryDiscipline !== undefined) user.secondaryDiscipline = secondaryDiscipline;
    if (pursuingHonours !== undefined) user.pursuingHonours = pursuingHonours;
    if (pursuingMinor !== undefined) user.pursuingMinor = pursuingMinor;
    if (minorDiscipline !== undefined) user.minorDiscipline = minorDiscipline;
    if (currentSemester !== undefined) user.currentSemester = currentSemester;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;
    
    // Regenerate program requirements if program changed
    if (primaryDiscipline !== undefined || programType !== undefined || secondaryDiscipline !== undefined) {
      try {
        const { generateProgramRequirements } = await import('../data/programRequirements.js');
        user.programRequirements = generateProgramRequirements(
          user.primaryDiscipline || 'CSE',
          user.programType || 'BTech',
          user.secondaryDiscipline || null
        );
      } catch (err) {
        logger.warn('Could not regenerate program requirements: %o', err);
      }
    }
    
    await user.save();
    
    res.json({ 
      user: { 
        id: user._id, 
        email: user.email,
        primaryDiscipline: user.primaryDiscipline,
        programType: user.programType,
        secondaryDiscipline: user.secondaryDiscipline || '',
        programName: user.programName,
        admissionYear: user.admissionYear,
        currentSemester: user.currentSemester,
        pursuingHonours: user.pursuingHonours,
        pursuingMinor: user.pursuingMinor,
        minorDiscipline: user.minorDiscipline || '',
        profilePicture: user.profilePicture || '',
        programRequirements: user.programRequirements
      } 
    });
  } catch (error) {
    logger.error('Profile update error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== GET USER PROFILE ====================
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      user: {
        id: user._id,
        email: user.email,
        primaryDiscipline: user.primaryDiscipline || 'CSE',
        programType: user.programType || 'BTech',
        secondaryDiscipline: user.secondaryDiscipline || '',
        programName: user.programName,
        admissionYear: user.admissionYear,
        currentSemester: user.currentSemester || 1,
        pursuingHonours: user.pursuingHonours || false,
        pursuingMinor: user.pursuingMinor || false,
        minorDiscipline: user.minorDiscipline || '',
        profilePicture: user.profilePicture || '',
        programRequirements: user.programRequirements
      }
    });
  } catch (error) {
    logger.error('Profile fetch error: %o', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;