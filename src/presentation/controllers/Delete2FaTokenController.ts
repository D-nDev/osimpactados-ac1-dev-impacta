import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';

export default class Delete2FaTokenController implements BaseController {
  constructor(private readonly useCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.cookies;
      const execute = await this.useCase.execute(token);

      return ok(execute);
    } catch (err: any) {
      return unknownError();
    }
  }
}
