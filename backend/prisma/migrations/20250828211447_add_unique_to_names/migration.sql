/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "public"."Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_name_key" ON "public"."Venue"("name");
