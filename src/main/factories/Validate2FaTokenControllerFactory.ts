import { BaseController } from '@presentation/controllers/contracts/BaseController';
import {
  userRepositoryInstance,
  ioredisAdapterInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
  twofactorAdapterInstance,
} from '@shared/container';
import Validate2FaUseCase from '@application/useCases/validate2faUseCase';
import Validate2FaTokenController from '@presentation/controllers/Validate2FaTokenController';

export const validate2TokenControllerFactory = (): BaseController => {
  const useCase = new Validate2FaUseCase(
    ioredisAdapterInstance,
    twofactorAdapterInstance,
    userRepositoryInstance,
    jwtAdapterInstance,
  );

  const controller = new Validate2FaTokenController(useCase, pinoAdapterInstance);

  return controller;
};
