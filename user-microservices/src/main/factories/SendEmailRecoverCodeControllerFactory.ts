import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import SendRecoverEmailUseCase from "@application/useCases/sendRecoverEmailUseCase";
import EmailAdapter from "@infra/adapters/email-adapter";
import SendEmailRecoverCodeController from "@presentation/controllers/SendEmailRecoverCodeController";

export const sendEmailRecoverCodeControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const emailadapter = new EmailAdapter();
  const useCase = new SendRecoverEmailUseCase(emailadapter, userRepository);

  const controller = new SendEmailRecoverCodeController(useCase);

  return controller;
}