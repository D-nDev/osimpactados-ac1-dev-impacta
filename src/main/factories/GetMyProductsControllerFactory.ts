import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, jwtAdapterInstance, pinoAdapterInstance } from '@shared/container';
import GetMyProductsUseCase from '@application/useCases/getMyProductsUseCase';
import GetMyProductsController from '@presentation/controllers/GetMyProductsController';

export const getMyProductsControllerFactory = (): BaseController => {
  const useCase = new GetMyProductsUseCase(establishmentRepositoryInstance, jwtAdapterInstance);

  const controller = new GetMyProductsController(useCase, pinoAdapterInstance);

  return controller;
};
