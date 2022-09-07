import { Router } from "express";
import { adaptRoute } from "../../adapters/express-router-adapter";
import { deleteMyUserControllerFactory } from "../../factories/DeleteMyUserControllerFactory";
import { getMyUserControllerFactory } from "../../factories/GetMyUserControllerFactory";

export default class PrivateUserRoutes {
  router: Router

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.get('/myuser', adaptRoute(getMyUserControllerFactory()));
    this.router.delete('/myuser', adaptRoute(deleteMyUserControllerFactory()));
  }
}

