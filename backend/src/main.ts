import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { InitializeSwagger } from './common/configs/swagger.config';
import { ENV } from './common/constant/env';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  InitializeSwagger(app);
  await app.listen(process.env.APP_PORT);
  console.log(`Docs : http://localhost:${ENV.App_Port}/docs`);
}
bootstrap();
