import { BaseController } from "@presentation/controllers/contracts/BaseController";
import { createEstablishmentRepository } from "./CreateEstablishmentRepositoryFactory";
import CreateProductUseCase from "@usecases/createProductUseCase";
import CreateProductController from "@presentation/controllers/CreateProductController";

export const createProductControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new CreateProductUseCase(establishmentRepository);

  const controller = new CreateProductController(useCase);

  return controller;
}