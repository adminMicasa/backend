// typeorm-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeORMExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.logger.error(exception);
    response.status(423).json({
      statusCode: 423,
      message: 'Contacte a soporte tecnico!',
      error: exception.message,
    });
  }
}
