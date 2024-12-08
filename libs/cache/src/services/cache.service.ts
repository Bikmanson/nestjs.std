import Redis from 'ioredis';

import {Injectable} from '@nestjs/common';
import {InjectRedis} from "@nestjs-modules/ioredis";

import {CacheKey, CacheSetResponse, CacheValue} from "@lib/cache/types/types.type";

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {
  }

  set(key: CacheKey, value: CacheValue): Promise<CacheSetResponse> {
    return this.redis.set(key, value);
  }

  get(key: CacheKey): Promise<CacheValue> {
    return this.redis.get(key);
  }
}