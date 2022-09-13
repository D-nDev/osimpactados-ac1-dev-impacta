import GetMyUserUseCase from '@usecases/getMyUserUseCase';
import GetMyUserController from '@presentation/controllers/GetMyUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { jwtAdapterInstance, pinoAdapterInstance, userRepositoryInstance } from '@shared/container';

export const getMyUserControllerFactory = (): BaseController => {
  const useCase = new GetMyUserUseCase(userRepositoryInstance, jwtAdapterInstance);

  const controller = new GetMyUserController(useCase, pinoAdapterInstance);

  return controller;
};
