/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `poster` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullnames` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastnames` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "poster" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "name",
ADD COLUMN     "fullnames" TEXT NOT NULL,
ADD COLUMN     "lastnames" TEXT NOT NULL;
