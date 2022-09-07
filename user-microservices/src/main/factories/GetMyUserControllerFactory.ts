import GetMyUserUseCase from "@app/src/application/useCases/getMyUserUseCase";
import jwtAdapter from "@app/src/infra/adapters/jwt-adapter";
import GetMyUserController from "@app/src/presentation/controllers/GetMyUserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";

export const getMyUserControllerFactory = (): BaseController => {
  const jwtadapter = new jwtAdapter();
  const userRepository = createUserRepository();
  const useCase = new GetMyUserUseCase(userRepository, jwtadapter);

  const controller = new GetMyUserController(useCase);

  return controller;
}