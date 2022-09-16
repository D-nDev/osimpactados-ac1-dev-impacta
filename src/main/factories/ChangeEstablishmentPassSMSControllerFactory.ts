import { BaseController } from '@presentation/controllers/contracts/BaseController';
import ChangeEstablishmentPassSMSUseCase from '@usecases/changeEstablishmentPassBySMSUseCase';
import ChangeEstablishmentPassSMSController from '@presentation/controllers/ChangeEstablishmentPassSMSController';
import {
  bcryptAdapterInstance,
  establishmentRepositoryInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  validatorAdapterInstance,
} from '@shared/container';

export const changeEstablishmentPassSMSControllerFactory = (): BaseController => {
  const emailUseCase = new ChangeEstablishmentPassSMSUseCase(
    establishmentRepositoryInstance,
    momentAdapterInstance,
    bcryptAdapterInstance,
  );

  const controller = new ChangeEstablishmentPassSMSController(
    emailUseCase,
    validatorAdapterInstance,
    pinoAdapterInstance,
  );

  return controller;
};
