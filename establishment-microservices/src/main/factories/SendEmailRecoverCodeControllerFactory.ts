import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import SendRecoverEmailUseCase from "@app/src/application/useCases/sendRecoverEmailUseCase";
import EmailAdapter from "@app/src/infra/adapters/email-adapter";
import SendEmailRecoverCodeController from "@app/src/presentation/controllers/SendEmailRecoverCodeController";

export const sendEmailRecoverCodeControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const emailadapter = new EmailAdapter();
  const useCase = new SendRecoverEmailUseCase(emailadapter, userRepository);

  const controller = new SendEmailRecoverCodeController(useCase);

  return controller;
}