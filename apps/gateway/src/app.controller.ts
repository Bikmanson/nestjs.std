import { Controller, Get, Param, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('product/:name')
  getProduct(@Param('name') name: any): Promise<any> {
    return this.service.getProduct(name);
  }

  // @Post('cache')
  // addToCache(
  //   @Query('key') key: CacheKey,
  //   @Query('value') value: CacheValue,
  // ): Promise<CacheSetResponse> {
  //   return this.cache.set(key, value);
  // }
}
