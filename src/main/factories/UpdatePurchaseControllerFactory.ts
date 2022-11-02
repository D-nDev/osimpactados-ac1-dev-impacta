import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { mercadopagoAdapterInstance, pinoAdapterInstance, purchaseRepositoryInstance } from '@shared/container';
import UpdatePurchaseUseCase from '@app/application/useCases/updatePurchaseUseCase';
import { WebHookUpdatePurchaseController } from '@app/presentation/controllers/WebHookUpdatePurchaseController';

export const webhookUpdatePurchaseControllerFactory = (): BaseController => {
  const useCase = new UpdatePurchaseUseCase(purchaseRepositoryInstance, mercadopagoAdapterInstance);

  const controller = new WebHookUpdatePurchaseController(useCase, pinoAdapterInstance);

  return controller;
};
