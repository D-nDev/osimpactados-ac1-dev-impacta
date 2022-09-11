import { establishmentDto } from '@application/ports/establishmentDto';
import { useCase } from '@application/ports/useCase';
import { CreateEstablishmentErrors } from '../errors/CreateEstablishmentErrorsEnum';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { IValidator } from './contracts/validator';
import { badRequest, created, serverError } from './helpers/httpHelper';
import { Request } from 'express';

export default class CreateEstablishmentController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly validator: IValidator, private readonly validateUseCase: useCase) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, name, mobileNumber, subsidiaries, password, cnpj } = request.body;

      const establishment = new establishmentDto(email, name, mobileNumber, subsidiaries, password, cnpj);
      const result = await this.validator.validate(establishment);
      if (result.length > 0) {
        const errors: any = [];
        for (const key in result) {
          const values = Object.values(result[key].constraints!);
          errors.push(values.toString());
        }
        return badRequest(errors);
      }

      const execute = await this.useCase.execute(establishment);
      if (!!execute) {
        const validateEmail = await this.validateUseCase.execute(execute.email);
        if (validateEmail) {
          return created(execute);
        } else {
          return serverError('Cannot send validation account code');
        }
      } else {
        return badRequest("Account already exists");
      }
    } catch (err: any) {
      console.log(err);
      const errorType = CreateEstablishmentErrors[err.code];

      if (!!errorType) {
        return badRequest(CreateEstablishmentErrors[err.code]);
      } else if (!errorType && err.message) {
        return serverError(err.message);
      } else {
        return serverError('Unknown server error');
      }
    }
  }
}
