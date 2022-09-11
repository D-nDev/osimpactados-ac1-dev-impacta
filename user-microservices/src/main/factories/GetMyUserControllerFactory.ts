import GetMyUserUseCase from '@usecases/getMyUserUseCase';
import JwtAdapter from '@infra/adapters/jwt-adapter';
import GetMyUserController from '@presentation/controllers/GetMyUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { createUserRepository } from './CreateUserRepositoryFactory';

export const getMyUserControllerFactory = (): BaseController => {
  const jwtadapter = new JwtAdapter();
  const userRepository = createUserRepository();
  const useCase = new GetMyUserUseCase(userRepository, jwtadapter);

  const controller = new GetMyUserController(useCase);

  return controller;
};
