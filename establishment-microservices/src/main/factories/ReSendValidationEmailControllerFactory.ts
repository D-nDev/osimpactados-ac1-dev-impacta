import { BaseController } from '@presentation/controllers/contracts/BaseController';
import ReSendValidationEmailUseCase from '@usecases/reSendValidationEmailUseCase';
import ReSendValidationEmailController from '@presentation/controllers/ReSendValidationEmailController';
import { emailAdapterInstance, ioredisAdapterInstance, pinoAdapterInstance } from '@shared/container';

export const reSendValidationEmailControllerFactory = (): BaseController => {
  const useCase = new ReSendValidationEmailUseCase(emailAdapterInstance, ioredisAdapterInstance);

  const controller = new ReSendValidationEmailController(useCase, pinoAdapterInstance);

  return controller;
};
