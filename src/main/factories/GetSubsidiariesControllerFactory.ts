import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, pinoAdapterInstance } from '@shared/container';
import GetSubsidiariesUseCase from '@app/application/useCases/getSubsidiariesUseCase';
import GetSubsidiariesController from '@app/presentation/controllers/GetSubsidiariesController';

export const getSubsidiariesControllerFactory = (): BaseController => {
  const useCase = new GetSubsidiariesUseCase(establishmentRepositoryInstance);

  const controller = new GetSubsidiariesController(useCase, pinoAdapterInstance);

  return controller;
};
