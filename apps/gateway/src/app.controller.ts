import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { ProductDto } from './dtos/product.dto';
import { UserDto } from './dtos/user.dto';
import { IProduct } from '@product-storage/interfaces/product.interface';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('product')
  @ApiParam({ name: 'name', required: true, description: 'The product name' })
  @ApiResponse({ status: 200, description: 'The product object' })
  @ApiResponse({ status: 404, description: 'The product is not found' })
  getProduct(@Query('name') name: string): Promise<IProduct> {
    return this.service.getProduct(name);
  }

  @Get('user')
  @ApiParam({ name: 'email', required: true, description: "The user's email" })
  @ApiResponse({ status: 200, description: 'The user object' })
  @ApiResponse({ status: 404, description: 'User is not found' })
  getUser(@Query('email') email: string): Promise<UserDto> {
    return this.service.getUser(email);
  }

  @Post('product')
  @ApiBody({ type: ProductDto })
  @ApiResponse({ status: 200, description: 'The product is saved' })
  addProduct(@Body() product: ProductDto): Promise<'OK'> {
    return this.service.addProduct(product);
  }

  @Post('user')
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'The user is saved' })
  addUser(@Body() user: UserDto): Promise<'OK'> {
    return this.service.addUser(user);
  }
}
