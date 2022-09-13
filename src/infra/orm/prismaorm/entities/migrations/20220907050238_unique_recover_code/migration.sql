/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `RecoverCodes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RecoverCodes_token_key" ON "RecoverCodes"("token");
