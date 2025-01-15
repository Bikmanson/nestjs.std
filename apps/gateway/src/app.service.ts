import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ProductDto } from './dtos/product.dto';
import { UserDto } from './dtos/user.dto';

import { IUser } from './interfaces/user.interface';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

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
