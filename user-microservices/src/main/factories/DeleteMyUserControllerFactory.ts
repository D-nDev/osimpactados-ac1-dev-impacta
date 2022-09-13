import DeleteMyUserUseCase from '@usecases/deleteMyUserUseCase';
import DeleteMyUserController from '@presentation/controllers/DeleteMyUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { jwtAdapterInstance, pinoAdapterInstance, userRepositoryInstance } from '@shared/container';

export const deleteMyUserControllerFactory = (): BaseController => {
  const useCase = new DeleteMyUserUseCase(userRepositoryInstance, jwtAdapterInstance);

  const controller = new DeleteMyUserController(useCase, pinoAdapterInstance);

  return controller;
};
