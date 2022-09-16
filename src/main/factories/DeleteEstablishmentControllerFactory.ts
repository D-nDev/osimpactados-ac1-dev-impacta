import DeleteEstablishmentUseCase from '@usecases/deleteEstablishmentUseCase';
import DeleteEstablishmentController from '@presentation/controllers/DeleteEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, pinoAdapterInstance } from '@shared/container';

export const deleteEstablishmentControllerFactory = (): BaseController => {
  const useCase = new DeleteEstablishmentUseCase(establishmentRepositoryInstance);

  const controller = new DeleteEstablishmentController(useCase, pinoAdapterInstance);

  return controller;
};
