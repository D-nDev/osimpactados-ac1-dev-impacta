import 'reflect-metadata';
import { container } from 'tsyringe';
import BcryptAdapter from '@infra/adapters/bcrypt-adapter';
import EmailAdapter from '@infra/adapters/email-adapter';
import IORedisAdapter from '@infra/adapters/ioredis-adapter';
import jwtAdapter from '@infra/adapters/jwt-adapter';
import MomentAdapter from '@infra/adapters/moment-adapter';
import PinoAdapter from '@infra/adapters/pino-adapter';
import TwilioAdapter from '@infra/adapters/twilio-adapter';
import { Mapper } from '@infra/mappers/establishmentMapper';
import EstablishmentRepository from '@infra/orm/prismaorm/repositories/EstablishmentRepository';
import { PrismaClient } from '@prisma/client';
import { IEstablishmentRepository } from '@application/ports/establishmentRepository';
import ValidatorAdapter from '@infra/adapters/classValidator-adapter';
import IsAdminMiddleware from '@app/presentation/middlewares/isAdminMiddleware';

const prisma = new PrismaClient();

const establishmentRepositoryClass = new EstablishmentRepository(prisma);
export const jwtAdapterInstance = container.resolve(jwtAdapter);
export const bcryptAdapterInstance = container.resolve(BcryptAdapter);
export const emailAdapterInstance = container.resolve(EmailAdapter);
export const ioredisAdapterInstance = container.resolve(IORedisAdapter);
export const momentAdapterInstance = container.resolve(MomentAdapter);
export const pinoAdapterInstance = container.resolve(PinoAdapter);
export const twilioAdapterInstance = container.resolve(TwilioAdapter);
export const mapperAdapterInstance = container.resolve(Mapper);
export const validatorAdapterInstance = container.resolve(ValidatorAdapter);
const establishmentRepositoryRegisterInstance = container.registerInstance(
  'EstablishmentRepository',
  establishmentRepositoryClass,
);
export const establishmentRepositoryInstance =
  establishmentRepositoryRegisterInstance.resolve<IEstablishmentRepository>('EstablishmentRepository');

const isAdminMiddlewareClass = new IsAdminMiddleware(jwtAdapterInstance);

const isAdminMiddlewareRegisterInstance = container.registerInstance('AdminMiddleware', isAdminMiddlewareClass);
export const isAdminMiddlewareInstance =
  isAdminMiddlewareRegisterInstance.resolve<IsAdminMiddleware>('AdminMiddleware');
