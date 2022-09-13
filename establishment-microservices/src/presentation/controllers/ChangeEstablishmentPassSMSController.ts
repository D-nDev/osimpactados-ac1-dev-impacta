import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { IValidator } from './contracts/validator';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';
import { RecoverEstablishmentPassErrorCodes } from '@shared/enums/RecoverEstablishmentPassErrorCodes';
import { ChangePassDtoSMS } from '@application/ports/dtos/changePassDtoSMS';

export default class ChangeEstablishmentPassSMSController implements BaseController {
  constructor(
    private readonly smsUseCase: useCase,
    private readonly validator: IValidator,
    private readonly logger: ILoggerAdapter,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { mobileNumber, token, password } = request.body;

      const validate = new ChangePassDtoSMS(mobileNumber, token, password);
      const result = await this.validator.validate(validate);

      if (result.length > 0) {
        const errors: any = [];
        for (const eacherror in result) {
          errors.push(result[eacherror].constraints);
        }
        return badRequest(errors);
      }

      await this.smsUseCase.execute({ mobileNumber, token, password });

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
