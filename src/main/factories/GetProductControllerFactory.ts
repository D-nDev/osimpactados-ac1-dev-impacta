import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, pinoAdapterInstance } from '@shared/container';
import GetProductUseCase from '@application/useCases/getProductUseCase';
import GetProductController from '@presentation/controllers/GetProductController';

export const getProductControllerFactory = (): BaseController => {
  const useCase = new GetProductUseCase(establishmentRepositoryInstance);

  const controller = new GetProductController(useCase, pinoAdapterInstance);

  return controller;
};
