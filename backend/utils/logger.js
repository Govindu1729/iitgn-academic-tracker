// backend/utils/logger.js
import winston from 'winston';

const { combine, timestamp, errors, json, splat, printf, colorize } = winston.format;

// Custom format for development
const devFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
  format: combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    process.env.NODE_ENV === 'development' 
      ? combine(colorize(), devFormat)
      : json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;