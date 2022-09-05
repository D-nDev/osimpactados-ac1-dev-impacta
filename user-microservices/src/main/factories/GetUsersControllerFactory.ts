import GetUsersUseCase from "@app/src/application/useCases/getUsersUseCase";
import { Mapper } from "@app/src/infra/mappers/userMapper";
import GetUsersController from "@app/src/presentation/controllers/GetUsersController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";

export const getUsersControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const mapper = new Mapper();
  const useCase = new GetUsersUseCase(userRepository);

  const controller = new GetUsersController(useCase);

  return controller;
}