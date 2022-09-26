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

export default class PublicEstablishmentRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.post('/create', adaptRoute(createEstablishmentControllerFactory()));
    this.router.post('/login', adaptLoginRoute());
    this.router.post('/validateEstablishment', adaptRoute(validateEstablishmentControllerFactory()));
    this.router.post('/requestpass/sms', adaptRoute(sendSMSRecoverCodeControllerFactory()));
    this.router.post('/requestpass/email', adaptRoute(sendEmailRecoverCodeControllerFactory()));
    this.router.post('/changepass/email', adaptRoute(changeEstablishmentPassEmailControllerFactory()));
    this.router.post('/changepass/sms', adaptRoute(changeEstablishmentPassSMSControllerFactory()));
    this.router.post('/establishment/resendvalidationemail', adaptRoute(reSendValidationEmailControllerFactory()));
    this.router.post('/establishment/resendrecoveremail', adaptRoute(reSendRecoverEmailControllerFactory()));
    this.router.post('/establishment/resendrecoversms', adaptRoute(reSendRecoverSMSControllerFactory()));
    this.router.get('/health', adaptRoute(healthCheckControllerFactory()));
  }
}
