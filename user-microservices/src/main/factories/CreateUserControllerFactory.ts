import CreateUserUseCase from "@app/src/application/useCases/createUserUseCase";
import CreateUserController from "@app/src/presentation/controllers/UserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import BcryptAdapter from "../adapters/bcrypt-adapter";
import ValidatorAdapter from "../adapters/classValidator-adapter";
import { createUserRepository } from "./CreateUserRepositoryFactory";

export const createUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const encoder = new BcryptAdapter();
  const useCase = new CreateUserUseCase(userRepository, encoder);
  const validator = new ValidatorAdapter();

  const controller = new CreateUserController(useCase, validator);

  return controller;
}