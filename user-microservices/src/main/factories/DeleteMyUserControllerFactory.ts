import DeleteMyUserUseCase from '@usecases/deleteMyUserUseCase';
import JwtAdapter from '@infra/adapters/jwt-adapter';
import DeleteMyUserController from '@presentation/controllers/DeleteMyUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { createUserRepository } from './CreateUserRepositoryFactory';

export const deleteMyUserControllerFactory = (): BaseController => {
  const jwtadapter = new JwtAdapter();
  const userRepository = createUserRepository();
  const useCase = new DeleteMyUserUseCase(userRepository, jwtadapter);

  const controller = new DeleteMyUserController(useCase);

  return controller;
};
