import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@lib/cache/src';

@Module({
  imports: [CacheModule.forRoot({ host: 'localhost', port: 6379 })],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppController],
})
export class ProductStorageModule {}
