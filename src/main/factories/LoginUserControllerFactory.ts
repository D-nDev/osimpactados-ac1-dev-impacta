import { BaseController } from '@presentation/controllers/contracts/BaseController';
import LoginUserUseCase from '@usecases/loginUserUseCase';
import LoginUserController from '@presentation/controllers/LoginUserController';
import {
  bcryptAdapterInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
  userRepositoryInstance,
} from '@shared/container';

export const loginUserControllerFactory = (): BaseController => {
  const useCase = new LoginUserUseCase(userRepositoryInstance, bcryptAdapterInstance, jwtAdapterInstance);

  const controller = new LoginUserController(useCase, pinoAdapterInstance);

  return controller;
};
