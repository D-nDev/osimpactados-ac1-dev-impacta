import { BaseController } from '@presentation/controllers/contracts/BaseController';
import ChangeEstablishmentPassByEmailUseCase from '@usecases/changeEstablishmentPassByEmailUseCase';
import ChangeEstablishmentPassEmailController from '@presentation/controllers/ChangeEstablishmentPassEmailController';
import {
  bcryptAdapterInstance,
  establishmentRepositoryInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  validatorAdapterInstance,
} from '@shared/container';

export const changeEstablishmentPassEmailControllerFactory = (): BaseController => {
  const emailUseCase = new ChangeEstablishmentPassByEmailUseCase(
    establishmentRepositoryInstance,
    momentAdapterInstance,
    bcryptAdapterInstance,
  );

  const controller = new ChangeEstablishmentPassEmailController(
    emailUseCase,
    validatorAdapterInstance,
    pinoAdapterInstance,
  );

  return controller;
};
