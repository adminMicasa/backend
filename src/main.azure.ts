import { BadRequestException, HttpException, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
  let app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessage = Object.values(errors[0].constraints).join(', ');
        throw new BadRequestException(errorMessage);
      },
    }
  ));
  app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
  });
  await app.init();
  return app;
}
