import CreateUserUseCase from "@app/src/application/useCases/createUserUseCase";
import { Mapper } from "@app/src/infra/mappers/userMapper";
import CreateUserController from "@app/src/presentation/controllers/CreateUserController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import BcryptAdapter from "../adapters/bcrypt-adapter";
import ValidatorAdapter from "../adapters/classValidator-adapter";
import { createUserRepository } from "./CreateUserRepositoryFactory";

export const createUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const encoder = new BcryptAdapter();
  const mapper = new Mapper();
  const useCase = new CreateUserUseCase(userRepository, encoder, mapper);
  const validator = new ValidatorAdapter();

  const controller = new CreateUserController(useCase, validator);

  return controller;
}