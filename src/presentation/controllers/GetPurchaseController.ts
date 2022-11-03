import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { notFound, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export class GetPurchaseController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.headers;
      const { purchaseId } = request.params;
      const execute = await this.useCase.execute(token, purchaseId);

      if (execute) {
        return ok(execute);
      } else {
        return notFound('Product not found');
      }
    } catch (err: any) {
      this.logger.error('Cannot Get User Purchase', err);
      return unknownError();
    }
  }
}
