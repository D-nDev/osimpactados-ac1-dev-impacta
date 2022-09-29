import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class Create2FaTokenController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;
      const execute = await this.useCase.execute(token);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Create 2Fa Token', err);
      return unknownError();
    }
  }
}
