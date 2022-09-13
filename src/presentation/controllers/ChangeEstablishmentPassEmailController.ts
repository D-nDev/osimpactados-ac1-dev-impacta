import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { IValidator } from './contracts/validator';
import { ChangePassDtoEmail } from '@app/application/ports/dtos/changePassDtoEmail';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { RecoverEstablishmentPassErrorCodes } from '@shared/enums/RecoverEstablishmentPassErrorCodes';

export default class ChangeEstablishmentPassEmailController implements BaseController {
  constructor(
    private readonly emailUseCase: useCase,
    private readonly validator: IValidator,
    private readonly logger: ILoggerAdapter,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, token, password } = request.body;

      const validate = new ChangePassDtoEmail(email, token, password);
      const result = await this.validator.validate(validate);

      if (result.length > 0) {
        const errors: any = [];
        for (const eacherror in result) {
          errors.push(result[eacherror].constraints);
        }
        return badRequest(errors);
      }

      await this.emailUseCase.execute({ email, token, password });

      return ok(true);
    } catch (err: any) {
      this.logger.error('Cannot Update Establishment password', err);
      const errorType = RecoverEstablishmentPassErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
