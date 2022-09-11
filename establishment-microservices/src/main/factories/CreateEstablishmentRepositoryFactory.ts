import EstablishmentRepository from "@infra/orm/prismaorm/repositories/EstablishmentRepository";
import { PrismaClient } from "@prisma/client";

export function createEstablishmentRepository() {
  const prisma = new PrismaClient();

  return new EstablishmentRepository(prisma);
}