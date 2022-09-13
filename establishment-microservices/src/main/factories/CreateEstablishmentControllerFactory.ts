import CreateEstablishmentUseCase from '@usecases/createEstablishmentUseCase';
import CreateEstablishmentController from '@presentation/controllers/CreateEstablishmentController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import SendValidationEmailUseCase from '@usecases/sendValidationEmailUseCase';
import {
  bcryptAdapterInstance,
  emailAdapterInstance,
  establishmentRepositoryInstance,
  ioredisAdapterInstance,
  mapperAdapterInstance,
  momentAdapterInstance,
  pinoAdapterInstance,
  validatorAdapterInstance,
} from '@shared/container';

export const createEstablishmentControllerFactory = (): BaseController => {
  const useCase = new CreateEstablishmentUseCase(
    establishmentRepositoryInstance,
    bcryptAdapterInstance,
    mapperAdapterInstance,
    ioredisAdapterInstance,
    momentAdapterInstance,
  );
  const emailUseCase = new SendValidationEmailUseCase(emailAdapterInstance);

  const controller = new CreateEstablishmentController(
    useCase,
    validatorAdapterInstance,
    emailUseCase,
    pinoAdapterInstance,
  );

  return controller;
};
