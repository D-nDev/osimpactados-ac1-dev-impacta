import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export class CreatePreferenceController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const execute = await this.useCase.execute(request.body);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Create Purchase Preference', err);
      return unknownError();
    }
  }
}
