import { BaseController } from '@presentation/controllers/contracts/BaseController';
import ChangeUserPassSMSController from '@presentation/controllers/ChangeUserPassSMSController';
import ChangeUserPassSMSUseCase from '@usecases/changeUserPassBySMSUseCase';
import {
  bcryptAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  userRepositoryInstance,
  validatorAdapterInstance,
} from '@shared/container';

export const changeUserPassSMSControllerFactory = (): BaseController => {
  const emailUseCase = new ChangeUserPassSMSUseCase(
    userRepositoryInstance,
    momentAdapterInstance,
    bcryptAdapterInstance,
  );

  const controller = new ChangeUserPassSMSController(emailUseCase, validatorAdapterInstance, pinoAdapterInstance);

  return controller;
};
