/*
  Warnings:

  - Added the required column `price` to the `screening` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "screening" ADD COLUMN     "price" INTEGER NOT NULL;
