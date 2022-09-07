import DeleteMyUserUseCase from "@app/src/application/useCases/deleteMyUserUseCase";
import jwtAdapter from "@app/src/infra/adapters/jwt-adapter";
import DeleteMyUserController from "@app/src/presentation/controllers/DeleteMyUserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";

export const deleteMyUserControllerFactory = (): BaseController => {
  const jwtadapter = new jwtAdapter();
  const userRepository = createUserRepository();
  const useCase = new DeleteMyUserUseCase(userRepository, jwtadapter);

  const controller = new DeleteMyUserController(useCase);

  return controller;
}