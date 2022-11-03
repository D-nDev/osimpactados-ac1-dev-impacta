import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export class WebHookPurchaseController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { data } = request.body;
      console.log('purchaseiD', request.body.data);
      const execute = await this.useCase.execute(data.id);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Create Purchase', err);
      return unknownError();
    }
  }
}
