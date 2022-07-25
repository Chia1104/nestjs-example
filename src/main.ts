import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NestJS Example')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);
  await app.listen(process.env.PORT || 3001);
}
bootstrap().then(() =>
  console.log(`Server is running on port ${process.env.PORT || 3001}`),
);
