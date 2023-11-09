import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from './not-found-exception.filter';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ 
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validationError: {
        target: false,
        value: false,
      },
    })
  );
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
