/*
  Warnings:

  - Added the required column `year` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "movie_imdb_id_key";

-- DropIndex
DROP INDEX "movie_tmdb_id_key";

-- AlterTable
ALTER TABLE "movie" ADD COLUMN     "director" TEXT,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "year" INTEGER NOT NULL,
ALTER COLUMN "tmdb_id" DROP NOT NULL,
ALTER COLUMN "imdb_id" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
