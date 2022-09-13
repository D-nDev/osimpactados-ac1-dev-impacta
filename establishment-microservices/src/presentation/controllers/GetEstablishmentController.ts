import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { GetEstablishmentErrorCodes } from '@shared/enums/GetEstablishmentErrorCodes';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class GetEstablishmentController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { id } = request.params;

      if (!id) {
        return badRequest('Please provide an id');
      }

      const execute = await this.useCase.execute({ id });

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Get Establishment', err);
      const errorType = GetEstablishmentErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
