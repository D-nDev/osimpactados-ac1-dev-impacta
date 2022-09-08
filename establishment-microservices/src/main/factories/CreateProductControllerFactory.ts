import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";
import CreateProductUseCase from "@app/src/application/useCases/createProductUseCase";
import CreateProductController from "@app/src/presentation/controllers/CreateProductController";

export const createProductControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new CreateProductUseCase(establishmentRepository);

  const controller = new CreateProductController(useCase);

  return controller;
}