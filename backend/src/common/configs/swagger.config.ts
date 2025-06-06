import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENV } from '../constant/env';

export function InitializeSwagger(app: INestApplication) {
  const configs = new DocumentBuilder()
    .setTitle('snapp-food')
    .setDescription('snapp-food api version 1')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        in: 'headers',
        scheme: 'bearer',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, configs);

  SwaggerModule.setup('/docs', app, document);
}
