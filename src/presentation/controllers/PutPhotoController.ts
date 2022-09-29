import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, notFound, ok, unauthorized, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { PutPhotoErrorCodes } from '@app/shared/enums/PutPhotoErrorCodes';

export default class PutPhotoController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;
      if (!request.files![0]) {
        return badRequest('You should send one photo');
      }

      const execute = await this.useCase.execute(token, request.files![0]);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot update photo', err);
      const errorType = PutPhotoErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        if (errorType === PutPhotoErrorCodes.INVALID_JWT) {
          return unauthorized(errorType);
        } else if (errorType === PutPhotoErrorCodes.P2025) {
          return notFound('User not found');
        }
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
