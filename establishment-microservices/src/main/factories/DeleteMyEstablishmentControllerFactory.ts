import DeleteMyEstablishmentUseCase from "@usecases/deleteMyEstablishmentUseCase";
import jwtAdapter from "@infra/adapters/jwt-adapter";
import DeleteMyEstablishmentController from "@presentation/controllers/DeleteMyEstablishmentController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";

export const deleteMyEstablishmentControllerFactory = (): BaseController => {
  const jwtadapter = new jwtAdapter();
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new DeleteMyEstablishmentUseCase(establishmentRepository, jwtadapter);

  const controller = new DeleteMyEstablishmentController(useCase);

  return controller;
}