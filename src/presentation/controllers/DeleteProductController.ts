import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { DeleteProductErrorCodes } from '@shared/enums/DeleteProductErrorCodes';

export default class DeleteProductController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;
      const { productId } = request.params;
      const { subsidiaryId } = request.params;

      const execute = await this.useCase.execute(productId, subsidiaryId, token);
      if (execute) {
        return ok(execute);
      } else {
        return badRequest('Product not found');
      }
    } catch (err: any) {
      this.logger.error('Cannot delete product', err);
      const errorType = DeleteProductErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === DeleteProductErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
