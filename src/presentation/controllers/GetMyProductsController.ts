import { ILoggerAdapter } from '@app/application/ports/ILoggerAdapter';
import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { notFound, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';

export default class GetMyProductsController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(req: Request): Promise<HttpResponse> {
    try {
      const { token } = req.cookies;
      const { subsidiaryId } = req.params;
      const execute = await this.useCase.execute(subsidiaryId, token);

      if (execute) {
        return ok(execute);
      }
      return notFound({ error: 'No products to show' });
    } catch (err: any) {
      this.logger.error('Cannot Get Products', err);
      return unknownError();
    }
  }
}