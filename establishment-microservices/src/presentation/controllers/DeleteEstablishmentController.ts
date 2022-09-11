import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, noContent, serverError } from './helpers/httpHelper';
import { Request } from 'express';

export default class DeleteEstablishmentController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { id } = request.params;

      if (!id) {
        return badRequest('Please provide an id');
      }

      await this.useCase.execute(id);

      return noContent();
    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
