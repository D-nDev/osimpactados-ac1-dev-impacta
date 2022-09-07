import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, serverError } from './helpers/httpHelper';
import { Request } from 'express';
import { bcryptEncoder } from '@app/src/application/ports/bcrypt';

export default class ChangeUserPassController implements BaseController {
  constructor(private readonly emailUseCase: useCase, private readonly numberUseCase: useCase, private readonly encoder: bcryptEncoder) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { mobileNumber, email, token, password } = request.body;
      let execute: any;

      if(!token) {
        return badRequest("Provide a token");
      }

      if(!password) {
        return badRequest("Provide new password");
      }
      
      if(mobileNumber) {
        execute = await this.numberUseCase.execute(mobileNumber, token, password, this.encoder);
      } else if(email) {
        execute = await this.emailUseCase.execute(email, token, password, this.encoder);
      } else if(email && mobileNumber) {
        execute = await this.emailUseCase.execute(email, token, password, this.encoder);
      }

      if(execute) {
        return ok(true);
      } else {
        return badRequest("Expired or invalid recover code/email");
      }

    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
