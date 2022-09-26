import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { ioredisAdapterInstance, jwtAdapterInstance, twofactorAdapterInstance } from '@shared/container';
import Create2FaUseCase from '@app/application/useCases/create2faUseCase';
import Create2FaTokenController from '@app/presentation/controllers/Create2FaTokenController';

export const create2TokenControllerFactory = (): BaseController => {
  const useCase = new Create2FaUseCase(ioredisAdapterInstance, twofactorAdapterInstance, jwtAdapterInstance);

  const controller = new Create2FaTokenController(useCase);

  return controller;
};
