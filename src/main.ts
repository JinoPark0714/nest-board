import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from './util/swagger';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path : path.resolve(
    (process.env.NODE_ENV === 'production') ? '.production.env' : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
  )
});

console.log(`현재 ${process.env.NODE_ENV} 입니다.`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // connect configuration Swagger
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
