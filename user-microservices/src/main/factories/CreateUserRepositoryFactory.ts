import UserRepository from "@infra/orm/prismaorm/repositories/UserRepository";
import { PrismaClient } from "@prisma/client";

export function createUserRepository() {
  const prisma = new PrismaClient();

  return new UserRepository(prisma);
}