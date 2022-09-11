import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, created, serverError } from './helpers/httpHelper';
import { Request } from 'express';
import { TokenUserRecoverErrorsEnum } from '../errors/TokenUserRecoverErrorsEnum';

export default class SendSMSRecoverCodeController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { mobileNumber } = request.body;

      if (mobileNumber) {
        await this.useCase.execute(mobileNumber);
        return created(true);
      }
      return badRequest('Please provide a mobile number');
    } catch (err: any) {
      const errorType = TokenUserRecoverErrorsEnum[err.code];

      // eslint-disable-next-line no-extra-boolean-cast
      if (!!errorType) {
        return badRequest(TokenUserRecoverErrorsEnum[err.code]);
      } else if (!errorType && err.message) {
        return serverError(err.message);
      } else {
        return serverError('Unknown server error');
      }
    }
  }
}
