"use client";

import { axiosClient } from "@/lib/axiosClient";
import { EventCard } from "./eventCard";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AppEventType } from "@/types/global.types";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export const EventList = () => {
  const [events, setEvents] = useState<AppEventType[]>([]);
  const t = useTranslations("home");

  const getEvents = async () => {
    try {
      const response = await axiosClient.get("/events");
      console.log(response.data);
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
        <h3 className="text-2xl font-bold">{t("title")}</h3>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </header>
      {events.length ? (
        <div className="grid-cols1 my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <Link href={`/events/${event.id}`}>
              <EventCard key={event.id} event={event} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">{t("not_found")}</p>
      )}
    </div>
  );
};
