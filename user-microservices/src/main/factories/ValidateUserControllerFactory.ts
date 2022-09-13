import ValidateUserController from '@presentation/controllers/ValidateUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import ValidateUserUseCase from '@usecases/validateUserUseCase';
import {
  ioredisAdapterInstance,
  mapperAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  userRepositoryInstance,
  validatorAdapterInstance,
} from '@shared/container';

export const validateUserControllerFactory = (): BaseController => {
  const useCase = new ValidateUserUseCase(
    userRepositoryInstance,
    ioredisAdapterInstance,
    mapperAdapterInstance,
    momentAdapterInstance,
  );

  const controller = new ValidateUserController(useCase, validatorAdapterInstance, pinoAdapterInstance);

  return controller;
};
