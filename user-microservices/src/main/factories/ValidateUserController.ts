import ValidateUserController from "@presentation/controllers/ValidateUserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import ValidateUserUseCase from "@application/useCases/validateUserUseCase";
import ValidatorAdapter from "../adapters/classValidator-adapter";

export const validateUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const useCase = new ValidateUserUseCase(userRepository);
  const validate = new ValidatorAdapter();

  const controller = new ValidateUserController(useCase, validate);

  return controller;
}