import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { LoginEstablishmentErrorCodes } from '@shared/enums/LoginEstablishmentErrorCodes';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class LoginEstablishmentController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const [, hash]: any = request.headers.authorization?.split(' ');

      const { code } = request.body;

      if (!hash) {
        return badRequest('Please provide a login basic auth token');
      }

      const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

      const execute = await this.useCase.execute({ email, password, code });

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Login Establishment', err);
      const errorType = LoginEstablishmentErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
