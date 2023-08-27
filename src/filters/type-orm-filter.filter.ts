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
    if (exception.message.includes('UNIQUE KEY constraint')) {
      const ukMatch = exception.message.match(/'([^']+)'/);
      const valueMatch = exception.message.match(/\(([^)]+)\)/);
      const ukConstraint = ukMatch ? ukMatch[1] : 'Desconocido';
      const duplicateValue = valueMatch ? valueMatch[1] : 'Desconocido';
      const errorMessage = `La regla de negocio [${ukConstraint}] no permite duplicados, valor actual: ${duplicateValue}, intente ingresar otro valor!`
      response.status(400).json({
        statusCode: 400,
        message: errorMessage,
        error: exception.message,
      });
    } else {
      response.status(423).json({
        statusCode: 423,
        message: 'Contacte a soporte tecnico!',
        error: exception.message,
      });
    }

  }
}
