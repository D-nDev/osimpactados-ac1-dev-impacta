import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, created, unknownError } from './helpers/httpHelper';
import { Request } from 'express';

export default class CreateProductController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { product } = request.body;
      const { token } = request.cookies;
      const { subsidiaryId } = request.body;

      if (token) {
        if (product && subsidiaryId) {
          const execute = await this.useCase.execute({ product, token, subsidiaryId });

          return created(execute);
        }
        return badRequest('Insert a product and subsidiary');
      }

      return badRequest('Unauthorized');
    } catch (err: any) {
      return unknownError();
    }
  }
}
