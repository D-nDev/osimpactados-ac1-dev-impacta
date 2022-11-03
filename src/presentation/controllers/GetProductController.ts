import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { notFound, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';

export default class GetProductController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(req: Request): Promise<HttpResponse> {
    try {
      const { subsidiaryId } = req.params;
      const { productId } = req.params;

      const execute = await this.useCase.execute(subsidiaryId, productId);

      if (execute) {
        return ok(execute);
      }
      return notFound('Product not found');
    } catch (err: any) {
      this.logger.error('Cannot Get a Product', err);
      return unknownError();
    }
  }
}
