/*
  Warnings:

  - You are about to drop the column `verified` on the `MagicToken` table. All the data in the column will be lost.
  - Made the column `deviceId` on table `MagicToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MagicToken" DROP COLUMN "verified",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "deviceId" SET NOT NULL;
