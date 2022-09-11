import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, serverError } from './helpers/httpHelper';
import { Request } from 'express';

export default class GetEstablishmentController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { id } = request.params;

      if (!id) {
        return badRequest('Please provide an id');
      }

      const execute = await this.useCase.execute(id);

      return ok(execute);
    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
