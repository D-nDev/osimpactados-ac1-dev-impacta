import { BaseController } from '@presentation/controllers/contracts/BaseController';
import {
  azureblobAdapterInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
  userRepositoryInstance,
} from '@shared/container';
import PutPhotoUseCase from '@app/application/useCases/putPhotoUseCase';
import PutPhotoController from '@app/presentation/controllers/PutPhotoController';

export const putPhotoControllerFactory = (): BaseController => {
  const useCase = new PutPhotoUseCase(userRepositoryInstance, azureblobAdapterInstance, jwtAdapterInstance);

  const controller = new PutPhotoController(useCase, pinoAdapterInstance);

  return controller;
};
