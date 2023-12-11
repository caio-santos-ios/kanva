import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kanva')
    .setDescription('A KanvaAPI é a plataforma de cursos online Kanva, esta API permite uma integração de cursos online, oferecendo funcionalidades essenciais para administradores, instrutores e alunos.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({whitelist: false}),
    new ValidationPipe({transform: true, transformOptions: { groups: ['hashPassword'] }})
  )
  
  await app.listen(3000);
}
bootstrap();
