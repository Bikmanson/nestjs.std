<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
=======
import {Module} from '@nestjs/common';

import {CacheModule} from "@lib/cache";

import {AppController} from '@app/app.controller';
import {ConfigModule} from "@nestjs/config";

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
>>>>>>> 976f9379 (first commit)
})
export class AppModule {}
