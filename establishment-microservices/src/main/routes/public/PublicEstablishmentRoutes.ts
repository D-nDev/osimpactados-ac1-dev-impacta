import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { changeEstablishmentPassControllerFactory } from "../../factories/ChangeEstablishmentPassControllerFactory";
import { createEstablishmentControllerFactory } from "../../factories/CreateEstablishmentControllerFactory";
import { loginEstablishmentControllerFactory } from "../../factories/LoginEstablishmentControllerFactory";
import { sendEmailRecoverCodeControllerFactory } from "../../factories/SendEmailRecoverCodeControllerFactory";
import { sendSMSRecoverCodeControllerFactory } from "../../factories/SendSMSRecoverCodeControllerFactory";
import { validateEstablishmentControllerFactory } from "../../factories/ValidateEstablishmentController";

export default class PublicEstablishmentRoutes {
  router: Router

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
    this.router.post('/changepass', adaptRoute(changeEstablishmentPassControllerFactory()));
  }
}

