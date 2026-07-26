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
const PORT = process.env.PORT || 5001;

// Fail fast if critical env vars are missing
if (!process.env.JWT_SECRET) {
  logger.error('FATAL: JWT_SECRET is not set. Set it in your environment and restart.');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  logger.error('FATAL: MONGODB_URI is not set. Set it in your environment and restart.');
  process.exit(1);
}

// ==================== CORS CONFIGURATION ====================
const allowedOrigins = [
  'https://iitgn-academic-tracker.vercel.app',
  'https://iitgn-academic-tracker-c4vs.vercel.app',
  'https://iitgn-academic-tracker.vercel.app/',
  'https://iitgn-academic-tracker-c4vs.vercel.app/',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://vercel.app',
  '*.vercel.app'
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      // Check for wildcard pattern
      if (allowed.includes('*')) {
        const pattern = allowed.replace(/\*/g, '.*');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(origin);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      logger.warn('CORS blocked origin: %s', origin);
      // For development, you can still allow it but log it
      // In production, you'd want to reject it
      if (process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Credentials'
  ],
  exposedHeaders: ['Content-Disposition', 'Content-Length'],
  maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// ==================== MIDDLEWARE ====================
// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));

// Parse cookies for refresh-token support
app.use(cookieParser());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================== RATE LIMITING ====================
// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded for IP: %s', req.ip);
    res.status(429).json({ 
      message: 'Too many requests, please try again later.' 
    });
  }
});
app.use(globalLimiter);

// Stricter limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Auth rate limit exceeded for IP: %s', req.ip);
    res.status(429).json({ 
      message: 'Too many authentication attempts, please try again later.' 
    });
  }
});

// ==================== REQUEST LOGGING ====================
// Log all requests in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    logger.debug('%s %s from %s', req.method, req.path, req.ip);
    next();
  });
}

// ==================== ROUTES ====================
// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/analytics', analyticsRoutes);

// ==================== ERROR HANDLING ====================
// 404 handler
app.use((req, res) => {
  logger.warn('404 Not Found: %s %s', req.method, req.path);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error: %o', err);
  
  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      message: 'CORS error: Origin not allowed',
      origin: req.headers.origin
    });
  }
  
  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Validation error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  // Handle duplicate key errors
  if (err.code === 11000) {
    return res.status(409).json({ 
      message: 'Duplicate key error',
      field: Object.keys(err.keyPattern)[0]
    });
  }
  
  // Default error
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== DATABASE CONNECTION ====================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => {
      logger.info('Server running on port %s', PORT);
      logger.info('Environment: %s', process.env.NODE_ENV || 'development');
      logger.info('CORS allowed origins: %s', allowedOrigins.join(', '));
    });
  })
  .catch(err => {
    logger.error('MongoDB connection error: %o', err);
    process.exit(1);
  });

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, closing server...');
  mongoose.connection.close(() => {
    logger.info('MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, closing server...');
  mongoose.connection.close(() => {
    logger.info('MongoDB connection closed');
    process.exit(0);
  });
});

export default app;