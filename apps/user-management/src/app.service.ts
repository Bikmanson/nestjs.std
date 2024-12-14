import { Injectable } from '@nestjs/common';

import { CacheService, CacheSetResponse } from '@lib/cache';

import { IUser } from '@user-management/interfaces/user.interface';
import { UserDto } from '@user-management/dtos/user.dto';

@Injectable()
export class AppService {
  constructor(private readonly cache: CacheService) {}

  async getUserByEmail(email: string): Promise<IUser> {
    const userJson: string = (await this.cache.get(email)) as string;

    return JSON.parse(userJson) as IUser;
  }

  addUser(user: UserDto): Promise<CacheSetResponse> {
    const { email } = user;
    const userJson = JSON.stringify(user);

    return this.cache.set(email, userJson);
  }
}
