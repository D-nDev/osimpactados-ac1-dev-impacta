import 'reflect-metadata';
import { container } from 'tsyringe';
import EmailAdapter from '@infra/adapters/email-adapter';
import jwtAdapter from '@infra/adapters/jwt-adapter';
import MomentAdapter from '@infra/adapters/moment-adapter';
import PinoAdapter from '@infra/adapters/pino-adapter';
import PurchaseRepository from '@infra/orm/prismaorm/repositories/PurchaseRepository';
import { PrismaClient } from '@prisma/client';
import { IPurchaseRepository } from '@application/ports/purchaseRepository';
import ValidatorAdapter from '@infra/adapters/classValidator-adapter';
import IsAdminMiddleware from '@presentation/middlewares/isAdminMiddleware';
import IsAuthUserMiddleware from '@presentation/middlewares/isAuthUserMiddleware';
import UUIDProvider from '@infra/adapters/uuid-adapter';
import StartObservabilityMiddleware from '@presentation/middlewares/StartObservabilityMiddleware';
import MercadoPagoAdapter from '@infra/adapters/mercadopago-adapter';

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
});

const purchaseRepositoryClass = new PurchaseRepository(prisma);
export const jwtAdapterInstance = container.resolve(jwtAdapter);
export const uuidAdapterInstance = container.resolve(UUIDProvider);
export const emailAdapterInstance = container.resolve(EmailAdapter);
export const momentAdapterInstance = container.resolve(MomentAdapter);
export const pinoAdapterInstance = container.resolve(PinoAdapter);
export const validatorAdapterInstance = container.resolve(ValidatorAdapter);
export const observabilityMiddlewareInstance = container.resolve(StartObservabilityMiddleware);
export const mercadopagoAdapterInstance = container.resolve(MercadoPagoAdapter);
const purchaseRepositoryRegisterInstance = container.registerInstance('PurchaseRepository', purchaseRepositoryClass);
export const purchaseRepositoryInstance =
  purchaseRepositoryRegisterInstance.resolve<IPurchaseRepository>('PurchaseRepository');

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
