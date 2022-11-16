import { limiter } from '@presentation/middlewares/RateLimitMiddleware';
import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';
import { observabilityMiddlewareInstance } from '@shared/container';
import { changeEstablishmentPassEmailControllerFactory } from '@main/factories/ChangeEstablishmentPassEmailControllerFactory';
import { changeEstablishmentPassSMSControllerFactory } from '@main/factories/ChangeEstablishmentPassSMSControllerFactory';
import { healthCheckControllerFactory } from '@main/factories/HealthCheckControllerFactory';
import { reSendRecoverEmailControllerFactory } from '@main/factories/ReSendRecoverEmailControllerFactory';
import { reSendRecoverSMSControllerFactory } from '@main/factories/ReSendRecoverSMSControllerFactory';
import { reSendValidationEmailControllerFactory } from '@main/factories/ReSendValidationEmailControllerFactory';
import { Router } from 'express';
import { adaptRoute, adaptLoginRoute } from '../../adapters/express-router-adapter';
import { createEstablishmentControllerFactory } from '../../factories/CreateEstablishmentControllerFactory';
import { sendEmailRecoverCodeControllerFactory } from '../../factories/SendEmailRecoverCodeControllerFactory';
import { sendSMSRecoverCodeControllerFactory } from '../../factories/SendSMSRecoverCodeControllerFactory';
import { validateEstablishmentControllerFactory } from '../../factories/ValidateEstablishmentControllerFactory';
import { getProductsControllerFactory } from '@main/factories/GetProductsControllerFactory';
import { getProductControllerFactory } from '@main/factories/GetProductControllerFactory';
import { getEstablishmentsControllerFactory } from '@app/main/factories/GetEstablishmentsControllerFactory';
import { getSubsidiariesControllerFactory } from '@app/main/factories/GetSubsidiariesControllerFactory';

export default class PublicEstablishmentRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.post(
      '/create',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(createEstablishmentControllerFactory()),
    );
    this.router.post(
      '/login',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
    );
    this.router.post(
      '/validateEstablishment',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
      adaptRoute(validateEstablishmentControllerFactory()),
    );
    this.router.post(
      '/requestpass/sms',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
      adaptRoute(sendSMSRecoverCodeControllerFactory()),
    );
    this.router.post(
      '/requestpass/email',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
      adaptRoute(sendEmailRecoverCodeControllerFactory()),
    );
    this.router.post(
      '/changepass/email',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
      adaptRoute(changeEstablishmentPassEmailControllerFactory()),
    );
    this.router.post(
      '/changepass/sms',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
      adaptRoute(changeEstablishmentPassSMSControllerFactory()),
    );
    this.router.post(
      '/establishment/resendvalidationemail',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
      adaptRoute(reSendValidationEmailControllerFactory()),
    );
    this.router.post(
      '/establishment/resendrecoveremail',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
      adaptRoute(reSendRecoverEmailControllerFactory()),
    );
    this.router.post(
      '/establishment/resendrecoversms',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
      adaptRoute(reSendRecoverSMSControllerFactory()),
    );
    this.router.get('/health', adaptRoute(healthCheckControllerFactory()));
    this.router.get(
      '/public/products/:subsidiaryId',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptRoute(getProductsControllerFactory()),
    );
    this.router.get(
      '/public/product/:productId/:subsidiaryId',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptRoute(getProductControllerFactory()),
    );
    this.router.get(
      '/public/establishments',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptRoute(getEstablishmentsControllerFactory()),
    );
    this.router.get(
      '/public/subsidiaries/:id',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      adaptRoute(getSubsidiariesControllerFactory()),
    );
  }
}
