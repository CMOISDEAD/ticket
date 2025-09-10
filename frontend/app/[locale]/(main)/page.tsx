"use client";

import { CategoryList } from "@/components/home/categoryList";
import { EventCarousel } from "@/components/home/event-carousel";
import { EventList } from "@/components/home/eventList";
import { UpcomingEvents } from "@/components/home/upcoming-events";

export default function Home() {
  return (
    <main>
      <EventCarousel />
      <UpcomingEvents />
      <EventList />
      <CategoryList />
    </main>
  );
}
