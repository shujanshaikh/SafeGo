/*
  Warnings:

  - You are about to drop the column `messageId` on the `Messages` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Messages_messageId_key";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "messageId";
