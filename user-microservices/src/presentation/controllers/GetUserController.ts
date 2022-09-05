import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, serverError } from './helpers/httpHelper';

export default class GetUserController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Record<string, any>): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      
      const execute = await this.useCase.execute(id);

      return ok(execute);
    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
