"use client";

import { api, axiosClient } from "@/lib/axiosClient";
import { EventCard } from "./eventCard";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AppEventType } from "@/types/global.types";
import { useTranslations } from "next-intl";

const CATEGORY_LABELS: Record<string, string> = {
  CONCERT: "Conciertos",
  THEATER: "Teatro",
  SPORT: "Deportes",
  FESTIVAL: "Festivales",
  OTHER: "Otros",
};

export const EventList = () => {
  const [events, setEvents] = useState<AppEventType[]>([]);
  const t = useTranslations("home");

  const getEvents = async () => {
    try {
      const data = await api("/events");
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

  // Agrupar por categoría
  const groupedEvents = events.reduce(
    (acc, event) => {
      if (!acc[event.category]) acc[event.category] = [];
      acc[event.category].push(event);
      return acc;
    },
    {} as Record<string, AppEventType[]>,
  );

  return (
    <div className="my-6 space-y-10">
      <header>
        <h3 className="text-3xl font-bold tracking-tight">{t("title")}</h3>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </header>

      {Object.entries(groupedEvents).length ? (
        Object.entries(groupedEvents).map(([category, items]) => (
          <section key={category} className="space-y-4">
            <h4 className="border-l-4 border-primary pl-2 text-xl font-semibold">
              {CATEGORY_LABELS[category] ?? category}
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className="text-center text-muted-foreground">{t("not_found")}</p>
      )}
    </div>
  );
};
