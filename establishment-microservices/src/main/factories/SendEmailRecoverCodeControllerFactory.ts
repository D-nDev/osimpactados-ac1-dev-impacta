import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";
import SendRecoverEmailUseCase from "@app/src/application/useCases/sendRecoverEmailUseCase";
import EmailAdapter from "@app/src/infra/adapters/email-adapter";
import SendEmailRecoverCodeController from "@app/src/presentation/controllers/SendEmailRecoverCodeController";

export const sendEmailRecoverCodeControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const emailadapter = new EmailAdapter();
  const useCase = new SendRecoverEmailUseCase(emailadapter, establishmentRepository);

  const controller = new SendEmailRecoverCodeController(useCase);

  return controller;
}