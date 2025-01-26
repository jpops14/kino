/*
  Warnings:

  - Added the required column `paymemt_expires` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "paymemt_expires" TIMESTAMP(3) NOT NULL;
