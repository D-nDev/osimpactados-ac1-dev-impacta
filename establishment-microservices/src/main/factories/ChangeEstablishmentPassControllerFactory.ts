import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";
import ChangeEstablishmentPassByEmailUseCase from "@app/src/application/useCases/changeEstablishmentPassByEmailUseCase";
import ChangeEstablishmentPassController from "@app/src/presentation/controllers/ChangeEstablishmentPassController";
import ChangeEstablishmentPassByMobileNumberUseCase from "@app/src/application/useCases/changeEstablishmentPassByMobileNumberUseCase";
import BcryptAdapter from "@app/src/infra/adapters/bcrypt-adapter";

export const changeEstablishmentPassControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const emailUseCase = new ChangeEstablishmentPassByEmailUseCase(establishmentRepository);
  const numberUseCase = new ChangeEstablishmentPassByMobileNumberUseCase(establishmentRepository);
  const bcryptHash = new BcryptAdapter();

  const controller = new ChangeEstablishmentPassController(emailUseCase, numberUseCase, bcryptHash);

  return controller;
}