import { BaseController } from '@presentation/controllers/contracts/BaseController';
import {
  emailAdapterInstance,
  ioredisAdapterInstance,
  pinoAdapterInstance,
  userRepositoryInstance,
} from '@shared/container';
import ReSendRecoverEmailUseCase from '@usecases/reSendRecoverEmailUseCase';
import ReSendRecoverEmailController from '@presentation/controllers/ReSendRecoverEmailController';

export const reSendRecoverEmailControllerFactory = (): BaseController => {
  const useCase = new ReSendRecoverEmailUseCase(emailAdapterInstance, userRepositoryInstance, ioredisAdapterInstance);

  const controller = new ReSendRecoverEmailController(useCase, pinoAdapterInstance);

  return controller;
};
