import GetUserUseCase from "@app/src/application/useCases/getUserUseCase";
import GetUserController from "@app/src/presentation/controllers/GetUserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";

export const getUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const useCase = new GetUserUseCase(userRepository);

  const controller = new GetUserController(useCase);

  return controller;
}