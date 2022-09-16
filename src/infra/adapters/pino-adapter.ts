import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import pino, { P } from 'pino';

@singleton()
export default class PinoAdapter implements ILoggerAdapter {
  private readonly logger: P.BaseLogger;

  constructor() {
    this.logger = pino({
      name: 'ESTABLISHMENT-SERVICE',
      enabled: true,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: true,
        },
      },
    });
    Object.freeze(this);
  }

  error(msg: string, data: any): void {
    this.logger.error(data, msg);
  }

  info(msg: string, data: any): void {
    this.logger.info(data, msg);
  }

  warn(msg: string, data: any): void {
    this.logger.warn(data, msg);
  }

  debug(msg: string, data: any): void {
    this.logger.debug(data, msg);
  }
}
