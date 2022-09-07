import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import SendRecoverSMSUseCase from "@app/src/application/useCases/sendRecoverSMSUseCase";
import SendSMSRecoverCodeController from "@app/src/presentation/controllers/SendSMSRecoverCodeController";
import TwilioAdapter from "@app/src/infra/adapters/twilio-adapter";

export const sendSMSRecoverCodeControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const smsadapter = new TwilioAdapter();
  const useCase = new SendRecoverSMSUseCase(smsadapter, userRepository);

  const controller = new SendSMSRecoverCodeController(useCase);

  return controller;
}