import events from "@/lib/placeholders/events";
import { EventCard } from "./eventCard";

export const EventList = () => {
  return (
    <div>
      <header>
        <h3 className="text-2xl font-bold">Hot Events</h3>
        <p className="text-sm text-muted-foreground">
          Check out these popular events happening soon.
        </p>
      </header>
      <div className="grid-cols1 my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
