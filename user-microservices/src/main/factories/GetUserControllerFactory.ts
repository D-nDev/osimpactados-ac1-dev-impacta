import GetUserUseCase from '@usecases/getUserUseCase';
import GetUserController from '@presentation/controllers/GetUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { pinoAdapterInstance, userRepositoryInstance } from '@shared/container';

export const getUserControllerFactory = (): BaseController => {
  const useCase = new GetUserUseCase(userRepositoryInstance);

  const controller = new GetUserController(useCase, pinoAdapterInstance);

  return controller;
};
