import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { jwtAdapterInstance, pinoAdapterInstance, userRepositoryInstance } from '@shared/container';
import CreateAddressUseCase from '@application/useCases/createAddressUseCase';
import CreateAddressController from '@presentation/controllers/CreateAddressController';

export const createAddressControllerFactory = (): BaseController => {
  const useCase = new CreateAddressUseCase(userRepositoryInstance, jwtAdapterInstance);

  const controller = new CreateAddressController(useCase, pinoAdapterInstance);

  return controller;
};
