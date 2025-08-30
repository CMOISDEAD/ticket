/*
  Warnings:

  - Added the required column `regularPrice` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vipPrice` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "regularPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vipPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
