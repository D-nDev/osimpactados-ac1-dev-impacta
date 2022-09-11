import CreateUserUseCase from '@usecases/createUserUseCase';
import { Mapper } from '@infra/mappers/userMapper';
import CreateUserController from '@presentation/controllers/CreateUserController';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import BcryptAdapter from '@infra/adapters/bcrypt-adapter';
import ValidatorAdapter from '../adapters/classValidator-adapter';
import { createUserRepository } from './CreateUserRepositoryFactory';
import SendValidationEmailUseCase from '@usecases/sendValidationEmailUseCase';
import EmailAdapter from '@infra/adapters/email-adapter';
import PinoAdapter from '@app/infra/adapters/pino-adapter';

export const createUserControllerFactory = (): BaseController => {
  const userRepository = createUserRepository();
  const encoder = new BcryptAdapter();
  const mailadapter = new EmailAdapter();
  const mapper = new Mapper();
  const useCase = new CreateUserUseCase(userRepository, encoder, mapper);
  const emailUseCase = new SendValidationEmailUseCase(mailadapter, userRepository);
  const validator = new ValidatorAdapter();
  const logger = new PinoAdapter();

  const controller = new CreateUserController(useCase, validator, emailUseCase, logger);

  return controller;
};
