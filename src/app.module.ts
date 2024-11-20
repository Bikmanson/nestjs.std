import { Module } from '@nestjs/common';

import { CacheModule } from '@lib/cache';

import { AppController } from '@app/app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductStorageModule } from '@product-storage/product-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.forRoot({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
    CacheModule.forRootAsync({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
    ProductStorageModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
