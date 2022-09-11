import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import ChangeUserPassByEmailUseCase from "@usecases/changeUserPassByEmailUseCase";
import ChangeUserPassController from "@presentation/controllers/ChangeUserPassController";
import ChangeUserPassByMobileNumberUseCase from "@usecases/changeUserPassByMobileNumberUseCase";
import BcryptAdapter from "@infra/adapters/bcrypt-adapter";
import ValidatorAdapter from "../adapters/classValidator-adapter";

export const changeUserPassControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const emailUseCase = new ChangeUserPassByEmailUseCase(userRepository);
  const numberUseCase = new ChangeUserPassByMobileNumberUseCase(userRepository);
  const bcryptHash = new BcryptAdapter();
  const validator = new ValidatorAdapter();

  const controller = new ChangeUserPassController(emailUseCase, numberUseCase, validator, bcryptHash);

  return controller;
}