import * as process from 'process';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
