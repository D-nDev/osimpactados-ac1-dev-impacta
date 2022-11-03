import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { PurchaseDataDto } from '@application/ports/dtos/purchaseDataDto';
import { IValidator } from './contracts/validator';

export default class CreateUserPurchaseController implements BaseController {
  constructor(
    private readonly useCase: useCase,
    private readonly validator: IValidator,
    private readonly logger: ILoggerAdapter,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { token } = request.headers;
      const { metadata, items } = request.body;

      const UserPurchaseDto = new PurchaseDataDto(metadata, items);

      const result = await this.validator.validate(UserPurchaseDto);
      if (result.length > 0) {
        const errors: any = [];
        for (const eacherror in result) {
          errors.push(result[eacherror].constraints);
        }
        return badRequest(errors);
      }

      const execute = await this.useCase.execute(token, request.body);

      return ok(execute);
    } catch (err: any) {
      this.logger.error('Cannot Create User Purchase', err);
      return unknownError();
    }
  }
}
