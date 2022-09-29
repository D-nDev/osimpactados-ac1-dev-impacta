import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { IMemoryCacheAdapter } from '@application/ports/IMemoryCacheAdapter';
import Redis from 'ioredis';
import opentelemetry from '@opentelemetry/api';

@singleton()
export default class IORedisAdapter implements IMemoryCacheAdapter {
  private readonly redis: Redis = new Redis({
    port: parseInt(process.env.REDIS_PORT as any, 10) ?? 6379,
    host: process.env.REDIS_HOST ?? 'localhost',
    password: process.env.REDIS_PASSWORD ?? '123456',
  });

  public async get(key: string) {
    const tracer = opentelemetry.trace.getTracer('redis');
    const span = tracer.startSpan('redisget');
    span.setAttribute('redis:get', key);

    const result = await this.redis.get(key);
    span.end();
    return result;
  }

  public async getJson<T>(key: string): Promise<Awaited<T> | null> {
    const result = await this.redis.get(key);
    if (result) {
      const jsonedResult: Awaited<T> = JSON.parse(result);
      return jsonedResult;
    }
    return null;
  }

  public async set(key: string, value: any, extime?: number) {
    const tracer = opentelemetry.trace.getTracer('redis');
    const span = tracer.startSpan('redisset');
    span.setAttributes({ key, value, extime: extime ?? 'none' });
    if (extime) {
      await this.redis.set(key, value, 'EX', extime);
    } else {
      await this.redis.set(key, value);
    }
    span.end();
    return true;
  }

  public async deleteKey(key: string) {
    const tracer = opentelemetry.trace.getTracer('redis');
    const span = tracer.startSpan('redisdel');
    span.setAttribute('rediskey', key);
    await this.redis.del(key);
    span.end();
    return true;
  }

  public async getTTL(key: string) {
    const tracer = opentelemetry.trace.getTracer('redis');
    const span = tracer.startSpan('redisttl');
    const ttl = await this.redis.ttl(key);
    span.setAttributes({ key, ttl });
    span.end();
    return ttl;
  }
}
