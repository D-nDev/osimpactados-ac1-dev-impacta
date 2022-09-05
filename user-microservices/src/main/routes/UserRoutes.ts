import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { createUserControllerFactory } from "../factories/CreateUserControllerFactory";
import { getUserControllerFactory } from "../factories/GetUserControllerFactory";
import { getUsersControllerFactory } from "../factories/GetUsersControllerFactory";

export default class UserRoutes {
  router: Router

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.post('/create', adaptRoute(createUserControllerFactory()));
    this.router.get('/users', adaptRoute(getUsersControllerFactory()))
    this.router.get('/user/:id', adaptRoute(getUserControllerFactory()))
  }
}

