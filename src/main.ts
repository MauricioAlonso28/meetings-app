import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true
    })
  )

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })

  app.use(cookieParser())  

  const configSwagger = new DocumentBuilder()
    .setTitle('MundSoh')
    .setDescription("API's routes description")
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)

  SwaggerModule.setup('api', app, document)
  
  await app.listen(3000);
}

bootstrap();