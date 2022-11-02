import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { ok, unknownError } from './helpers/httpHelper';

export default class HealthCheckController implements BaseController {
  async handle(): Promise<HttpResponse> {
    try {
      return ok({ health: true });
    } catch (err: any) {
      return unknownError();
    }
  }
}
