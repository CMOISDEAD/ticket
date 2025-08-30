/*
  Warnings:

  - You are about to drop the column `seat` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `regularAvailable` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regularCapacity` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vipAvailable` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vipCapacity` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "regularAvailable" INTEGER NOT NULL,
ADD COLUMN     "regularCapacity" INTEGER NOT NULL,
ADD COLUMN     "vipAvailable" INTEGER NOT NULL,
ADD COLUMN     "vipCapacity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Ticket" DROP COLUMN "seat";
