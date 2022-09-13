import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, noContent, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { DeleteEstablishmentErrorCodes } from '@shared/enums/DeleteEstablishmentErrorCodes';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class DeleteEstablishmentController implements BaseController {
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
      this.logger.error('Cannot Delete Establishment', err);
      const errorType = DeleteEstablishmentErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
