/*
  Warnings:

  - You are about to drop the column `userId` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lawyer" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "userId",
DROP COLUMN "userName",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
