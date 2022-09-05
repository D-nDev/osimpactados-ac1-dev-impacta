import { userDto } from '@app/src/application/ports/userDto';
import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { IValidator } from './contracts/validator';
import { badRequest, created, serverError } from './helpers/httpHelper';

export default class CreateUserController implements BaseController {
  constructor(private readonly useCase: useCase, private readonly validator: IValidator) {}

  async handle(request: Record<string, any>): Promise<HttpResponse> {
    try {
      const { email, name, mobileNumber, addresses, password, cpf } = request.body;

      const user = new userDto(email, name, mobileNumber, addresses, password, cpf);
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

      return created(execute);
    } catch (err: any) {
      return serverError(err.message || 'Unexpected error');
    }
  }
}
