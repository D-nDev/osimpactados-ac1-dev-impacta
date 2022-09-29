import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, jwtAdapterInstance, pinoAdapterInstance } from '@shared/container';
import DeleteProductUseCase from '@app/application/useCases/deleteProductUseCase';
import DeleteProductController from '@app/presentation/controllers/DeleteProductController';

export const deleteProductControllerFactory = (): BaseController => {
  const useCase = new DeleteProductUseCase(establishmentRepositoryInstance, jwtAdapterInstance);

  const controller = new DeleteProductController(useCase, pinoAdapterInstance);

  return controller;
};
