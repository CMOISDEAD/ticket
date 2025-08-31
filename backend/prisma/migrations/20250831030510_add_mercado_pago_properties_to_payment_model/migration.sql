/*
  Warnings:

  - The values [CARD] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ammount` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."OrderStatus" ADD VALUE 'EXPIRED';

-- AlterEnum
BEGIN;
CREATE TYPE "public"."PaymentMethod_new" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'TRANSFER', 'PSE', 'OTHER');
ALTER TABLE "public"."Payment" ALTER COLUMN "method" TYPE "public"."PaymentMethod_new" USING ("method"::text::"public"."PaymentMethod_new");
ALTER TYPE "public"."PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "public"."PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "public"."PaymentMethod_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."PaymentStatus" ADD VALUE 'CANCELLED';
ALTER TYPE "public"."PaymentStatus" ADD VALUE 'REFUNDED';
ALTER TYPE "public"."PaymentStatus" ADD VALUE 'EXPIRED';

-- AlterEnum
ALTER TYPE "public"."TicketStatus" ADD VALUE 'EXPIRED';

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "ammount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mpCurrency" TEXT NOT NULL DEFAULT 'COP',
ADD COLUMN     "mpNetReceivedAmount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "mpPreferenceId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "mpStatusDetail" TEXT DEFAULT '',
ADD COLUMN     "mpTransactionAmount" DOUBLE PRECISION DEFAULT 0;
