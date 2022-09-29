import { BaseController } from '@presentation/controllers/contracts/BaseController';
import {
  ioredisAdapterInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
  twofactorAdapterInstance,
} from '@shared/container';
import Create2FaUseCase from '@application/useCases/create2faUseCase';
import Create2FaTokenController from '@presentation/controllers/Create2FaTokenController';

export const create2TokenControllerFactory = (): BaseController => {
  const useCase = new Create2FaUseCase(ioredisAdapterInstance, twofactorAdapterInstance, jwtAdapterInstance);

  const controller = new Create2FaTokenController(useCase, pinoAdapterInstance);

  return controller;
};
