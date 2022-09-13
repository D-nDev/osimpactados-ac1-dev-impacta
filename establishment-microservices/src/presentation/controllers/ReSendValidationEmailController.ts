import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, created, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { ReSendValidationEmailErrorCodes } from '@shared/enums/ReSendValidationEmailErrorCodes';

export default class ReSendValidationEmailController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email } = request.body;

      if (email) {
        const result = await this.useCase.execute({ to: email });
        if (typeof result === 'boolean') {
          return created(result);
        } else if (typeof result === 'number') {
          return badRequest(`You have to wait more ${result} seconds to re-send your code`);
        }
      }
      return badRequest('Please provide an email');
    } catch (err: any) {
      this.logger.error('Cannot ReSend Validation Email', err);
      const errorType = ReSendValidationEmailErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
