import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CacheKey, CacheService, CacheValue } from '@lib/cache';

@Controller('product-storage')
export class AppController {
  constructor(private readonly cache: CacheService) {}

  @Get(':productName')
  get(@Param('productName') productName: string) {
    return this.cache.get(productName);
  }

  @Post()
  set(@Query('key') key: CacheKey, @Query('value') value: CacheValue) {
    return this.cache.set(key, value);
  }
}