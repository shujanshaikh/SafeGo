/*
  Warnings:

  - You are about to drop the column `locationA` on the `CrimeRate` table. All the data in the column will be lost.
  - You are about to drop the column `locationB` on the `CrimeRate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[crimeRateId]` on the table `CrimeRate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aimessage` to the `CrimeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crimeRateId` to the `CrimeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `CrimeRate` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `CrimeRate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CrimeRole" AS ENUM ('LOCATION', 'PERPLEXITY');

-- DropForeignKey
ALTER TABLE "CrimeRate" DROP CONSTRAINT "CrimeRate_userId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_userId_fkey";

-- DropIndex
DROP INDEX "CrimeRate_userId_key";

-- AlterTable
ALTER TABLE "CrimeRate" DROP COLUMN "locationA",
DROP COLUMN "locationB",
ADD COLUMN     "aimessage" TEXT NOT NULL,
ADD COLUMN     "crimeRateId" TEXT NOT NULL,
ADD COLUMN     "role" "CrimeRole" NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "locationId" TEXT NOT NULL,
    "locationA" TEXT NOT NULL,
    "locationB" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "weatherId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LocationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LocationToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationId_key" ON "Location"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Weather_weatherId_key" ON "Weather"("weatherId");

-- CreateIndex
CREATE INDEX "_LocationToUser_B_index" ON "_LocationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "CrimeRate_crimeRateId_key" ON "CrimeRate"("crimeRateId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrimeRate" ADD CONSTRAINT "CrimeRate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToUser" ADD CONSTRAINT "_LocationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToUser" ADD CONSTRAINT "_LocationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
