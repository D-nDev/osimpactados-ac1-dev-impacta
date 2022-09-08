import GetEstablishmentsUseCase from "@app/src/application/useCases/getEstablishmentsUseCase";
import GetEstablishmentsController from "@app/src/presentation/controllers/GetEstablishmentsController";
import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";

export const getEstablishmentsControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new GetEstablishmentsUseCase(establishmentRepository);

  const controller = new GetEstablishmentsController(useCase);

  return controller;
}