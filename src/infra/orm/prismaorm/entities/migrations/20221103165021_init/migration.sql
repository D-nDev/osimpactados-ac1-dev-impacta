-- CreateEnum
CREATE TYPE "userType" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "type" "userType" NOT NULL DEFAULT 'USER',
    "validate_code" TEXT,
    "validate_expire_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "twofactor_enabled" BOOLEAN NOT NULL DEFAULT false,
    "twofactor_secret" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecoverCodes" (
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_blacklisted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RecoverCodes_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressNumber" INTEGER NOT NULL,
    "addressComplement" TEXT,
    "addressDistrict" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RecoverCodes_token_key" ON "RecoverCodes"("token");

-- CreateIndex
CREATE UNIQUE INDEX "RecoverCodes_userId_key" ON "RecoverCodes"("userId");

-- AddForeignKey
ALTER TABLE "RecoverCodes" ADD CONSTRAINT "RecoverCodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
