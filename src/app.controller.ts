import { Controller, Get, Param, Post, Query } from '@nestjs/common';

import {
  CacheService,
  CacheKey,
  CacheValue,
  CacheSetResponse,
} from '@lib/cache';

@Controller()
export class AppController {
  constructor(private readonly cache: CacheService) {}

  @Get('cache/:key')
  getCache(@Param('key') key: CacheKey): Promise<CacheValue> {
    return this.cache.get(key);
  }

  @Post('cache')
  addToCache(
    @Query('key') key: CacheKey,
    @Query('value') value: CacheValue,
  ): Promise<CacheSetResponse> {
    return this.cache.set(key, value);
  }
}
