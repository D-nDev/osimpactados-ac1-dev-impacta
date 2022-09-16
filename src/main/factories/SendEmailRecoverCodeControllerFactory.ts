import { BaseController } from '@presentation/controllers/contracts/BaseController';
import SendRecoverEmailUseCase from '@usecases/sendRecoverEmailUseCase';
import SendEmailRecoverCodeController from '@presentation/controllers/SendEmailRecoverCodeController';
import {
  emailAdapterInstance,
  establishmentRepositoryInstance,
  ioredisAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
} from '@shared/container';

export const sendEmailRecoverCodeControllerFactory = (): BaseController => {
  const useCase = new SendRecoverEmailUseCase(
    emailAdapterInstance,
    establishmentRepositoryInstance,
    momentAdapterInstance,
    ioredisAdapterInstance,
  );

  const controller = new SendEmailRecoverCodeController(useCase, pinoAdapterInstance);

  return controller;
};
