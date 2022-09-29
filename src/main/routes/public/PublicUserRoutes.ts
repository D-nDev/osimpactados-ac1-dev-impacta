import { healthCheckControllerFactory } from '@main/factories/GetHealthCheckControllerFactory';
import { changeUserPassSMSControllerFactory } from '@main/factories/ChangeUserPassSMSControllerFactory';
import { reSendRecoverEmailControllerFactory } from '@main/factories/ReSendRecoverEmailControllerFactory';
import { reSendRecoverSMSControllerFactory } from '@main/factories/ReSendRecoverSMSControllerFactory';
import { reSendValidationEmailControllerFactory } from '@main/factories/ReSendValidationEmailControllerFactory';
import { Router } from 'express';
import { adaptLoginRoute, adaptRoute } from '../../adapters/express-router-adapter';
import { changeUserPassEmailControllerFactory } from '../../factories/ChangeUserPassEmailControllerFactory';
import { createUserControllerFactory } from '../../factories/CreateUserControllerFactory';
import { sendEmailRecoverCodeControllerFactory } from '../../factories/SendEmailRecoverCodeControllerFactory';
import { sendSMSRecoverCodeControllerFactory } from '../../factories/SendSMSRecoverCodeControllerFactory';
import { validateUserControllerFactory } from '../../factories/ValidateUserControllerFactory';
import { observabilityMiddlewareInstance } from '@shared/container';
import { limiter } from '@presentation/middlewares/RateLimitMiddleware';
import { adaptObservabilityMiddleware } from '@presentation/middlewares/StartObservabilityMiddleware';

export default class PublicUserRoutes {
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
      adaptRoute(createUserControllerFactory()),
    );
    this.router.post(
      '/login',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptLoginRoute(),
    );
    this.router.post(
      '/validateuser',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(validateUserControllerFactory()),
    );
    this.router.post(
      '/requestpass/sms',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(sendSMSRecoverCodeControllerFactory()),
    );
    this.router.post(
      '/requestpass/email',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(sendEmailRecoverCodeControllerFactory()),
    );
    this.router.post(
      '/changepass/email',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(changeUserPassEmailControllerFactory()),
    );
    this.router.post(
      '/changepass/sms',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(changeUserPassSMSControllerFactory()),
    );
    this.router.post(
      '/user/resendvalidationemail',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(reSendValidationEmailControllerFactory()),
    );
    this.router.post(
      '/user/resendrecoveremail',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(reSendRecoverEmailControllerFactory()),
    );
    this.router.post(
      '/user/resendrecoversms',
      adaptObservabilityMiddleware(observabilityMiddlewareInstance),
      limiter,
      adaptRoute(reSendRecoverSMSControllerFactory()),
    );
    this.router.get('/health', adaptRoute(healthCheckControllerFactory()));
  }
}
