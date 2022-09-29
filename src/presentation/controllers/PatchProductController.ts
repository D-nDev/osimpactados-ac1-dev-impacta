import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, notFound, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { PatchProductErrorCodes } from '@shared/enums/PatchProductErrorCodes';

export default class PatchProductController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { product } = request.body;
      const { productId } = request.params;
      const { token } = request.cookies;
      const { subsidiaryId } = request.query;
      if (!product) {
        return badRequest('You should send one product data');
      }
      if (!subsidiaryId) {
        return badRequest('Please provide a subsidiaryId');
      }

      const execute = await this.useCase.execute(
        productId,
        {
          ...product,
        },
        {
          subsidiaryId,
          token,
        },
        request.files![0] ?? null,
      );

      if (execute) {
        return ok(execute);
      }

      return notFound('Product or subsidiary not found');
    } catch (err: any) {
      this.logger.error('Cannot update product', err);
      const errorType = PatchProductErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === PatchProductErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
