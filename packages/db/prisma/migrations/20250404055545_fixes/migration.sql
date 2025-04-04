/*
  Warnings:

  - You are about to drop the column `aimessage` on the `CrimeRate` table. All the data in the column will be lost.
  - You are about to drop the column `crimeRateId` on the `CrimeRate` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `CrimeRate` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weather` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LocationToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `CrimeRate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationA` to the `CrimeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationB` to the `CrimeRate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CrimeRate" DROP CONSTRAINT "CrimeRate_userId_fkey";

-- DropForeignKey
ALTER TABLE "Map" DROP CONSTRAINT "Map_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Weather" DROP CONSTRAINT "Weather_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Weather" DROP CONSTRAINT "Weather_userId_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToUser" DROP CONSTRAINT "_LocationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToUser" DROP CONSTRAINT "_LocationToUser_B_fkey";

-- DropIndex
DROP INDEX "CrimeRate_crimeRateId_key";

-- AlterTable
ALTER TABLE "CrimeRate" DROP COLUMN "aimessage",
DROP COLUMN "crimeRateId",
DROP COLUMN "role",
ADD COLUMN     "locationA" TEXT NOT NULL,
ADD COLUMN     "locationB" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Weather";

-- DropTable
DROP TABLE "_LocationToUser";

-- DropEnum
DROP TYPE "CrimeRole";

-- CreateIndex
CREATE UNIQUE INDEX "CrimeRate_userId_key" ON "CrimeRate"("userId");

-- AddForeignKey
ALTER TABLE "CrimeRate" ADD CONSTRAINT "CrimeRate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
