/*
  Warnings:

  - You are about to drop the column `email` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - The required column `session` was added to the `Session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "email",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "session" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Event_title_categoryId_location_scheduledAt_idx" ON "Event"("title", "categoryId", "location", "scheduledAt");

-- CreateIndex
CREATE INDEX "Participant_userId_idx" ON "Participant"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "SocialMedia_userId_idx" ON "SocialMedia"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserBlacklist_userId_idx" ON "UserBlacklist"("userId");
