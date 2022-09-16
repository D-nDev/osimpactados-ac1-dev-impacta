import { BaseController } from '@presentation/controllers/contracts/BaseController';
import HealthCheckController from '@presentation/controllers/HealthCheckController';

export const healthCheckControllerFactory = (): BaseController => {
  const controller = new HealthCheckController();

  return controller;
};
