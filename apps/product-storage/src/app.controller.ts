import { Controller, Get, Param } from '@nestjs/common';
import { CacheService } from '@lib/cache/src';

@Controller('product-storage')
export class AppController {
  constructor(private readonly cache: CacheService) {}

  @Get(':productName')
  get(@Param('productName') productName: string): Promise<unknown> {
    return this.cache.get(productName);
  }
}