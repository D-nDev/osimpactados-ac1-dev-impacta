import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, created, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { SendRecoverTokenErrorCodes } from '@shared/enums/SendRecoverToken';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class SendEmailRecoverCodeController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email } = request.body;

      if (email) {
        const result = await this.useCase.execute({ to: email });
        if (typeof result === 'boolean') {
          return created(result);
        } else if (typeof result === 'number') {
          return badRequest(`You have to wait more ${result} seconds to generate another code`);
        }
      }
      return badRequest('Please provide an email');
    } catch (err: any) {
      this.logger.error('Cannot Send Recover Email', err);
      const errorType = SendRecoverTokenErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (err.code === 'USER_NOT_FOUND') {
          return created(true);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
