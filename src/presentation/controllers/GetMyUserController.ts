import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { GetMyUserErrorCodes } from '@shared/enums/GetMyUserErrorCodes';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class GetMyUserController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;

      if (token) {
        const execute = await this.useCase.execute({ token });

        return ok(execute);
      }

      return badRequest('Unauthorized');
    } catch (err: any) {
      this.logger.error('Cannot Delete User', err);
      const errorType = GetMyUserErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === GetMyUserErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
