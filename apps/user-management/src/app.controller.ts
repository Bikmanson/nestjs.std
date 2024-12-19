import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

import { CacheSetResponse } from '@lib/cache';

import { UserDto } from '@user-management/dtos/user.dto';
import { IUser } from '@user-management/interfaces/user.interface';
import { AppService } from '@user-management/app.service';

@Controller('user-management')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  @ApiParam({ name: 'email', required: true, description: "The user's email" })
  @ApiResponse({ status: 200, description: 'The user object' })
  @ApiResponse({ status: 404, description: 'User is not found' })
  async getUserByEmail(@Query('email') email: string): Promise<IUser> {
    return this.service.getUserByEmail(email);
  }

  @Post()
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'The user is saved' })
  addUser(@Body() user: UserDto): Promise<CacheSetResponse> {
    return this.service.addUser(user);
  }
}
