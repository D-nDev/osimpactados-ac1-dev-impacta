import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, serverError } from './helpers/httpHelper';
import { Request } from 'express';
import { IValidator } from './contracts/validator';
import { validateUserDto } from '@app/src/application/ports/validateUserDto';

export default class ValidateUserController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly validator: IValidator) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, token } = request.body;

      const validate = new validateUserDto(email, token);
      const validateResult = await this.validator.validate(validate);
      if (validateResult.length > 0) {
        const errors: any = [];
        for (const key in validateResult) {
          const values = Object.values(validateResult[key].constraints!);
          errors.push(values.toString());
        }
        return badRequest(errors);
      }
      
      const result = await this.useCase.execute(email, token);

      if(result) {
        return ok(true);
      } else {
        return badRequest("Expired or invalid validate code");
      }

    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
