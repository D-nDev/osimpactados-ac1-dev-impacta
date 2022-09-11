import { BaseController } from '@presentation/controllers/contracts/BaseController';
import BcryptAdapter from '@infra/adapters/bcrypt-adapter';
import { createUserRepository } from './CreateUserRepositoryFactory';
import JwtAdapter from '@infra/adapters/jwt-adapter';
import LoginUserUseCase from '@application/useCases/loginUserUseCase';
import LoginUserController from '@presentation/controllers/LoginUserController';

export const loginUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const encoder = new BcryptAdapter();
  const jwtadapter = new JwtAdapter();
  const useCase = new LoginUserUseCase(userRepository, encoder, jwtadapter);

  const controller = new LoginUserController(useCase);

  return controller;
};
