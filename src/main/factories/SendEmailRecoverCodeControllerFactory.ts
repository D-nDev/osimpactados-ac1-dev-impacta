import { BaseController } from '@presentation/controllers/contracts/BaseController';
import SendRecoverEmailUseCase from '@usecases/sendRecoverEmailUseCase';
import SendEmailRecoverCodeController from '@presentation/controllers/SendEmailRecoverCodeController';
import {
  emailAdapterInstance,
  ioredisAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  userRepositoryInstance,
} from '@shared/container';

export const sendEmailRecoverCodeControllerFactory = (): BaseController => {
  const useCase = new SendRecoverEmailUseCase(
    emailAdapterInstance,
    userRepositoryInstance,
    momentAdapterInstance,
    ioredisAdapterInstance,
  );

  const controller = new SendEmailRecoverCodeController(useCase, pinoAdapterInstance);

  return controller;
};
