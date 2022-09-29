import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { JwtErrorCodes } from '@shared/enums/JwtErrorCodes';

export default class CreateAddressController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;

      const execute = await this.useCase.execute(token, request.body);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot create address', err);
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
