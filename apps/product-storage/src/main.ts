import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentBuilder = new DocumentBuilder()
    .setTitle('API Product storage')
    .setDescription('Test product storage module')
    .setVersion('1.0.0')
    .addTag('std')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api-product-storage', app, document);

  await app.listen(3011);
}
bootstrap();
