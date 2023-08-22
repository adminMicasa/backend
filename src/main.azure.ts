import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { writeFileSync } from 'fs';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const config = app.get(ConfigService);
  const port = config.get('port');

  const builder = new DocumentBuilder()
    .setTitle('Mi Casa')
    .setDescription('Mi Casa')
    .addServer('https://serverlessmicasamed.azurewebsites.net/')
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('docs', app, document);
  writeFileSync("./swagger-spec.json", JSON.stringify(document));
  await app.init();
  return app;
}
