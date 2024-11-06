"use client";

import { axiosClient } from "@/lib/axiosClient";
import { EventCard } from "./eventCard";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AppEventType } from "@/types/global.types";

export const EventList = () => {
  const [events, setEvents] = useState<AppEventType[]>([]);

  const getEvents = async () => {
    try {
      const response = await axiosClient.get("/events");
      setEvents(response.data);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="my-4">
      <header>
        <h3 className="text-2xl font-bold">Hot Events</h3>
        <p className="text-sm text-muted-foreground">
          Check out these popular events happening soon.
        </p>
      </header>
      {events.length ? (
        <div className="grid-cols1 my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No events found.</p>
      )}
    </div>
  );
};
