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
import { Button } from "../ui/button";
import { Pen, RefreshCw, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const EventList = ({ onEdit }: { onEdit: (id: string) => void }) => {
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
      <CardHeader>
        <Button size="icon" onClick={() => getEvents()}>
          <RefreshCw className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        {events.map((event: AppEventType) => (
          <Card key={event.id} className="flex w-[14rem] flex-col">
            <CardHeader>
              <img
                src={event.poster}
                alt={event.name}
                className="h-[100px] w-full object-cover"
              />
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>
                {new Date(event.date).toLocaleDateString()} <br />
                VIP: ${event.vipPrice} / {event.vipCapacity}
                <br />
                REG: ${event.regularPrice} / {event.regularCapacity}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">{event.description}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={() => onEdit(event.id)}>
                <Pen />
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleRemove(event.id)}
              >
                <Trash2 />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
