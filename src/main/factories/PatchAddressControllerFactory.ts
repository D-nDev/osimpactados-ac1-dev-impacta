import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { jwtAdapterInstance, pinoAdapterInstance, userRepositoryInstance } from '@shared/container';
import PatchAddressUseCase from '@app/application/useCases/patchAddressUseCase';
import PatchAddressController from '@app/presentation/controllers/PatchAddressController';

export const patchAddressControllerFactory = (): BaseController => {
  const useCase = new PatchAddressUseCase(userRepositoryInstance, jwtAdapterInstance);

  const controller = new PatchAddressController(useCase, pinoAdapterInstance);

  return controller;
};
