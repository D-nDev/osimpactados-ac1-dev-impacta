import ValidateEstablishmentController from '@presentation/controllers/ValidateEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import ValidateEstablishmentUseCase from '@usecases/validateEstablishmentUseCase';
import {
  establishmentRepositoryInstance,
  ioredisAdapterInstance,
  mapperAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  validatorAdapterInstance,
} from '@app/shared/container';

export const validateEstablishmentControllerFactory = (): BaseController => {
  const useCase = new ValidateEstablishmentUseCase(
    establishmentRepositoryInstance,
    ioredisAdapterInstance,
    mapperAdapterInstance,
    momentAdapterInstance,
  );

  const controller = new ValidateEstablishmentController(useCase, validatorAdapterInstance, pinoAdapterInstance);

  return controller;
};
