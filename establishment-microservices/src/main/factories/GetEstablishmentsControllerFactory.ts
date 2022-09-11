import GetEstablishmentsUseCase from "@usecases/getEstablishmentsUseCase";
import GetEstablishmentsController from "@presentation/controllers/GetEstablishmentsController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";

export const getEstablishmentsControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new GetEstablishmentsUseCase(establishmentRepository);

  const controller = new GetEstablishmentsController(useCase);

  return controller;
}