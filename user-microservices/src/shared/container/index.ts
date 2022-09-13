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
import IsAdminMiddleware from '@app/presentation/middlewares/isAdminMiddleware';

const prisma = new PrismaClient();

const userRepositoryClass = new UserRepository(prisma);
export const jwtAdapterInstance = container.resolve(jwtAdapter);
export const bcryptAdapterInstance = container.resolve(BcryptAdapter);
export const emailAdapterInstance = container.resolve(EmailAdapter);
export const ioredisAdapterInstance = container.resolve(IORedisAdapter);
export const momentAdapterInstance = container.resolve(MomentAdapter);
export const pinoAdapterInstance = container.resolve(PinoAdapter);
export const twilioAdapterInstance = container.resolve(TwilioAdapter);
export const mapperAdapterInstance = container.resolve(Mapper);
export const validatorAdapterInstance = container.resolve(ValidatorAdapter);
const userRepositoryRegisterInstance = container.registerInstance('UserRepository', userRepositoryClass);
export const userRepositoryInstance = userRepositoryRegisterInstance.resolve<IUserRepository>('UserRepository');

const isAdminMiddlewareClass = new IsAdminMiddleware(jwtAdapterInstance);

const isAdminMiddlewareRegisterInstance = container.registerInstance('AdminMiddleware', isAdminMiddlewareClass);
export const isAdminMiddlewareInstance =
  isAdminMiddlewareRegisterInstance.resolve<IsAdminMiddleware>('AdminMiddleware');
