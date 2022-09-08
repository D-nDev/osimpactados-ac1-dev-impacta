import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, serverError } from './helpers/httpHelper';

export default class GetEstablishmentsController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(): Promise<HttpResponse> {
    try {  
      const execute = await this.useCase.execute();

      return ok(execute);
    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
