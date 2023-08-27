import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { BadRequestException, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
  writeFileSync("./swagger-spec.json", JSON.stringify(document));
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessage = Object.values(errors[0].constraints).join(', ');
        throw new BadRequestException(errorMessage);
      },
    }
  ));
  await app.listen(port);
}
bootstrap();
