import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, serverError, unauthorized } from './helpers/httpHelper';
import { Request } from 'express';
import { TokenEstablishmentErrorsEnum } from '../errors/TokenEstablishmentErrorsEnum';

export default class GetMyEstablishmentController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;

      if (token) {
        const execute = await this.useCase.execute(token);

        return ok(execute);
      }

      return badRequest('Unauthorized');
    } catch (err: any) {
      const errorType = TokenEstablishmentErrorsEnum[err.message];

      switch (errorType) {
        case errorType:
          return unauthorized(TokenEstablishmentErrorsEnum[err.message]);
        case !errorType && err.message:
          return serverError(err.message);
        default:
          return serverError('Unknown server error');
      }
    }
  }
}
