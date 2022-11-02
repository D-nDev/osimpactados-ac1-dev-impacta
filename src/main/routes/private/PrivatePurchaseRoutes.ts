import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter';
import { webhookPurchaseControllerFactory } from '@main/factories/CreatePurchaseControllerFactory';
import { isAuthUserMiddlewareInstance, observabilityMiddlewareInstance } from '@shared/container';
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';

export default class PrivatePurchaseRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.post(
      '/createpurchase',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(webhookPurchaseControllerFactory()),
    );
  }
}
