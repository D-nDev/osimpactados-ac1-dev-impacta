import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance } from '@app/shared/container';
import BlackListRecoverTokenUseCase from '@app/application/useCases/blackListRecoverTokenUseCase';
import BlackListRecoverTokenController from '@app/presentation/controllers/blackListRecoverTokenController';

export const blackListRecoverTokenControllerFactory = (): BaseController => {
  const useCase = new BlackListRecoverTokenUseCase(establishmentRepositoryInstance);

  const controller = new BlackListRecoverTokenController(useCase);

  return controller;
};
