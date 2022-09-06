import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, serverError } from './helpers/httpHelper';
import { Request } from 'express';

export default class ValidateUserController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, token } = request.body;
      
      const result = await this.useCase.execute(email, token);

      if(result) {
        return ok(true);
      } else {
        return badRequest("Expired or invalid validate code");
      }

    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
