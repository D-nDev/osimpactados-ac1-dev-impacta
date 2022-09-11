import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { changeUserPassControllerFactory } from '../../factories/ChangeUserPassControllerFactory';
import { createUserControllerFactory } from '../../factories/CreateUserControllerFactory';
import { loginUserControllerFactory } from '../../factories/LoginUserControllerFactory';
import { sendEmailRecoverCodeControllerFactory } from '../../factories/SendEmailRecoverCodeControllerFactory';
import { sendSMSRecoverCodeControllerFactory } from '../../factories/SendSMSRecoverCodeControllerFactory';
import { validateUserControllerFactory } from '../../factories/ValidateUserController';

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
    this.router.post('/changepass', adaptRoute(changeUserPassControllerFactory()));
  }
}
