import CreateEstablishmentUseCase from "@app/src/application/useCases/createEstablishmentUseCase";
import { Mapper } from "@app/src/infra/mappers/establishmentMapper";
import CreateEstablishmentController from "@app/src/presentation/controllers/CreateEstablishmentController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import BcryptAdapter from "@infra/adapters/bcrypt-adapter";
import ValidatorAdapter from "../adapters/classValidator-adapter";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";
import SendValidationEmailUseCase from "@app/src/application/useCases/sendValidationEmailUseCase";
import EmailAdapter from "@app/src/infra/adapters/email-adapter";

export const createEstablishmentControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const encoder = new BcryptAdapter();
  const mailadapter = new EmailAdapter();
  const mapper = new Mapper();
  const useCase = new CreateEstablishmentUseCase(establishmentRepository, encoder, mapper);
  const emailUseCase = new SendValidationEmailUseCase(mailadapter, establishmentRepository);
  const validator = new ValidatorAdapter();

  const controller = new CreateEstablishmentController(useCase, validator, emailUseCase);

  return controller;
}