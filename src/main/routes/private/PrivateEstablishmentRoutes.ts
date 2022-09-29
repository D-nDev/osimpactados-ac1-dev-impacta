import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { createProductControllerFactory } from '../../factories/CreateProductControllerFactory';
import { deleteMyEstablishmentControllerFactory } from '../../factories/DeleteMyEstablishmentControllerFactory';
import { getMyEstablishmentControllerFactory } from '../../factories/GetMyEstablishmentControllerFactory';
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter';
import {
  isAdminMiddlewareInstance,
  isAuthUserMiddlewareInstance,
  observabilityMiddlewareInstance,
} from '@shared/container';
import { adaptMulter } from '@presentation/middlewares/MulterTreeFilesMiddleware';
import { blackListRecoverTokenControllerFactory } from '@main/factories/BlackListRecoverTokenControllerFactory';
import { create2TokenControllerFactory } from '@main/factories/Create2FaTokenControllerFactory';
import { validate2TokenControllerFactory } from '@main/factories/Validate2FaTokenControllerFactory';
import { delete2TokenControllerFactory } from '@main/factories/Delete2FaTokenControllerFactory';
import { deleteProductControllerFactory } from '@main/factories/DeleteProductControllerFactory';
import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { limiter } from '@app/presentation/middlewares/RateLimitMiddleware';
import { patchProductControllerFactory } from '@app/main/factories/PatchProductControllerFactory';
import { adaptFormDataSingleFile } from '@app/presentation/middlewares/AdaptFormDataSingleFile';
import { getMyProductsControllerFactory } from '@app/main/factories/GetMyProductsControllerFactory';
import { getMyProductControllerFactory } from '@app/main/factories/GetMyProductControllerFactory';
import { createSubsidiaryControllerFactory } from '@app/main/factories/CreateSubsidiaryControllerFactory';

export default class PrivateEstablishmentRoutes {
  router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.get(
      '/myEstablishment',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(getMyEstablishmentControllerFactory()),
    );
    this.router.delete(
      '/myEstablishment',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(deleteMyEstablishmentControllerFactory()),
    );
    this.router.post(
      '/product',
      adaptMulter,
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(createProductControllerFactory()),
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
    this.router.delete(
      '/product/:productId/:subsidiaryId',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(deleteProductControllerFactory()),
    );
    this.router.patch(
      '/product/:productId',
      adaptFormDataSingleFile,
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(patchProductControllerFactory()),
    );
    this.router.get(
      '/products/:subsidiaryId',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(getMyProductsControllerFactory()),
    );
    this.router.get(
      '/product/:productId/:subsidiaryId',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(getMyProductControllerFactory()),
    );
    this.router.post(
      '/subsidiary',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptMiddleware(isAuthUserMiddlewareInstance),
      adaptRoute(createSubsidiaryControllerFactory()),
    );
  }
}
