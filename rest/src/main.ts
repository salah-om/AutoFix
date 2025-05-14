import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/',
  });

  const config = new DocumentBuilder()
    .setTitle('AutoFix Car Complaints API')
    .setDescription('AutoFix is a web application designed to help car owners track and report vehicle problems, find common fixes, and connect with mechanics for assistance.')
    .setVersion('1.0')
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(3000);
}
bootstrap();