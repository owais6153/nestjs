import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    // Transforming the default error response format
    const formattedErrors = exceptionResponse.message.reduce((acc, message) => {
      const [field, ...rest] = message.split(' ');
      const key = field.trim();
      const errorMessage = rest.join(' ').trim();
      acc[key] = acc[key] ? `${acc[key]}, ${errorMessage}` : errorMessage;
      return acc;
    }, {});

    response.status(status).json({
      message: formattedErrors,
      error: exceptionResponse.error || 'Bad Request',
      statusCode: status,
    });
  }
}
