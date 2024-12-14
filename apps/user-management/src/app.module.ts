import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@lib/cache';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.forRoot({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
