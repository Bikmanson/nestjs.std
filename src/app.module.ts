import { Module } from '@nestjs/common';

import { CacheModule } from '@lib/cache';

import { AppController } from '@app/app.controller';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
})
export class AppModule {}
