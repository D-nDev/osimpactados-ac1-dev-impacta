import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, serverError } from './helpers/httpHelper';
import { Request } from 'express';

export default class LoginUserController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const [, hash]: any = request.headers.authorization?.split(' ');

      if (!hash) {
        return badRequest('Please provide a login basic auth token');
      }

      const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

      const execute = await this.useCase.execute(email, password);

      if (execute) {
        return ok(execute);
      }

      return badRequest('Invalid email/password, or account not validated yet');
    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
