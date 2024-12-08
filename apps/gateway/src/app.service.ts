import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProduct(name: any): any {
    return `Gateway: ${name}`;
  }
}
