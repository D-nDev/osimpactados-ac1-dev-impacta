import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { createEstablishmentRepository } from './CreateEstablishmentRepositoryFactory';
import ChangeEstablishmentPassByEmailUseCase from '@usecases/changeEstablishmentPassByEmailUseCase';
import ChangeEstablishmentPassController from '@presentation/controllers/ChangeEstablishmentPassController';
import ChangeEstablishmentPassByMobileNumberUseCase from '@usecases/changeEstablishmentPassByMobileNumberUseCase';
import BcryptAdapter from '@infra/adapters/bcrypt-adapter';
import ValidatorAdapter from '../adapters/classValidator-adapter';

export const changeEstablishmentPassControllerFactory = (): BaseController => {
  const establishmentRepository = createEstablishmentRepository();
  const emailUseCase = new ChangeEstablishmentPassByEmailUseCase(establishmentRepository);
  const numberUseCase = new ChangeEstablishmentPassByMobileNumberUseCase(establishmentRepository);
  const validator = new ValidatorAdapter();
  const bcryptHash = new BcryptAdapter();

  const controller = new ChangeEstablishmentPassController(emailUseCase, numberUseCase, validator, bcryptHash);

  return controller;
};
