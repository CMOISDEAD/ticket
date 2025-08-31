/*
  Warnings:

  - The `mpPaymentId` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mpPreferenceId` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "mpPaymentId",
ADD COLUMN     "mpPaymentId" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "mpPreferenceId",
ADD COLUMN     "mpPreferenceId" INTEGER NOT NULL DEFAULT 0;
