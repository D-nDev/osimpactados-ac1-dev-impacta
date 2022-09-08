import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, created, serverError } from './helpers/httpHelper';
import { Request } from 'express';
import { TokenEstablishmentRecoverErrorsEnum } from '../errors/TokenEstablishmentRecoverErrorsEnum';

export default class SendEmailRecoverCodeController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email } = request.body;

      if(email) {
        await this.useCase.execute(email);
        return created(true);
      }
      return badRequest("Provide a email");

    } catch (err: any) {
      const errorType = TokenEstablishmentRecoverErrorsEnum[err.code];

      if (!!errorType) {
        return badRequest(TokenEstablishmentRecoverErrorsEnum[err.code]);
      } else if (!errorType && err.message) {
        return serverError(err.message);
      } else {
        return serverError('Unknown server error');
      }
    }
  }
}
