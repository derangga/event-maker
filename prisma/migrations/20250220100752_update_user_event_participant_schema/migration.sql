-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "canceledAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
