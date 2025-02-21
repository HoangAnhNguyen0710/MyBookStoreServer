import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { writeFileSync } from 'fs';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Enable Swagger UI
  SwaggerModule.setup('api', app, document);

  // Xuất file swagger.json để frontend dùng
  // writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  // Bật whitelist để loại bỏ các field không có trong DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không có trong DTO
      forbidNonWhitelisted: true, // (Tuỳ chọn) Throw error nếu có field lạ
      transform: true, // Tự động transform request thành instance của DTO
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
