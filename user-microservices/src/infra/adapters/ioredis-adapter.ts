import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { IMemoryCacheAdapter } from '@application/ports/IMemoryCacheAdapter';
import Redis from 'ioredis';

@singleton()
export default class IORedisAdapter implements IMemoryCacheAdapter {
  private readonly redis: Redis = new Redis({
    port: parseInt(process.env.REDIS_PORT as any, 10) ?? 6379,
    host: process.env.REDIS_HOST ?? 'localhost',
    password: process.env.REDIS_PASSWORD ?? '123456',
  });

  public async get(key: string) {
    return await this.redis.get(key);
  }

  public async getJson<T>(key: string): Promise<Awaited<T> | null> {
    const result = await this.redis.get(key);
    if (result) {
      const jsonedResult: Awaited<T> = JSON.parse(result);
      return jsonedResult;
    }
    await this.redis.ttl(key);
    return null;
  }

  public async set(key: string, value: any, extime?: number) {
    if (extime) {
      await this.redis.set(key, value, 'EX', extime);
    } else {
      await this.redis.set(key, value);
    }
    return true;
  }

  public async deleteKey(key: string) {
    await this.redis.del(key);
    return true;
  }

  public async getTTL(key: string) {
    const ttl = await this.redis.ttl(key);
    return ttl;
  }
}
