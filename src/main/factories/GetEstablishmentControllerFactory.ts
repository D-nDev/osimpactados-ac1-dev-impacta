import GetEstablishmentUseCase from '@usecases/getEstablishmentUseCase';
import GetEstablishmentController from '@presentation/controllers/GetEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, pinoAdapterInstance } from '@shared/container';

export const getEstablishmentControllerFactory = (): BaseController => {
  const useCase = new GetEstablishmentUseCase(establishmentRepositoryInstance);

  const controller = new GetEstablishmentController(useCase, pinoAdapterInstance);

  return controller;
};
