import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // connect configuration Swagger
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
