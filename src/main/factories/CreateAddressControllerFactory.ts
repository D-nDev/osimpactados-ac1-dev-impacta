import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { jwtAdapterInstance, pinoAdapterInstance, userRepositoryInstance } from '@shared/container';
import CreateAddressUseCase from '@app/application/useCases/createAddressUseCase';
import CreateAddressController from '@app/presentation/controllers/CreateAddressController';

export const createAddressControllerFactory = (): BaseController => {
  const useCase = new CreateAddressUseCase(userRepositoryInstance, jwtAdapterInstance);

  const controller = new CreateAddressController(useCase, pinoAdapterInstance);

  return controller;
};
