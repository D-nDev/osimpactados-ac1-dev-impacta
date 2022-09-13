import { BaseController } from '@presentation/controllers/contracts/BaseController';
import LoginEstablishmentUseCase from '@usecases/loginEstablishmentUseCase';
import LoginEstablishmentController from '@presentation/controllers/LoginEstablishmentController';
import {
  bcryptAdapterInstance,
  establishmentRepositoryInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
} from '@app/shared/container';

export const loginEstablishmentControllerFactory = (): BaseController => {
  const useCase = new LoginEstablishmentUseCase(
    establishmentRepositoryInstance,
    bcryptAdapterInstance,
    jwtAdapterInstance,
  );

  const controller = new LoginEstablishmentController(useCase, pinoAdapterInstance);

  return controller;
};
