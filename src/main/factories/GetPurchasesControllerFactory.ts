import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { jwtAdapterInstance, pinoAdapterInstance, purchaseRepositoryInstance } from '@shared/container';
import GetPurchasesUseCase from '@application/useCases/getPurchasesUseCase';
import { GetPurchasesController } from '@presentation/controllers/GetPurchasesController';

export const getPurchasesControllerFactory = (): BaseController => {
  const useCase = new GetPurchasesUseCase(purchaseRepositoryInstance, jwtAdapterInstance);

  const controller = new GetPurchasesController(useCase, pinoAdapterInstance);

  return controller;
};
