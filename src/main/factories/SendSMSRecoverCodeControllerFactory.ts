import { BaseController } from '@presentation/controllers/contracts/BaseController';
import SendRecoverSMSUseCase from '@usecases/sendRecoverSMSUseCase';
import SendSMSRecoverCodeController from '@presentation/controllers/SendSMSRecoverCodeController';
import {
  establishmentRepositoryInstance,
  ioredisAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  twilioAdapterInstance,
} from '@shared/container';

export const sendSMSRecoverCodeControllerFactory = (): BaseController => {
  const useCase = new SendRecoverSMSUseCase(
    twilioAdapterInstance,
    establishmentRepositoryInstance,
    momentAdapterInstance,
    ioredisAdapterInstance,
  );

  const controller = new SendSMSRecoverCodeController(useCase, pinoAdapterInstance);

  return controller;
};
