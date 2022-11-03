import { BaseController } from '@presentation/controllers/contracts/BaseController';
import {
  jwtAdapterInstance,
  pinoAdapterInstance,
  userPurchaseAdapterInstance,
  validatorAdapterInstance,
} from '@shared/container';
import CreateUserPurchaseUseCase from '@application/useCases/createUserPurchase';
import CreateUserPurchaseController from '@presentation/controllers/CreateUserPurchaseController';

export const createUserPurchaseControllerFactory = (): BaseController => {
  const useCase = new CreateUserPurchaseUseCase(userPurchaseAdapterInstance, jwtAdapterInstance);

  const controller = new CreateUserPurchaseController(useCase, validatorAdapterInstance, pinoAdapterInstance);

  return controller;
};
