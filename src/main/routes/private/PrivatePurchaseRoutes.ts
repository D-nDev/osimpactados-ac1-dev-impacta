import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { observabilityMiddlewareInstance } from '@shared/container';
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { createPreferenceControllerFactory } from '@app/main/factories/CreatePreferenceControllerFactory';

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
      adaptRoute(createPreferenceControllerFactory()),
    );
  }
}
