import DeleteUserUseCase from "@app/src/application/useCases/deleteUserUseCase";
import DeleteUserController from "@app/src/presentation/controllers/DeleteUserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";

export const deleteUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const useCase = new DeleteUserUseCase(userRepository);

  const controller = new DeleteUserController(useCase);

  return controller;
}