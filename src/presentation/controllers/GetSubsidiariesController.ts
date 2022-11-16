import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';

export default class GetSubsidiariesController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      const execute = await this.useCase.execute(id);

      if (execute) {
        return ok(execute);
      } else {
        return ok([]);
      }
    } catch (err: any) {
      this.logger.error('Cannot Get Establishments', err);
      return unknownError();
    }
  }
}
