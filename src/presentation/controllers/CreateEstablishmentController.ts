import { EstablishmentDto } from '@application/ports/dtos/establishmentDto';
import { useCase } from '@application/ports/useCase';
import { CreateEstablishmentErrorCodes } from '@shared/enums/CreateEstablishmentErrorCodes';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { IValidator } from './contracts/validator';
import { badRequest, created, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class CreateEstablishmentController implements BaseController {
  constructor(
    private readonly useCase: useCase,
    private readonly validator: IValidator,
    private readonly sendemailUseCase: useCase,
    private readonly logger: ILoggerAdapter,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, name, mobileNumber, subsidiaries, password, cnpj } = request.body;

      const establishment = new EstablishmentDto(email, name, mobileNumber, subsidiaries, password, cnpj);
      const result = await this.validator.validate(establishment);
      if (result.length > 0) {
        const errors: any = [];
        for (const eacherror in result) {
          errors.push(result[eacherror].constraints);
        }
        return badRequest(errors);
      }

      const execute = await this.useCase.execute(establishment);
      await this.sendemailUseCase.execute({ to: execute.email, token: execute.token });
      return created({ email: execute.email });
    } catch (err: any) {
      this.logger.error('Cannot Create new establishment', err);
      const errorType = CreateEstablishmentErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
