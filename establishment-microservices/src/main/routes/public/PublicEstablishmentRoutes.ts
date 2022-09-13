import { changeEstablishmentPassEmailControllerFactory } from '@app/main/factories/ChangeEstablishmentPassEmailControllerFactory';
import { changeEstablishmentPassSMSControllerFactory } from '@app/main/factories/ChangeEstablishmentPassSMSControllerFactory';
import { reSendRecoverEmailControllerFactory } from '@app/main/factories/ReSendRecoverEmailControllerFactory';
import { reSendRecoverSMSControllerFactory } from '@app/main/factories/ReSendRecoverSMSControllerFactory';
import { reSendValidationEmailControllerFactory } from '@app/main/factories/ReSendValidationEmailControllerFactory';
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { createEstablishmentControllerFactory } from '../../factories/CreateEstablishmentControllerFactory';
import { loginEstablishmentControllerFactory } from '../../factories/LoginEstablishmentControllerFactory';
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
    this.router.post('/login', adaptRoute(loginEstablishmentControllerFactory()));
    this.router.post('/validateEstablishment', adaptRoute(validateEstablishmentControllerFactory()));
    this.router.post('/requestpass/sms', adaptRoute(sendSMSRecoverCodeControllerFactory()));
    this.router.post('/requestpass/email', adaptRoute(sendEmailRecoverCodeControllerFactory()));
    this.router.post('/changepass/email', adaptRoute(changeEstablishmentPassEmailControllerFactory()));
    this.router.post('/changepass/sms', adaptRoute(changeEstablishmentPassSMSControllerFactory()));
    this.router.post('/establishment/resendvalidationemail', adaptRoute(reSendValidationEmailControllerFactory()));
    this.router.post('/establishment/resendrecoveremail', adaptRoute(reSendRecoverEmailControllerFactory()));
    this.router.post('/establishment/resendrecoversms', adaptRoute(reSendRecoverSMSControllerFactory()));
  }
}
