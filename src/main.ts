import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {setupSwagger} from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({transform : true}));
  // connect configuration Swagger
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
