import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { jwtAdapterInstance, pinoAdapterInstance, purchaseRepositoryInstance } from '@shared/container';
import GetPurchaseUseCase from '@application/useCases/getPurchaseUseCase';
import { GetPurchaseController } from '@presentation/controllers/GetPurchaseController';

export const getPurchaseControllerFactory = (): BaseController => {
  const useCase = new GetPurchaseUseCase(purchaseRepositoryInstance, jwtAdapterInstance);

  const controller = new GetPurchaseController(useCase, pinoAdapterInstance);

  return controller;
};
