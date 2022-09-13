import DeleteUserUseCase from '@usecases/deleteUserUseCase';
import DeleteUserController from '@presentation/controllers/DeleteUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { pinoAdapterInstance, userRepositoryInstance } from '@shared/container';

export const deleteUserControllerFactory = (): BaseController => {
  const useCase = new DeleteUserUseCase(userRepositoryInstance);

  const controller = new DeleteUserController(useCase, pinoAdapterInstance);

  return controller;
};
