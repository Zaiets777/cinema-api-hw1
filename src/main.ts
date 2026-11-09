import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальна валідація, як вимагається в завданні
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // відсікає поля, яких немає в DTO
      transform: true, // автоматично перетворює типи
    }),
  );

  // Налаштування Swagger (документація API)
  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription('Документація для сервісу кінотеатру')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();