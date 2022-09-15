import { BaseController } from '@presentation/controllers/contracts/BaseController';
import CreateProductUseCase from '@usecases/createProductUseCase';
import CreateProductController from '@presentation/controllers/CreateProductController';
import {
  azureblobAdapterInstance,
  establishmentRepositoryInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
  uuidAdapterInstance,
  validatorAdapterInstance,
} from '@shared/container';

export const createProductControllerFactory = (): BaseController => {
  const useCase = new CreateProductUseCase(
    establishmentRepositoryInstance,
    azureblobAdapterInstance,
    jwtAdapterInstance,
    uuidAdapterInstance,
  );

  const controller = new CreateProductController(useCase, pinoAdapterInstance, validatorAdapterInstance);

  return controller;
};
