import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { pinoAdapterInstance, userRepositoryInstance } from '@shared/container';
import BlackListRecoverTokenUseCase from '@application/useCases/blackListRecoverTokenUseCase';
import { BlackListRecoverTokenController } from '@presentation/controllers/BlackListRecoverTokenController';

export const blackListRecoverTokenControllerFactory = (): BaseController => {
  const useCase = new BlackListRecoverTokenUseCase(userRepositoryInstance);

  const controller = new BlackListRecoverTokenController(useCase, pinoAdapterInstance);

  return controller;
};
