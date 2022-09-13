import { useCase } from '@application/ports/useCase';
import { BaseController } from './contracts/BaseController';
import { HttpResponse } from './contracts/httpResponse';
import { badRequest, ok, unknownError } from './helpers/httpHelper';
import { Request } from 'express';
import { IValidator } from './contracts/validator';
import { ValidateUserDto } from '@app/application/ports/dtos/validateUserDto';
import { ValidateUserErrorCodes } from '@shared/enums/ValidateUserErrorCodes';
import { ILoggerAdapter } from '@application/ports/ILoggerAdapter';

export default class ValidateUserController implements BaseController {
  constructor(
    private readonly useCase: useCase,
    private readonly validator: IValidator,
    private readonly logger: ILoggerAdapter,
  ) {}

  async handle(request: Request): Promise<HttpResponse> {
    try {
      const { email, token } = request.body;

      const validate = new ValidateUserDto(email, token);
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
      this.logger.error('Cannot Validate User and create', err);
      const errorType = ValidateUserErrorCodes[err.code || err.name || err.message];

      if (errorType) {
        return badRequest(errorType);
      } else {
        return unknownError();
      }
    }
  }
}
