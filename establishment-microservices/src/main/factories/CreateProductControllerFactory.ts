import { BaseController } from '@presentation/controllers/contracts/BaseController';
import CreateProductUseCase from '@usecases/createProductUseCase';
import CreateProductController from '@presentation/controllers/CreateProductController';
import { establishmentRepositoryInstance } from '@app/shared/container';

export const createProductControllerFactory = (): BaseController => {
  const useCase = new CreateProductUseCase(establishmentRepositoryInstance);

  const controller = new CreateProductController(useCase);

  return controller;
};
