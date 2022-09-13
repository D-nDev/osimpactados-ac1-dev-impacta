import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { GetMyEstablishmentErrorCodes } from '@shared/enums/GetMyEstablishmentErrorCodes';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class GetMyEstablishmentController implements BaseController {
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
      this.logger.error('Cannot Delete Establishment', err);
      const errorType = GetMyEstablishmentErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === GetMyEstablishmentErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
