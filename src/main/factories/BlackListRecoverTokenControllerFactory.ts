import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance } from '@shared/container';
import BlackListRecoverTokenUseCase from '@application/useCases/blackListRecoverTokenUseCase';
import BlackListRecoverTokenController from '@presentation/controllers/BlackListRecoverTokenController';

export const blackListRecoverTokenControllerFactory = (): BaseController => {
  const useCase = new BlackListRecoverTokenUseCase(establishmentRepositoryInstance);

  const controller = new BlackListRecoverTokenController(useCase);

  return controller;
};
