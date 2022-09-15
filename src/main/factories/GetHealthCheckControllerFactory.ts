import { BaseController } from '@presentation/controllers/contracts/BaseController';
import HealthCheckController from '@app/presentation/controllers/HealthCheckController';

export const healthCheckControllerFactory = (): BaseController => {
  const controller = new HealthCheckController();

  return controller;
};
