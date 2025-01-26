/*
  Warnings:

  - You are about to drop the column `paymemt_expires` on the `booking` table. All the data in the column will be lost.
  - Added the required column `payment_expires` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "paymemt_expires",
ADD COLUMN     "payment_expires" TIMESTAMP(3) NOT NULL;
