const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

// Create a logs directory if not exists
const logDir = path.join(__dirname, 'logs');

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'cron-%DATE%.log'), // log file name format
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,       // compress old logs
  maxSize: '20m',            // max log file size
  maxFiles: '14d',           // keep logs for 14 days
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    transport,
    new winston.transports.Console(), // also log to console
  ],
});

module.exports = logger;
