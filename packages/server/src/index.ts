import * as path from 'path';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('C2app server')
    .setDescription('C2app server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(express.static(path.join(process.cwd(), 'public')));
  await app.listen(port);
}
bootstrap();
