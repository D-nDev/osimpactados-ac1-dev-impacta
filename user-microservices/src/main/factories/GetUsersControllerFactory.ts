import GetUsersUseCase from '@application/useCases/getUsersUseCase';
import GetUsersController from '@presentation/controllers/GetUsersController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { createUserRepository } from './CreateUserRepositoryFactory';

export const getUsersControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const useCase = new GetUsersUseCase(userRepository);

  const controller = new GetUsersController(useCase);

  return controller;
};
