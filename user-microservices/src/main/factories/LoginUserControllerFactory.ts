import { BaseController } from "@presentation/controllers/contracts/BaseController";
import BcryptAdapter from "@infra/adapters/bcrypt-adapter";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import jwtAdapter from "@app/src/infra/adapters/jwt-adapter";
import LoginUserUseCase from "@app/src/application/useCases/loginUserUseCase";
import LoginUserController from "@app/src/presentation/controllers/LoginUserController";

export const loginUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const encoder = new BcryptAdapter();
  const jwtadapter = new jwtAdapter();
  const useCase = new LoginUserUseCase(userRepository, encoder, jwtadapter);

  const controller = new LoginUserController(useCase);

  return controller;
}