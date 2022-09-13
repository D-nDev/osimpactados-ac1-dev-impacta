import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-router-adapter';
import { createProductControllerFactory } from '../../factories/CreateProductControllerFactory';
import { deleteMyEstablishmentControllerFactory } from '../../factories/DeleteMyEstablishmentControllerFactory';
import { getMyEstablishmentControllerFactory } from '../../factories/GetMyEstablishmentControllerFactory';

export default class PrivateEstablishmentRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  public buildRoutes() {
    this.router.get('/myEstablishment', adaptRoute(getMyEstablishmentControllerFactory()));
    this.router.delete('/myEstablishment', adaptRoute(deleteMyEstablishmentControllerFactory()));
    this.router.post('/product', adaptRoute(createProductControllerFactory()));
  }
}
