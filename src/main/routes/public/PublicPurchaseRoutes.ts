import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { webhookPurchaseControllerFactory } from '@app/main/factories/CreatePurchaseControllerFactory';
import { observabilityMiddlewareInstance } from '@shared/container';
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { webhookUpdatePurchaseControllerFactory } from '@app/main/factories/UpdatePurchaseControllerFactory';

export default class PrivatePurchaseRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.post(
      '/webhook/purchase',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptRoute(webhookPurchaseControllerFactory()),
    );
    this.router.post(
      '/webhook/updatepurchase',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptRoute(webhookUpdatePurchaseControllerFactory()),
    );
  }
}
