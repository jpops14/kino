/*
  Warnings:

  - You are about to drop the column `imdb_id` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `tmdb_id` on the `movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movie" DROP COLUMN "imdb_id",
DROP COLUMN "tmdb_id";
