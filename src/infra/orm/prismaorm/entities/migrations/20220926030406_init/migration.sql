-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twofactor_enabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twofactor_secret" TEXT;
