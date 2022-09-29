import { BaseController } from '@presentation/controllers/contracts/BaseController';
import {
  azureblobAdapterInstance,
  establishmentRepositoryInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
} from '@shared/container';
import PatchProductUseCase from '@app/application/useCases/patchProductUseCase';
import PatchProductController from '@app/presentation/controllers/PatchProductController';

export const patchProductControllerFactory = (): BaseController => {
  const useCase = new PatchProductUseCase(
    establishmentRepositoryInstance,
    azureblobAdapterInstance,
    jwtAdapterInstance,
  );

  const controller = new PatchProductController(useCase, pinoAdapterInstance);

  return controller;
};
