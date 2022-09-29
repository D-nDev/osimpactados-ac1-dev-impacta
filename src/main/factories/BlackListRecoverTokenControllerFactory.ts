import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, pinoAdapterInstance } from '@shared/container';
import BlackListRecoverTokenUseCase from '@application/useCases/blackListRecoverTokenUseCase';
import { BlackListRecoverTokenController } from '@presentation/controllers/BlackListRecoverUserTokenController';

export const blackListRecoverTokenControllerFactory = (): BaseController => {
  const useCase = new BlackListRecoverTokenUseCase(establishmentRepositoryInstance);

  const controller = new BlackListRecoverTokenController(useCase, pinoAdapterInstance);

  return controller;
};
