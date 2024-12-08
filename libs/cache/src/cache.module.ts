import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';

import { CacheService } from './services/cache.service';
import { ModuleOptionsInterface } from './interfaces/module-options.interface';

@Module({})
export class CacheModule {
  static forRoot({ host, port }: ModuleOptionsInterface) {
    return {
      module: CacheModule,
      imports: [
        RedisModule.forRoot({
          type: 'single',
          url: `redis://${host}:${port}`,
        }),
      ],
      providers: [CacheService],
      exports: [CacheService],
    };
  }

  static async forRootAsync({ host, port }: ModuleOptionsInterface) {
    return {
      module: CacheModule,
      imports: [
        RedisModule.forRootAsync({
          useFactory: () => ({
            type: 'single',
            url: `redis://${host}:${port}`,
          }),
        }),
      ],
      providers: [CacheService],
      exports: [CacheService],
    };
  }
}
