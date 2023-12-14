/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "accounts_token_key" ON "accounts"("token");
