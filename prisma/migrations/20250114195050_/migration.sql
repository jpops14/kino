/*
  Warnings:

  - Made the column `description` on table `movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genre` on table `movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "movie" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "genre" SET NOT NULL;

-- AlterTable
ALTER TABLE "room" ALTER COLUMN "information" DROP NOT NULL;
