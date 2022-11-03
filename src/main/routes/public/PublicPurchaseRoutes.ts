import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { observabilityMiddlewareInstance } from '@shared/container';
import { Router } from 'express';
import { adaptPaymentRoute, adaptRoute } from '../../adapters/express-router-adapter';
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
      adaptPaymentRoute(),
    );
    this.router.post(
      '/createpreference',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptRoute(createPreferenceControllerFactory()),
    );
  }
}
