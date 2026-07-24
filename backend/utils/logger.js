import winston from 'winston';

const { combine, timestamp, errors, json, splat } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    json()
  ),
  transports: [new winston.transports.Console()]
});

export default logger;
