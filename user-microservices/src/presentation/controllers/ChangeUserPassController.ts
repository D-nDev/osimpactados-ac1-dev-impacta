import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, serverError } from './helpers/httpHelper';
import { Request } from 'express';
import { bcryptEncoder } from '@application/ports/bcrypt';
import { IValidator } from './contracts/validator';
import { changePassDto } from '@application/ports/changePassDto';
import { ILoggerAdapter } from '@app/application/ports/ILoggerAdapter';

export default class ChangeUserPassController implements BaseController {
  constructor(
    private readonly emailUseCase: useCase,
    private readonly numberUseCase: useCase,
    private readonly validator: IValidator,
    private readonly encoder: bcryptEncoder,
    private readonly logger: ILoggerAdapter,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { mobileNumber, email, token, password } = request.body;
      let execute: any;

      const validate = new changePassDto(mobileNumber, email, token, password);
      const result = await this.validator.validate(validate);
      if (result.length > 0) {
        const errors: any = [];
        for (const key in result) {
          const values = Object.values(result[key].constraints!);
          errors.push(values.toString());
        }
        return badRequest(errors);
      }

      if (mobileNumber) {
        execute = await this.numberUseCase.execute(mobileNumber, token, password, this.encoder);
      } else if (email) {
        execute = await this.emailUseCase.execute(email, token, password, this.encoder);
      } else if (email && mobileNumber) {
        execute = await this.emailUseCase.execute(email, token, password, this.encoder);
      }

      if (execute) {
        return ok(true);
      } else {
        return badRequest('Expired or invalid recover code/email');
      }
    } catch (err: any) {
      this.logger.error('Cannot Update User password', err);
      return serverError(err.message || 'Unexpected error');
    }
  }
}
