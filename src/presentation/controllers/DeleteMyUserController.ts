import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { DeleteMyUserErrorCodes } from '@shared/enums/DeleteMyUserErrorCodes';

export default class DeleteMyUserController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;

      if (token) {
        const execute = await this.useCase.execute({ token });
        if (execute) {
          return ok(execute);
        } else {
          return badRequest('User not found');
        }
      }

      return badRequest('Unauthorized');
    } catch (err: any) {
      this.logger.error('Cannot Delete User', err);
      const errorType = DeleteMyUserErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === DeleteMyUserErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
