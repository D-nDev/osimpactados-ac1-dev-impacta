import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { createUserControllerFactory } from "../factories/CreateUserControllerFactory";

export default class UserRoutes {
  router: Router

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.post('/create', adaptRoute(createUserControllerFactory()))
  }
}

