import { BaseController } from '@presentation/controllers/contracts/BaseController';
import SendRecoverSMSUseCase from '@usecases/sendRecoverSMSUseCase';
import SendSMSRecoverCodeController from '@presentation/controllers/SendSMSRecoverCodeController';
import {
  ioredisAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  twilioAdapterInstance,
  userRepositoryInstance,
} from '@shared/container';

export const sendSMSRecoverCodeControllerFactory = (): BaseController => {
  const useCase = new SendRecoverSMSUseCase(
    twilioAdapterInstance,
    userRepositoryInstance,
    momentAdapterInstance,
    ioredisAdapterInstance,
  );

  const controller = new SendSMSRecoverCodeController(useCase, pinoAdapterInstance);

  return controller;
};
