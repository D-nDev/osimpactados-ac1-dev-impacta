import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, noContent, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { DeleteUserErrorCodes } from '@shared/enums/DeleteUserErrorCodes';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class DeleteUserController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { id } = request.params;

      if (!id) {
        return badRequest('Please provide an id');
      }

      await this.useCase.execute({ id });

      return noContent();
    } catch (err: any) {
      this.logger.error('Cannot Delete User', err);
      const errorType = DeleteUserErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
