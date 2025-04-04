-- CreateEnum
CREATE TYPE "CrimeRole" AS ENUM ('LOCATION', 'PERPLEXITY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SYSTEM');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "messageId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "mapId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "CrimeRate" (
    "id" SERIAL NOT NULL,
    "crimeRateId" TEXT NOT NULL,
    "aimessage" TEXT NOT NULL,
    "role" "CrimeRole" NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CrimeRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LocationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LocationToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationId_key" ON "Location"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_messageId_key" ON "Messages"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Map_mapId_key" ON "Map"("mapId");

-- CreateIndex
CREATE UNIQUE INDEX "Weather_weatherId_key" ON "Weather"("weatherId");

-- CreateIndex
CREATE UNIQUE INDEX "CrimeRate_crimeRateId_key" ON "CrimeRate"("crimeRateId");

-- CreateIndex
CREATE INDEX "_LocationToUser_B_index" ON "_LocationToUser"("B");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
