import { BaseController } from "@presentation/controllers/contracts/BaseController";
import BcryptAdapter from "@infra/adapters/bcrypt-adapter";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";
import jwtAdapter from "@infra/adapters/jwt-adapter";
import LoginEstablishmentUseCase from "@usecases/loginEstablishmentUseCase";
import LoginEstablishmentController from "@presentation/controllers/LoginEstablishmentController";

export const loginEstablishmentControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const encoder = new BcryptAdapter();
  const jwtadapter = new jwtAdapter();
  const useCase = new LoginEstablishmentUseCase(establishmentRepository, encoder, jwtadapter);

  const controller = new LoginEstablishmentController(useCase);

  return controller;
}