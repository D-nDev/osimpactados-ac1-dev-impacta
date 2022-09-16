import GetMyEstablishmentUseCase from '@usecases/getMyEstablishmentUseCase';
import GetMyEstablishmentController from '@presentation/controllers/GetMyEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, jwtAdapterInstance, pinoAdapterInstance } from '@shared/container';

export const getMyEstablishmentControllerFactory = (): BaseController => {
  const useCase = new GetMyEstablishmentUseCase(establishmentRepositoryInstance, jwtAdapterInstance);

  const controller = new GetMyEstablishmentController(useCase, pinoAdapterInstance);

  return controller;
};
