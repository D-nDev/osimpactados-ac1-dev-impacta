import GetEstablishmentUseCase from "@app/src/application/useCases/getEstablishmentUseCase";
import GetEstablishmentController from "@app/src/presentation/controllers/GetEstablishmentController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";

export const getEstablishmentControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new GetEstablishmentUseCase(establishmentRepository);

  const controller = new GetEstablishmentController(useCase);

  return controller;
}