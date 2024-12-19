import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

import { CacheSetResponse } from '@lib/cache';

import { AppService } from '@product-storage/app.service';
import { ProductDto } from '@product-storage/dtos/product.dto';
import { IProduct } from '@product-storage/interfaces/product.interface';

@Controller('product-storage')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  @ApiParam({ name: 'name', required: true, description: 'The product name' })
  @ApiResponse({ status: 200, description: 'The product object' })
  @ApiResponse({ status: 404, description: 'The product is not found' })
  async get(@Query('name') productName: string): Promise<IProduct> {
    return this.service.getProduct(productName);
  }

  @Post()
  @ApiBody({ type: ProductDto })
  @ApiResponse({ status: 200, description: 'The product is saved' })
  addProduct(@Body() product: ProductDto): Promise<CacheSetResponse> {
    return this.service.addProduct(product);
  }
}