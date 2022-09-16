import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { createProductControllerFactory } from '../../factories/CreateProductControllerFactory';
import { deleteMyEstablishmentControllerFactory } from '../../factories/DeleteMyEstablishmentControllerFactory';
import { getMyEstablishmentControllerFactory } from '../../factories/GetMyEstablishmentControllerFactory';
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter';
import { isAdminMiddlewareInstance, isAuthUserMiddlewareInstance } from '@shared/container';
import { adaptMulter } from '@presentation/middlewares/MulterTreeFilesMiddleware';
import { blackListRecoverTokenControllerFactory } from '@main/factories/BlackListRecoverTokenControllerFactory';

export default class PrivateEstablishmentRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.get(
      '/myEstablishment',
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(getMyEstablishmentControllerFactory()),
    );
    this.router.delete(
      '/myEstablishment',
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(deleteMyEstablishmentControllerFactory()),
    );
    this.router.post(
      '/product',
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptMulter,
      adaptRoute(createProductControllerFactory()),
    );
    this.router.post(
      '/blacklist/recovertoken',
      adaptMiddleware(isAdminMiddlewareInstance),
      adaptRoute(blackListRecoverTokenControllerFactory()),
    );
  }
}
