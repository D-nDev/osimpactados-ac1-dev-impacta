import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { jwtAdapterInstance, pinoAdapterInstance, userRepositoryInstance } from '@shared/container';
import Delete2FaUseCase from '@app/application/useCases/delete2faUseCase';
import Delete2FaTokenController from '@app/presentation/controllers/Delete2FaTokenController';

export const delete2TokenControllerFactory = (): BaseController => {
  const useCase = new Delete2FaUseCase(userRepositoryInstance, jwtAdapterInstance);

  const controller = new Delete2FaTokenController(useCase, pinoAdapterInstance);

  return controller;
};
