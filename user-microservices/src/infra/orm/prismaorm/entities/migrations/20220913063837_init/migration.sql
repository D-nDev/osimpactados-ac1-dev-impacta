-- DropForeignKey
ALTER TABLE "RecoverCodes" DROP CONSTRAINT "RecoverCodes_userId_fkey";

-- AddForeignKey
ALTER TABLE "RecoverCodes" ADD CONSTRAINT "RecoverCodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
