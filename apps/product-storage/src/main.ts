import { NestFactory } from '@nestjs/core';
import { ProductStorageModule } from './product-storage.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductStorageModule);
  await app.listen(3001);
}
bootstrap();
