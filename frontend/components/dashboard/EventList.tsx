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

export const EventList = () => {
  const [fetching, setFetching] = useState(false);
  const [events, setEvents] = useState([]);

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
          <CardTitle>Events</CardTitle>
          <CardDescription>
            Here you can see the list of events.
          </CardDescription>
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
          <p className="text-center text-muted-foreground">No events found.</p>
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
    <Card className="w-[14rem]">
      <CardHeader>
        <img
          width={200}
          height={400}
          src="https://placehold.co/600x400"
          alt={event.name}
          className="rounded-lg object-cover"
        />
        <CardTitle>{event.name}</CardTitle>
        <CardDescription className="line-clamp-1">
          {formatDistanceToNow(event.date, { addSuffix: true })} -{" "}
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
