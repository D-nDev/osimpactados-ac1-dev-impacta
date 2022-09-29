import { BaseController } from '@presentation/controllers/contracts/BaseController';
import LoginEstablishmentUseCase from '@usecases/loginEstablishmentUseCase';
import LoginEstablishmentController from '@presentation/controllers/LoginEstablishmentController';
import {
  bcryptAdapterInstance,
  establishmentRepositoryInstance,
  jwtAdapterInstance,
  pinoAdapterInstance,
  twofactorAdapterInstance,
} from '@shared/container';

import { Request } from 'express';
import LoginEstablishment2FAUseCase from '@application/useCases/loginEstablishment2FAUseCase';

export const loginEstablishmentControllerFactory = (req: Request): BaseController => {
  let useCase: any;

  if (req.body.code) {
    useCase = new LoginEstablishment2FAUseCase(
      establishmentRepositoryInstance,
      bcryptAdapterInstance,
      jwtAdapterInstance,
      twofactorAdapterInstance,
    );
  } else {
    useCase = new LoginEstablishmentUseCase(establishmentRepositoryInstance, bcryptAdapterInstance, jwtAdapterInstance);
  }

  const controller = new LoginEstablishmentController(useCase, pinoAdapterInstance);

  return controller;
};
