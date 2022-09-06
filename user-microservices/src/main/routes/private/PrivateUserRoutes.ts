import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { deleteUserControllerFactory } from "../../factories/DeleteUserControllerFactory";
import { getUserControllerFactory } from "../../factories/GetUserControllerFactory";
import { getUsersControllerFactory } from "../../factories/GetUsersControllerFactory";

export default class PrivateUserRoutes {
  router: Router

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.get('/user/:id', adaptRoute(getUserControllerFactory()));
    this.router.get('/users', adaptRoute(getUsersControllerFactory()));
    this.router.delete('/user/:id', adaptRoute(deleteUserControllerFactory()));
    //this.router.patch('/user/:id', adaptRoute(updateUserControllerFactory()));
  }
}

