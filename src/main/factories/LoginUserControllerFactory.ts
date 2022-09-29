import { BaseController } from '@presentation/controllers/contracts/BaseController';
import LoginUserUseCase from '@usecases/loginUserUseCase';
import LoginUserController from '@presentation/controllers/LoginUserController';
import {
  bcryptAdapterInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
  twofactorAdapterInstance,
  userRepositoryInstance,
} from '@shared/container';
import { Request } from 'express';
import LoginUser2FAUseCase from '@application/useCases/loginUser2FAUseCase';

export const loginUserControllerFactory = (req: Request): BaseController => {
  let useCase: any;

  if (req.body.code) {
    useCase = new LoginUser2FAUseCase(
      userRepositoryInstance,
      bcryptAdapterInstance,
      jwtAdapterInstance,
      twofactorAdapterInstance,
    );
  } else {
    useCase = new LoginUserUseCase(userRepositoryInstance, bcryptAdapterInstance, jwtAdapterInstance);
  }

  const controller = new LoginUserController(useCase, pinoAdapterInstance);

  return controller;
};
