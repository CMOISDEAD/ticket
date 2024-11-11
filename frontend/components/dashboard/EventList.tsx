"use client";

import { toast } from "@/hooks/use-toast";
import { axiosClient } from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { AppEventType } from "@/types/global.types";
import { formatDistanceToNow } from "date-fns";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { Pen, RefreshCw, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export const EventList = () => {
  const [fetching, setFetching] = useState(false);
  const [events, setEvents] = useState([]);
  const t = useTranslations("dashboard.events");

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setFetching(true);
      const response = await axiosClient.get("/events");
      setEvents(response.data);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setFetching(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await axiosClient.delete(`/events/${id}`);
      getEvents();
      toast({
        title: "Success 🎉",
        description: "Event removed successfully.",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Card className="w-2/3 overflow-auto">
      <CardHeader className="flex flex-row content-center justify-between">
        <div>
          <CardTitle>{t("overview.title")}</CardTitle>
          <CardDescription>{t("overview.description")}</CardDescription>
        </div>
        <Button size="icon" onClick={getEvents} disabled={fetching}>
          <RefreshCw className={fetching ? "animate-spin" : ""} />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 overflow-auto">
        {events.length ? (
          events.map((event: AppEventType) => (
            <EventsCard key={event.id} event={event} remove={handleRemove} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            {t("overview.not_found")}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const EventsCard = ({
  event,
  remove,
}: {
  event: AppEventType;
  remove: (id: string) => void;
}) => {
  return (
    <Card className="flex h-[25rem] max-h-[25rem] w-[14rem] flex-col justify-between">
      <CardHeader>
        <img
          src={event.poster}
          alt={event.name}
          className="max-h-[110px] w-full rounded-lg object-cover"
        />
        <CardTitle className="line-clamp-1">
          <Link href={`/events/${event.id}`}>{event.name}</Link>
        </CardTitle>
        <CardDescription>
          <ul>
            <li className="line-clamp-1">{event.address}</li>
            <li className="line-clamp-1">
              {formatDistanceToNow(event.date, { addSuffix: true })}
            </li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter>
        <ButtonGroup className="w-full">
          <Button size="icon" variant="outline" className="w-full">
            <Pen />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="w-full"
            onClick={() => remove(event.id)}
          >
            <Trash2 />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
