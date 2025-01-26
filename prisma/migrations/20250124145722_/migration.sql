-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transaction_id" TEXT;
