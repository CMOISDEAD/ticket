"use client";

import { CategoryList } from "@/components/home/categoryList";
import { EventCarousel } from "@/components/home/event-carousel";
import { EventList } from "@/components/home/eventList";

export default function Home() {
  return (
    <div className="contianer mx-auto">
      <EventCarousel />
      <EventList />
      <CategoryList />
    </div>
  );
}
