import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { webhookPurchaseControllerFactory } from '@main/factories/CreatePurchaseControllerFactory';
import { observabilityMiddlewareInstance } from '@shared/container';
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { webhookUpdatePurchaseControllerFactory } from '@main/factories/UpdatePurchaseControllerFactory';
import { createPreferenceControllerFactory } from '@main/factories/CreatePreferenceControllerFactory';

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
    this.router.post(
      '/createpreference',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptRoute(createPreferenceControllerFactory()),
    );
  }
}
