import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { Validate2FaErrorCodes } from '@shared/enums/Validate2FaErrorCodes';

export default class Validate2FaTokenController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { code } = request.body;
      const { token } = request.cookies;
      const execute = await this.useCase.execute(token, code);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Validate 2FA Token', err);
      const errorType = Validate2FaErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === Validate2FaErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
