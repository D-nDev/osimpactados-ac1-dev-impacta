import { BaseController } from '@presentation/controllers/contracts/BaseController';
import {
  ioredisAdapterInstance,
  pinoAdapterInstance,
  twilioAdapterInstance,
  userRepositoryInstance,
} from '@shared/container';
import ReSendRecoverSMSUseCase from '@usecases/reSendRecoverSMSUseCase';
import ReSendRecoverSMSController from '@presentation/controllers/ReSendRecoverSMSController';

export const reSendRecoverSMSControllerFactory = (): BaseController => {
  const useCase = new ReSendRecoverSMSUseCase(twilioAdapterInstance, userRepositoryInstance, ioredisAdapterInstance);

  const controller = new ReSendRecoverSMSController(useCase, pinoAdapterInstance);

  return controller;
};
