import GetMyEstablishmentUseCase from '@usecases/getMyEstablishmentUseCase';
import JwtAdapter from '@infra/adapters/jwt-adapter';
import GetMyEstablishmentController from '@presentation/controllers/GetMyEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { createEstablishmentRepository } from './CreateEstablishmentRepositoryFactory';

export const getMyEstablishmentControllerFactory = (): BaseController => {
  const jwtadapter = new JwtAdapter();
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new GetMyEstablishmentUseCase(establishmentRepository, jwtadapter);

  const controller = new GetMyEstablishmentController(useCase);

  return controller;
};
