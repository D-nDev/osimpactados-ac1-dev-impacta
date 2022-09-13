import { BaseController } from '@presentation/controllers/contracts/BaseController';
import ChangeUserPassByEmailUseCase from '@usecases/changeUserPassByEmailUseCase';
import ChangeUserPassEmailController from '@presentation/controllers/ChangeUserPassEmailController';
import {
  bcryptAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  userRepositoryInstance,
  validatorAdapterInstance,
} from '@shared/container';

export const changeUserPassEmailControllerFactory = (): BaseController => {
  const emailUseCase = new ChangeUserPassByEmailUseCase(
    userRepositoryInstance,
    momentAdapterInstance,
    bcryptAdapterInstance,
  );

  const controller = new ChangeUserPassEmailController(emailUseCase, validatorAdapterInstance, pinoAdapterInstance);

  return controller;
};
