import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, created, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { CreateProductErrorCodes } from '@app/shared/enums/CreateProductErrorCodes';
import { IValidator } from './contracts/validator';

export default class CreateProductController implements BaseController {
  constructor(
    private readonly useCase: useCase,
    private readonly logger: ILoggerAdapter,
    private readonly validator: IValidator,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { products } = request.body;
      const { token } = request.cookies;
      const { subsidiaryId } = request.params;
      const photos = request.files;

      if (token) {
        if (request.files?.length !== products.length) {
          return badRequest('Each product should have a photo and vice versa');
        }
        if (!products) {
          return badRequest('You should send at least one product');
        }
        for (let index = 0; index < products.length; index++) {
          if (!products[index].name || !products[index].stock || !products[index].value) {
            return badRequest('Each product should have name, stock and value');
          }
        }

        const execute = await this.useCase.execute(
          {
            products: JSON.parse(JSON.stringify(request.body.products)),
            subsidiaryId,
            token,
          },
          photos,
        );

        return created(execute);
      }

      return badRequest('Unauthorized');
    } catch (err: any) {
      this.logger.error('Cannot create product', err);
      const errorType = CreateProductErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === CreateProductErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
