import DeleteMyEstablishmentUseCase from '@usecases/deleteMyEstablishmentUseCase';
import DeleteMyEstablishmentController from '@presentation/controllers/DeleteMyEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, jwtAdapterInstance, pinoAdapterInstance } from '@app/shared/container';

export const deleteMyEstablishmentControllerFactory = (): BaseController => {
  const useCase = new DeleteMyEstablishmentUseCase(establishmentRepositoryInstance, jwtAdapterInstance);

  const controller = new DeleteMyEstablishmentController(useCase, pinoAdapterInstance);

  return controller;
};
