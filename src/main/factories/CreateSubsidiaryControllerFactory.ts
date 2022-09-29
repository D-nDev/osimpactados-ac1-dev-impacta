import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, jwtAdapterInstance, pinoAdapterInstance } from '@shared/container';
import CreateSubsidiaryUseCase from '@app/application/useCases/createSubsidiaryUseCase';
import CreateSubsidiaryController from '@app/presentation/controllers/CreateSubsidiaryController';

export const createSubsidiaryControllerFactory = (): BaseController => {
  const useCase = new CreateSubsidiaryUseCase(establishmentRepositoryInstance, jwtAdapterInstance);

  const controller = new CreateSubsidiaryController(useCase, pinoAdapterInstance);

  return controller;
};
