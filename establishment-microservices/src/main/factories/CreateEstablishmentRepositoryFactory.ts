import EstablishmentRepository from "@app/src/infra/orm/prismaorm/repositories/EstablishmentRepository";
import { PrismaClient } from "@prisma/client";

export function createEstablishmentRepository() {
  const prisma = new PrismaClient();

  return new EstablishmentRepository(prisma);
}