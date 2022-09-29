import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class BlackListRecoverTokenController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, token } = request.body;
      const execute = await this.useCase.execute(token, email);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot BlackList this recover token', err);
      return unknownError();
    }
  }
}
