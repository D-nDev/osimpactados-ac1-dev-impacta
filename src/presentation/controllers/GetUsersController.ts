import { ILoggerAdapter } from '@app/application/ports/ILoggerAdapter';
import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, unknownError } from './helpers/httpHelper';

export default class GetUsersController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly logger: ILoggerAdapter) {}

  async handle(): Promise<HttpResponse> {
    try {
      const execute = await this.useCase.execute();

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Get Users', err);
      return unknownError();
    }
  }
}
