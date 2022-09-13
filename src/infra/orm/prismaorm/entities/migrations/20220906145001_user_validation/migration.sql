/*
  Warnings:

  - Added the required column `validate_code` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validate_expire_date` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "validate_code" TEXT NOT NULL,
ADD COLUMN     "validate_expire_date" TIMESTAMP(3) NOT NULL;
