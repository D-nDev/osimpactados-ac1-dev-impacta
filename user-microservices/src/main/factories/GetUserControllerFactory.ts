import GetUserUseCase from "@usecases/getUserUseCase";
import GetUserController from "@presentation/controllers/GetUserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";

export const getUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const useCase = new GetUserUseCase(userRepository);

  const controller = new GetUserController(useCase);

  return controller;
}