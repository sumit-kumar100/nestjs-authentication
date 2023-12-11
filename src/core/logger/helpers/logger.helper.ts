import type { Params } from "nestjs-pino";
import type { ReqId } from "pino-http";
import type { Request } from "express";
import { nanoid } from "nanoid";
import { multistream } from "pino";

export enum LogLevel {
  /** Critical error, system stability is affected. */
  Error = "error",

  /** Non-critical error, system stability is not affected, but issue should be investigated. */
  Warn = "warn",

  /** Informative message. */
  Info = "info",

  /** HTTP access logging. */
  HTTP = "http",

  /** More verbose informative message. */
  Verbose = "verbose",

  /** Message to assist with debugging. */
  Debug = "debug",

  /** Unnecessarily noisy or frequent message. */
  Silly = "silly",
}

const allLogLevels: string[] = [
  LogLevel.Error,
  LogLevel.Warn,
  LogLevel.Info,
  LogLevel.HTTP,
  LogLevel.Verbose,
  LogLevel.Debug,
  LogLevel.Silly,
];

interface CustomRequest extends Request {
  customProps?: Record<string, any>;
}

/**
 * Determines if the value is a valid log level or not.
 * @param value the value to test
 * @returns true if a log level, false if not
 */
export const isLogLevel = (value: unknown): value is LogLevel => {
  if (typeof value !== "string") {
    return false;
  }
  return allLogLevels.indexOf(value) !== -1;
};

export const loggerOptions: Params = {
  pinoHttp: [
    {
      // https://getpino.io/#/docs/api?id=timestamp-boolean-function
      // Change time value in production log.
      // timestamp: stdTimeFunctions.isoTime,
      quietReqLogger: true,
      genReqId: (req): ReqId =>
        (<Request>req).header("X-Request-Id") ?? nanoid(),
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            level: "debug",
            // https://github.com/pinojs/pino-pretty
            transport: {
              target: "pino-pretty",
              options: { sync: true, singleLine: true },
            },
          }),
      autoLogging: {
        ignore: (req) => new Set(["/graphql"]).has((<Request>req).originalUrl),
      },
      customProps: (req: CustomRequest) => req.customProps,
    },
    multistream(
      [
        // https://getpino.io/#/docs/help?id=log-to-different-streams
        { level: "debug", stream: process.stdout },
        { level: "error", stream: process.stderr },
        { level: "fatal", stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
