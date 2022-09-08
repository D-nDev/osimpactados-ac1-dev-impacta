import ValidateEstablishmentController from "@presentation/controllers/ValidateEstablishmentController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";
import ValidateEstablishmentUseCase from "@app/src/application/useCases/validateEstablishmentUseCase";

export const validateEstablishmentControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new ValidateEstablishmentUseCase(establishmentRepository);

  const controller = new ValidateEstablishmentController(useCase);

  return controller;
}