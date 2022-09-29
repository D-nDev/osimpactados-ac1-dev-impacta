import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { JwtErrorCodes } from '@app/shared/enums/JwtErrorCodes';

export default class CreateSubsidiaryController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;

      const execute = await this.useCase.execute(request.body, token);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Create Subsidiary', err);
      const errorType = JwtErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === JwtErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
