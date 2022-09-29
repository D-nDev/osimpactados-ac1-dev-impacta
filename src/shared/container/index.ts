import 'reflect-metadata';
import { container } from 'tsyringe';
import BcryptAdapter from '@infra/adapters/bcrypt-adapter';
import EmailAdapter from '@infra/adapters/email-adapter';
import IORedisAdapter from '@infra/adapters/ioredis-adapter';
import jwtAdapter from '@infra/adapters/jwt-adapter';
import MomentAdapter from '@infra/adapters/moment-adapter';
import PinoAdapter from '@infra/adapters/pino-adapter';
import TwilioAdapter from '@infra/adapters/twilio-adapter';
import { Mapper } from '@infra/mappers/userMapper';
import UserRepository from '@infra/orm/prismaorm/repositories/UserRepository';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '@application/ports/userRepository';
import ValidatorAdapter from '@infra/adapters/classValidator-adapter';
import IsAdminMiddleware from '@presentation/middlewares/isAdminMiddleware';
import AzureBlobAdapter from '@infra/adapters/azureblob-adapter';
import IsAuthUserMiddleware from '@presentation/middlewares/isAuthUserMiddleware';
import UUIDProvider from '@infra/adapters/uuid-adapter';
import { TwoFactorAdapter } from '@infra/adapters/2fa-adapter';
import StartObservabilityMiddleware from '@presentation/middlewares/StartObservabilityMiddleware';

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
});

const userRepositoryClass = new UserRepository(prisma);
export const jwtAdapterInstance = container.resolve(jwtAdapter);
export const uuidAdapterInstance = container.resolve(UUIDProvider);
export const bcryptAdapterInstance = container.resolve(BcryptAdapter);
export const emailAdapterInstance = container.resolve(EmailAdapter);
export const ioredisAdapterInstance = container.resolve(IORedisAdapter);
export const momentAdapterInstance = container.resolve(MomentAdapter);
export const pinoAdapterInstance = container.resolve(PinoAdapter);
export const twilioAdapterInstance = container.resolve(TwilioAdapter);
export const mapperAdapterInstance = container.resolve(Mapper);
export const validatorAdapterInstance = container.resolve(ValidatorAdapter);
export const azureblobAdapterInstance = container.resolve(AzureBlobAdapter);
export const twofactorAdapterInstance = container.resolve(TwoFactorAdapter);
export const observabilityMiddlewareInstance = container.resolve(StartObservabilityMiddleware);
const userRepositoryRegisterInstance = container.registerInstance('UserRepository', userRepositoryClass);
export const userRepositoryInstance = userRepositoryRegisterInstance.resolve<IUserRepository>('UserRepository');

const isAdminMiddlewareClass = new IsAdminMiddleware(jwtAdapterInstance);

const isAdminMiddlewareRegisterInstance = container.registerInstance('AdminMiddleware', isAdminMiddlewareClass);
export const isAdminMiddlewareInstance =
  isAdminMiddlewareRegisterInstance.resolve<IsAdminMiddleware>('AdminMiddleware');

const isAuthUserMiddlewareClass = new IsAuthUserMiddleware(jwtAdapterInstance);

const isAuthUserMiddlewareRegisterInstance = container.registerInstance(
  'AuthUserMiddleware',
  isAuthUserMiddlewareClass,
);
export const isAuthUserMiddlewareInstance =
  isAuthUserMiddlewareRegisterInstance.resolve<IsAuthUserMiddleware>('AuthUserMiddleware');
