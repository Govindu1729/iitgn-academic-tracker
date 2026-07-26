// backend/server.js
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

// ✅ CORS Configuration
const allowedOrigins = [
  'https://iitgn-academic-tracker.vercel.app',
  'https://iitgn-academic-tracker-c4vs.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
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

// Parse cookies for refresh-token support
app.use(cookieParser());

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// Middleware
app.use(express.json());

// ==================== ROUTES ====================
// Stricter limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});

// ✅ Verify each route is imported correctly
console.log('✅ authRoutes:', typeof authRoutes, authRoutes ? 'loaded' : 'missing');
console.log('✅ courseRoutes:', typeof courseRoutes, courseRoutes ? 'loaded' : 'missing');
console.log('✅ programRoutes:', typeof programRoutes, programRoutes ? 'loaded' : 'missing');
console.log('✅ analyticsRoutes:', typeof analyticsRoutes, analyticsRoutes ? 'loaded' : 'missing');

// Register routes - each should be a router object
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/analytics', analyticsRoutes);

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ==================== MongoDB Connection ====================
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     logger.info('Connected to MongoDB');
//     app.listen(PORT, () => logger.info('Server running on port %s', PORT));
//   })
//   .catch(err => {
//     logger.error('MongoDB connection error: %o', err);
//     process.exit(1);
//   });

// backend/server.js - Update the mongoose connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => logger.info('Server running on port %s', PORT));
  })
  .catch(err => {
    logger.error('MongoDB connection error: %o', err);
    process.exit(1);
  });

  