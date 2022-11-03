import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { isAuthUserMiddlewareInstance, observabilityMiddlewareInstance } from '@shared/container';
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter';
import { getPurchasesControllerFactory } from '@main/factories/GetPurchasesControllerFactory';
import { getPurchaseControllerFactory } from '@main/factories/GetPurchaseControllerFactory';

export default class PrivatePurchaseRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.get(
      '/purchases',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(getPurchasesControllerFactory()),
    );
    this.router.get(
      '/purchase/:purchaseId',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(getPurchaseControllerFactory()),
    );
  }
}
