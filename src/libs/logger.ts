import {Logger, transports, LoggerInstance} from "winston";
import * as expressWinston from "express-winston";

export const logger: LoggerInstance = new Logger({
  transports: [
    new transports.Console({
      handleExceptions: true,
      timestamp: true,
      prettyPrint: true,
      colorize: true
    })
  ]
});

export const requestLogger = expressWinston.logger({
  transports: [
    new transports.Console({
      json: false,
      timestamp: true,
      colorize: true
    })
  ],
  meta: false,
  msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
  colorize: true
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new transports.Console({
      json: true,
      timestamp: true,
      colorize: true
    })
  ]
});
