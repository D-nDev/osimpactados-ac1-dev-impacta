import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, created, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class ReSendRecoverSMSController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { mobileNumber } = request.body;

      if (mobileNumber) {
        const result = await this.useCase.execute({ to: mobileNumber });
        if (typeof result === 'boolean') {
          return created(result);
        } else if (typeof result === 'number') {
          return badRequest(`You have to wait more ${result} seconds to re-send your code`);
        }
      }
      return badRequest('Please provide a mobile Number');
    } catch (err: any) {
      this.logger.error('Cannot ReSend Recover SMS', err);

      return unknownError();
    }
  }
}
