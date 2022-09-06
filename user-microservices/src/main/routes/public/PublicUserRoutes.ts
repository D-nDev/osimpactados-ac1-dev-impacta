import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { createUserControllerFactory } from "../../factories/CreateUserControllerFactory";
import { loginUserControllerFactory } from "../../factories/LoginUserControllerFactory";
import { validateUserControllerFactory } from "../../factories/ValidateUserController";

export default class PublicUserRoutes {
  router: Router

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.post('/create', adaptRoute(createUserControllerFactory()));
    this.router.post('/login', adaptRoute(loginUserControllerFactory()));
    this.router.post('/validateuser', adaptRoute(validateUserControllerFactory()));
    //this.router.get('/myuser', adaptRoute(getMyUserControllerFactory()));
    //this.router.delete('/myuser', adaptRoute(deleteMyUserControllerFactory()));
    //this.router.patch('/myuser', adaptRoute(updateMyUserControllerFactory()));
  }
}

