import DeleteEstablishmentUseCase from '@usecases/deleteEstablishmentUseCase';
import DeleteEstablishmentController from '@presentation/controllers/DeleteEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { createEstablishmentRepository } from './CreateEstablishmentRepositoryFactory';

export const deleteEstablishmentControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new DeleteEstablishmentUseCase(establishmentRepository);

  const controller = new DeleteEstablishmentController(useCase);

  return controller;
};
