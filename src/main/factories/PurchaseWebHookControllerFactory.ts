import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { mercadopagoAdapterInstance, pinoAdapterInstance, purchaseRepositoryInstance } from '@shared/container';
import { WebHookPurchaseController } from '@presentation/controllers/WebHookPurchaseController';
import CreatePurchaseUseCase from '@application/useCases/createPurchaseUseCase';
import UpdatePurchaseUseCase from '@application/useCases/updatePurchaseUseCase';

export const webhookPurchaseControllerFactory = (event: string): BaseController => {
  let useCase: any;

  if (event === 'payment.created') {
    useCase = new CreatePurchaseUseCase(purchaseRepositoryInstance, mercadopagoAdapterInstance);
  } else if (event === 'payment.updated') {
    useCase = new UpdatePurchaseUseCase(purchaseRepositoryInstance, mercadopagoAdapterInstance);
  }

  const controller = new WebHookPurchaseController(useCase, pinoAdapterInstance);

  return controller;
};
