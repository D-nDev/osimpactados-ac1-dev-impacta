import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { establishmentRepositoryInstance, jwtAdapterInstance, pinoAdapterInstance } from '@shared/container';
import GetMyProductUseCase from '@app/application/useCases/getMyProductUseCase';
import GetMyProductController from '@app/presentation/controllers/GetMyProductController';

export const getMyProductControllerFactory = (): BaseController => {
  const useCase = new GetMyProductUseCase(establishmentRepositoryInstance, jwtAdapterInstance);

  const controller = new GetMyProductController(useCase, pinoAdapterInstance);

  return controller;
};
