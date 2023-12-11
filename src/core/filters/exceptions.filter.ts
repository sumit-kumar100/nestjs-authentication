import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";

interface ErrorResponse {
  statusCode: number;
  message: any;
  error: string;
}

interface NestError {
  catch(exception: unknown, host: ArgumentsHost): void;
}

export function getErrorByStatusCode(status: HttpStatus): string {
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      return "Bad Request";
    default:
      return "Unknown Error";
  }
}

@Catch()
export class ExceptionsFilter implements NestError {
  private readonly logger: Logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = this.getHttpStatus(exception);

    const errorResponse = this.createErrorResponse(exception, status);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error({ err: exception, args: request.body });
    }

    response.status(status).json(errorResponse);
  }

  private getHttpStatus(exception: unknown): HttpStatus {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private createErrorResponse(
    exception: unknown,
    statusCode: HttpStatus,
  ): ErrorResponse {
    const error =
      statusCode === HttpStatus.BAD_REQUEST
        ? "Bad Request"
        : statusCode === HttpStatus.INTERNAL_SERVER_ERROR
          ? "Internal Server Error"
          : "Unhandled Exception";

    const message =
      exception instanceof HttpException ? exception.getResponse() : error;

    return {
      statusCode,
      message,
      error,
    };
  }
}
