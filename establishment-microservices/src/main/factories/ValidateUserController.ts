import ValidateUserController from "@presentation/controllers/ValidateUserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import ValidateUserUseCase from "@app/src/application/useCases/validateUserUseCase";

export const validateUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const useCase = new ValidateUserUseCase(userRepository);

  const controller = new ValidateUserController(useCase);

  return controller;
}