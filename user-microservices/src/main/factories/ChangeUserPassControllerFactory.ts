import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import ChangeUserPassByEmailUseCase from "@app/src/application/useCases/changeUserPassByEmailUseCase";
import ChangeUserPassController from "@app/src/presentation/controllers/ChangeUserPassController";
import ChangeUserPassByMobileNumberUseCase from "@app/src/application/useCases/changeUserPassByMobileNumberUseCase";
import BcryptAdapter from "@app/src/infra/adapters/bcrypt-adapter";

export const changeUserPassControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const emailUseCase = new ChangeUserPassByEmailUseCase(userRepository);
  const numberUseCase = new ChangeUserPassByMobileNumberUseCase(userRepository);
  const bcryptHash = new BcryptAdapter();

  const controller = new ChangeUserPassController(emailUseCase, numberUseCase, bcryptHash);

  return controller;
}