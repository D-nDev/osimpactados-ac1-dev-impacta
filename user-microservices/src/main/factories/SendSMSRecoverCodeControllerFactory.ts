import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createUserRepository } from "./CreateUserRepositoryFactory";
import SendRecoverSMSUseCase from "@application/useCases/sendRecoverSMSUseCase";
import SendSMSRecoverCodeController from "@presentation/controllers/SendSMSRecoverCodeController";
import TwilioAdapter from "@infra/adapters/twilio-adapter";

export const sendSMSRecoverCodeControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const smsadapter = new TwilioAdapter();
  const useCase = new SendRecoverSMSUseCase(smsadapter, userRepository);

  const controller = new SendSMSRecoverCodeController(useCase);

  return controller;
}