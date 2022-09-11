import { UserDto } from '@application/ports/userDto';
import { useCase } from '@application/ports/useCase';
import { CreateUserErrors } from '../errors/CreateUserErrorsEnum';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { IValidator } from './contracts/validator';
import { badRequest, created, serverError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@app/application/ports/ILoggerAdapter';

export default class CreateUserController implements BaseController {
  constructor(
    private readonly useCase: useCase,
    private readonly validator: IValidator,
    private readonly validateUseCase: useCase,
    private readonly logger: ILoggerAdapter,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, name, mobileNumber, addresses, password, cpf } = request.body;

      const user = new UserDto(email, name, mobileNumber, addresses, password, cpf);
      const result = await this.validator.validate(user);
      if (result.length > 0) {
        const errors: any = [];
        for (const key in result) {
          const values = Object.values(result[key].constraints!);
          errors.push(values.toString());
        }
        return badRequest(errors);
      }

      const execute = await this.useCase.execute(user);
      if (execute) {
        const validateEmail = await this.validateUseCase.execute(execute.email);
        if (validateEmail) {
          return created(execute);
        } else {
          return serverError('Cannot send validation account code');
        }
      } else {
        return badRequest('Account already exists');
      }
    } catch (err: any) {
      this.logger.error('Cannot Create new user', err);
      const errorType = CreateUserErrors[err.code];

      if (errorType) {
        return badRequest(CreateUserErrors[err.code]);
      } else if (!errorType && err.message) {
        return serverError(err.message);
      } else {
        return serverError('Unknown server error');
      }
    }
  }
}
