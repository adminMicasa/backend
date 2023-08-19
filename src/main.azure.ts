import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const config = app.get(ConfigService);
  const port = config.get('port');

  const builder = new DocumentBuilder()
    .setTitle('Mi Casa')
    .setDescription('Mi Casa')
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('api', app, document);

  await app.init();
  await app.listen(port);

  return app;
}
