// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

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
    console.error(error);
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
    console.error('Login error:', error);
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
    console.error('Refresh error:', error);
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
    console.error('Logout error:', error);
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
