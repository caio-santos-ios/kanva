-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "isValidated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token" TEXT NOT NULL DEFAULT '';
