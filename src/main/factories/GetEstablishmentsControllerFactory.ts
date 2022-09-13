import GetEstablishmentsUseCase from '@usecases/getEstablishmentsUseCase';
import GetEstablishmentsController from '@presentation/controllers/GetEstablishmentsController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance } from '@app/shared/container';

export const getEstablishmentsControllerFactory = (): BaseController => {
  const useCase = new GetEstablishmentsUseCase(establishmentRepositoryInstance);

  const controller = new GetEstablishmentsController(useCase);

  return controller;
};
