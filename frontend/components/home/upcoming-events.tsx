"use client";

import { api } from "@/lib/axiosClient";
import { EventCard } from "./eventCard";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AppEventType } from "@/types/global.types";
import { useTranslations } from "next-intl";

export const UpcomingEvents = () => {
  const [events, setEvents] = useState<AppEventType[]>([]);
  const t = useTranslations("home");

  const getEvents = async () => {
    try {
      const data = await api("/events/upcoming");
      setEvents(data);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="my-6 space-y-10">
      <header>
        <h3 className="text-3xl font-bold">{t("upcoming.title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("upcoming.description")}
        </p>
      </header>
      {events.length ? (
        <div className="grid-cols1 my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">{t("not_found")}</p>
      )}
    </div>
  );
};
