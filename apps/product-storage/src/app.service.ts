import { Injectable } from '@nestjs/common';

import { CacheService, CacheSetResponse } from '@lib/cache';

import { ProductDto } from '@product-storage/dtos/product.dto';
import { IProduct } from '@product-storage/interfaces/product.interface';

@Injectable()
export class AppService {
  constructor(private readonly cache: CacheService) {}

  async getProduct(name: string): Promise<IProduct> {
    const productJson: string = (await this.cache.get(name)) as string;

    return JSON.parse(productJson) as IProduct;
  }

  addProduct(product: ProductDto): Promise<CacheSetResponse> {
    const { name } = product;
    const productJson = JSON.stringify(product);

    return this.cache.set(name, productJson);
  }
}
