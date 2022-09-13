-- CreateEnum
CREATE TYPE "userType" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "userType" NOT NULL DEFAULT 'USER';
