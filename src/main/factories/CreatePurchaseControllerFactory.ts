import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { mercadopagoAdapterInstance, pinoAdapterInstance, purchaseRepositoryInstance } from '@shared/container';
import { WebHookPurchaseController } from '@presentation/controllers/WebHookPurchaseController';
import CreatePurchaseUseCase from '@application/useCases/createPurchaseUseCase';

export const webhookPurchaseControllerFactory = (): BaseController => {
  const useCase = new CreatePurchaseUseCase(purchaseRepositoryInstance, mercadopagoAdapterInstance);

  const controller = new WebHookPurchaseController(useCase, pinoAdapterInstance);

  return controller;
};
