import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const builder = new DocumentBuilder()
    .setTitle('Mi Casa')
    .setDescription('Mi Casa')
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('api', app, document);

  await app.init();
  return app;
}
