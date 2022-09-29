import { create2TokenControllerFactory } from '@main/factories/Create2FaTokenControllerFactory';
import { createAddressControllerFactory } from '@main/factories/CreateAddressControllerFactory';
import { delete2TokenControllerFactory } from '@main/factories/Delete2FaTokenControllerFactory';
import { patchAddressControllerFactory } from '@main/factories/PatchAddressControllerFactory';
import { putPhotoControllerFactory } from '@main/factories/PutPhotoControllerFactory';
import { validate2TokenControllerFactory } from '@main/factories/Validate2FaTokenControllerFactory';
import { adaptFormDataSingleFile } from '@presentation/middlewares/AdaptFormDataSingleFile';
import { limiter } from '@presentation/middlewares/RateLimitMiddleware';
import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter';
import { blackListRecoverTokenControllerFactory } from '@main/factories/BlackListRecoverTokenControllerFactory';
import {
  isAdminMiddlewareInstance,
  isAuthUserMiddlewareInstance,
  observabilityMiddlewareInstance,
} from '@shared/container';
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
    this.router.get(
      '/myuser',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(getMyUserControllerFactory()),
    );
    this.router.delete(
      '/myuser',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(deleteMyUserControllerFactory()),
    );
    this.router.post(
      '/blacklist/recovertoken',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAdminMiddlewareInstance),
      adaptRoute(blackListRecoverTokenControllerFactory()),
    );
    this.router.post(
      '/create2fatoken',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(create2TokenControllerFactory()),
    );
    this.router.post(
      '/validate2fatoken',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(validate2TokenControllerFactory()),
    );
    this.router.delete(
      '/delete2fatoken',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(delete2TokenControllerFactory()),
    );
    this.router.put(
      '/photo',
      adaptFormDataSingleFile,
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(putPhotoControllerFactory()),
    );
    this.router.patch(
      '/address/:id',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(patchAddressControllerFactory()),
    );
    this.router.post(
      '/address',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(createAddressControllerFactory()),
    );
  }
}
