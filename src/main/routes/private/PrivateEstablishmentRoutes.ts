import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { createProductControllerFactory } from '../../factories/CreateProductControllerFactory';
import { deleteMyEstablishmentControllerFactory } from '../../factories/DeleteMyEstablishmentControllerFactory';
import { getMyEstablishmentControllerFactory } from '../../factories/GetMyEstablishmentControllerFactory';
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter';
import { isAdminMiddlewareInstance, isAuthUserMiddlewareInstance } from '@shared/container';
import { adaptMulter } from '@presentation/middlewares/MulterTreeFilesMiddleware';
import { blackListRecoverTokenControllerFactory } from '@main/factories/BlackListRecoverTokenControllerFactory';
import { create2TokenControllerFactory } from '@app/main/factories/Create2FaTokenControllerFactory';
import { validate2TokenControllerFactory } from '@app/main/factories/Validate2FaTokenControllerFactory';
import { delete2TokenControllerFactory } from '@app/main/factories/Delete2FaTokenControllerFactory';

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
    this.router.post(
      '/create2fatoken',
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(create2TokenControllerFactory()),
    );
    this.router.post(
      '/validate2fatoken',
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(validate2TokenControllerFactory()),
    );
    this.router.delete(
      '/delete2fatoken',
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(delete2TokenControllerFactory()),
    );
  }
}
