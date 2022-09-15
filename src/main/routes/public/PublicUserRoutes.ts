import { healthCheckControllerFactory } from '@app/main/factories/GetHealthCheckControllerFactory';
import { changeUserPassSMSControllerFactory } from '@main/factories/ChangeUserPassSMSControllerFactory';
import { reSendRecoverEmailControllerFactory } from '@main/factories/ReSendRecoverEmailControllerFactory';
import { reSendRecoverSMSControllerFactory } from '@main/factories/ReSendRecoverSMSControllerFactory';
import { reSendValidationEmailControllerFactory } from '@main/factories/ReSendValidationEmailControllerFactory';
import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { changeUserPassEmailControllerFactory } from '../../factories/ChangeUserPassEmailControllerFactory';
import { createUserControllerFactory } from '../../factories/CreateUserControllerFactory';
import { loginUserControllerFactory } from '../../factories/LoginUserControllerFactory';
import { sendEmailRecoverCodeControllerFactory } from '../../factories/SendEmailRecoverCodeControllerFactory';
import { sendSMSRecoverCodeControllerFactory } from '../../factories/SendSMSRecoverCodeControllerFactory';
import { validateUserControllerFactory } from '../../factories/ValidateUserControllerFactory';

export default class PublicUserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.post('/create', adaptRoute(createUserControllerFactory()));
    this.router.post('/login', adaptRoute(loginUserControllerFactory()));
    this.router.post('/validateuser', adaptRoute(validateUserControllerFactory()));
    this.router.post('/requestpass/sms', adaptRoute(sendSMSRecoverCodeControllerFactory()));
    this.router.post('/requestpass/email', adaptRoute(sendEmailRecoverCodeControllerFactory()));
    this.router.post('/changepass/email', adaptRoute(changeUserPassEmailControllerFactory()));
    this.router.post('/changepass/sms', adaptRoute(changeUserPassSMSControllerFactory()));
    this.router.post('/user/resendvalidationemail', adaptRoute(reSendValidationEmailControllerFactory()));
    this.router.post('/user/resendrecoveremail', adaptRoute(reSendRecoverEmailControllerFactory()));
    this.router.post('/user/resendrecoversms', adaptRoute(reSendRecoverSMSControllerFactory()));
    this.router.get('/health', adaptRoute(healthCheckControllerFactory()));
  }
}
