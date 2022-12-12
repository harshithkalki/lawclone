/*
  Warnings:

  - You are about to drop the column `balance` on the `Lawyer` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Lawyer` table. All the data in the column will be lost.
  - The `services` column on the `Lawyer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lawyer" DROP COLUMN "balance",
DROP COLUMN "fullName",
DROP COLUMN "services",
ADD COLUMN     "services" TEXT[];

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
