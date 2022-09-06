import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, serverError } from './helpers/httpHelper';
import { Request } from 'express';

export default class LoginUserController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, password } = request.body;

      const execute = await this.useCase.execute(email, password);

      if (execute) {
        return ok(execute);
      }
      
      return badRequest('Invalid email or password, or account not validated yet');
    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
