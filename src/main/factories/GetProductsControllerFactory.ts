import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, pinoAdapterInstance } from '@shared/container';
import GetProductsUseCase from '@application/useCases/getProductsUseCase';
import GetProductsController from '@presentation/controllers/GetProductsController';

export const getProductsControllerFactory = (): BaseController => {
  const useCase = new GetProductsUseCase(establishmentRepositoryInstance);

  const controller = new GetProductsController(useCase, pinoAdapterInstance);

  return controller;
};
