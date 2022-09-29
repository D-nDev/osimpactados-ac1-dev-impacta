import GetUsersUseCase from '@usecases/getUsersUseCase';
import GetUsersController from '@presentation/controllers/GetUsersController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { pinoAdapterInstance, userRepositoryInstance } from '@shared/container';

export const getUsersControllerFactory = (): BaseController => {
  const useCase = new GetUsersUseCase(userRepositoryInstance);

  const controller = new GetUsersController(useCase, pinoAdapterInstance);

  return controller;
};
