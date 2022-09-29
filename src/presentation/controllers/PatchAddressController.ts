import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, notFound, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { PatchAddressErrorCodes } from '@app/shared/enums/PatchAddressErrorCodes';

export default class PatchAddressController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;
      const { id } = request.params;

      if (!id) {
        return badRequest('Please provide an address ID');
      }

      const execute = await this.useCase.execute(token, id, request.body);

      if (execute) {
        return ok(execute);
      }

      return notFound('Address or User not found');
    } catch (err: any) {
      this.logger.error('Cannot update address', err);
      const errorType = PatchAddressErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === PatchAddressErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        } else if (errorType === PatchAddressErrorCodes.P2025) {
          return notFound('Address or User not found');
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
