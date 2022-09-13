import CreateUserUseCase from '@usecases/createUserUseCase';
import CreateUserController from '@presentation/controllers/CreateUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import SendValidationEmailUseCase from '@usecases/sendValidationEmailUseCase';
import {
  bcryptAdapterInstance,
  emailAdapterInstance,
  ioredisAdapterInstance,
  mapperAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  userRepositoryInstance,
  validatorAdapterInstance,
} from '@shared/container';

export const createUserControllerFactory = (): BaseController => {
  const useCase = new CreateUserUseCase(
    userRepositoryInstance,
    bcryptAdapterInstance,
    mapperAdapterInstance,
    ioredisAdapterInstance,
    momentAdapterInstance,
  );
  const emailUseCase = new SendValidationEmailUseCase(emailAdapterInstance);

  const controller = new CreateUserController(useCase, validatorAdapterInstance, emailUseCase, pinoAdapterInstance);

  return controller;
};
