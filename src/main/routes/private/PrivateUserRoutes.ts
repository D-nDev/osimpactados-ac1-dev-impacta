import { adaptMiddleware } from '@app/main/adapters/express-middleware-adapter';
import { blackListRecoverTokenControllerFactory } from '@app/main/factories/BlackListRecoverTokenControllerFactory';
import { isAdminMiddlewareInstance, isAuthUserMiddlewareInstance } from '@app/shared/container';
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { deleteMyUserControllerFactory } from '../../factories/DeleteMyUserControllerFactory';
import { getMyUserControllerFactory } from '../../factories/GetMyUserControllerFactory';

export default class PrivateUserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.get('/myuser', adaptMiddleware(isAuthUserMiddlewareInstance), adaptRoute(getMyUserControllerFactory()));
    this.router.delete(
      '/myuser',
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(deleteMyUserControllerFactory()),
    );
    this.router.post(
      '/blacklist/recovertoken',
      adaptMiddleware(isAdminMiddlewareInstance),
      adaptRoute(blackListRecoverTokenControllerFactory()),
    );
  }
}
