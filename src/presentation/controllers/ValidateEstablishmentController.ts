import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { IValidator } from './contracts/validator';
import { ValidateEstablishmentDto } from '@app/application/ports/dtos/validateEstablishmentDto';
import { ValidateEstablishmentErrorCodes } from '@shared/enums/ValidateEstablishmentErrorCodes';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class ValidateEstablishmentController implements BaseController {
  constructor(
    private readonly useCase: useCase,
    private readonly validator: IValidator,
    private readonly logger: ILoggerAdapter,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, token } = request.body;

      const validate = new ValidateEstablishmentDto(email, token);
      const validateResult = await this.validator.validate(validate);
      if (validateResult.length > 0) {
        const errors: any = [];
        for (const eacherror in validateResult) {
          errors.push(validateResult[eacherror].constraints);
        }
        return badRequest(errors);
      }

      const result = await this.useCase.execute({ email, token });

      if (result) {
        return ok(true);
      } else {
        return badRequest('Expired or invalid validate code');
      }
    } catch (err: any) {
      this.logger.error('Cannot Validate Establishment and create', err);
      const errorType = ValidateEstablishmentErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
