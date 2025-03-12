/*
  Warnings:

  - The primary key for the `MagicToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MagicToken` table. All the data in the column will be lost.
  - Added the required column `otp` to the `MagicToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MagicToken" DROP CONSTRAINT "MagicToken_email_fkey";

-- DropIndex
DROP INDEX "MagicToken_token_key";

-- AlterTable
ALTER TABLE "MagicToken" DROP CONSTRAINT "MagicToken_pkey",
DROP COLUMN "id",
ADD COLUMN     "deviceId" TEXT,
ADD COLUMN     "otp" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "MagicToken_pkey" PRIMARY KEY ("token");
