import ValidateEstablishmentController from '@presentation/controllers/ValidateEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { createEstablishmentRepository } from './CreateEstablishmentRepositoryFactory';
import ValidateEstablishmentUseCase from '@usecases/validateEstablishmentUseCase';
import ValidatorAdapter from '../adapters/classValidator-adapter';

export const validateEstablishmentControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const useCase = new ValidateEstablishmentUseCase(establishmentRepository);
  const validator = new ValidatorAdapter();

  const controller = new ValidateEstablishmentController(useCase, validator);

  return controller;
};
