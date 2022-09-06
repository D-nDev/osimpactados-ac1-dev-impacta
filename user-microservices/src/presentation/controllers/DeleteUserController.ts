import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { noContent, serverError } from './helpers/httpHelper';

export default class DeleteUserController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Record<string, any>): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      
      await this.useCase.execute(id);

      return noContent();
    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
