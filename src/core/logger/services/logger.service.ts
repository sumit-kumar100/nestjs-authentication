import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common";
import { LogLevel, isLogLevel } from "../helpers/logger.helper";
import * as winston from "winston";

@Injectable()
export class LoggerService implements NestLoggerService {
  public logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger();

    this.logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.printf(({ level, message, correlationId }) => {
            return JSON.stringify({ correlationId, level, message }, null, 2);
          }),
        ),
        stderrLevels: [LogLevel.Error, LogLevel.Warn],
      }),
    );
  }

  /**
   * Writes a log message.
   * @param level the severity of the message
   * @param message the log message
   */
  public log(level: LogLevel, message: string): void;
  /**
   * Writes a log message with the {@link LogLevel.Info} log level.
   * @param message the log message
   */
  public log(message: string): void;
  public log(p0: LogLevel | string, p1?: string, meta?: any) {
    const logLevel = isLogLevel(p0) ? p0 : LogLevel.Info;
    const message = isLogLevel(p0) && p1 ? p1 : p0;
    this.logger.log(logLevel, message, meta);
  }

  /**
   * Adds default metadata to every log message.
   * @param correlationId the log message
   */
  public setDefaultMeta(correlationId: string) {
    this.logger.defaultMeta = { correlationId };
  }
  /**
   * Writes a log message with the {@link LogLevel.Error} log level.
   * @param message the log message
   */
  public error(message: string) {
    this.log(LogLevel.Error, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Warn} log level.
   * @param message the log message
   */
  public warn(message: string) {
    this.log(LogLevel.Warn, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Info} log level.
   * @param message the log message
   */
  public info(message: string) {
    this.log(LogLevel.Info, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.HTTP} log level.
   * @param message the log message
   */
  public http(message: string) {
    this.log(LogLevel.HTTP, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Verbose} log level.
   * @param message the log message
   */
  public verbose(message: string) {
    this.log(LogLevel.Verbose, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Debug} log level.
   * @param message the log message
   */
  public debug(message: string) {
    this.log(LogLevel.Debug, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Silly} log level.
   * @param message the log message
   */
  public silly(message: string) {
    this.log(LogLevel.Silly, message);
  }
}
