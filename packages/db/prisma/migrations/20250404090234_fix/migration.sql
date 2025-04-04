/*
  Warnings:

  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_LocationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LocationToUser" DROP CONSTRAINT "_LocationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocationToUser" DROP CONSTRAINT "_LocationToUser_B_fkey";

-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_LocationToUser";
