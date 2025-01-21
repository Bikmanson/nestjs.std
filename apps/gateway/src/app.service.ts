import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

import { CredDto } from '@app/dtos/cred.dto';
import { ProductDto } from '@app/dtos/product.dto';
import { UserDto } from '@app/dtos/user.dto';

import { ISign } from '@app/interfaces/sign.interface';
import { IUser } from '@app/interfaces/user.interface';
import { IProduct } from '@app/interfaces/product.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly http: HttpService,
    private readonly jwt: JwtService,
  ) {}

  async sign({ login, pass }: CredDto): Promise<ISign> {
    const users = [
      {
        login: 'vitya',
        pass: 'qweqwe',
      },
      {
        login: 'vika',
        pass: 565,
      },
    ];

    const user = users.find(({ login: userLogin }) => userLogin === login);

    if (user?.pass !== pass) {
      throw new UnauthorizedException();
    }

    return { token: await this.jwt.signAsync({ user: login }) };
  }

  async getProduct(name: string): Promise<IProduct> {
    const { data } = await firstValueFrom<AxiosResponse<IProduct>>(
      this.http
        .get<IProduct>(`http://localhost:3011/product-storage`, {
          params: { name },
        })
        .pipe(
          catchError((error: AxiosError): any => {
            throw `Error: ${error.message}`;
          }),
        ),
    );

    return data;
  }

  async getUser(email: string): Promise<IUser> {
    const { data } = await firstValueFrom<AxiosResponse<IUser>>(
      this.http
        .get<IUser>(`http://localhost:3012/user-management`, {
          params: { email },
        })
        .pipe(
          catchError((error: AxiosError): any => {
            throw `Error: ${error.message}`;
          }),
        ),
    );

    return data;
  }

  async addProduct(product: ProductDto): Promise<'OK'> {
    const { data } = await firstValueFrom<AxiosResponse>(
      this.http.post('http://localhost:3011/product-storage', product),
    );

    return data;
  }

  async addUser(user: UserDto): Promise<'OK'> {
    const { data } = await firstValueFrom<AxiosResponse>(
      this.http.post('http://localhost:3012/user-management', user),
    );

    return data;
  }
}
