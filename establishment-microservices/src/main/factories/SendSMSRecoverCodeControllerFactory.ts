import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";
import SendRecoverSMSUseCase from "@app/src/application/useCases/sendRecoverSMSUseCase";
import SendSMSRecoverCodeController from "@app/src/presentation/controllers/SendSMSRecoverCodeController";
import TwilioAdapter from "@app/src/infra/adapters/twilio-adapter";

export const sendSMSRecoverCodeControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const smsadapter = new TwilioAdapter();
  const useCase = new SendRecoverSMSUseCase(smsadapter, establishmentRepository);

  const controller = new SendSMSRecoverCodeController(useCase);

  return controller;
}