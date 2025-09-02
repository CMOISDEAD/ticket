"use client";

import QRCode from "react-qr-code";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosClient } from "@/lib/axiosClient";
import { AppEventType } from "@/types/global.types";
import { CalendarIcon, Loader2, MapPinIcon, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { BuyModal } from "@/components/events/buy-modal";

export default function Page() {
  const t = useTranslations("events");
  const { user } = useTicketStore((state) => state);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<AppEventType | null>(null);

  const { id } = useParams();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    // const check = user.cart.eventsIds?.includes(id as string);
    const check = false;
    setIsAdded(check);

    axiosClient
      .get(`/events/${id}`)
      .then((response) => {
        setIsLoading(true);
        setEvent(response.data);
      })
      .catch((error) => {
        console.error(error);
        router.push("/404");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  const handleAdd = async () => {
    try {
      await axiosClient.put("/cart/add", {
        userId: user.id,
        eventId: id,
      });
      setIsAdded(true);
      toast({
        title: "Added to cart",
        description: "Event added to cart",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error adding to cart",
        description: "Failed to add to cart",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        {isLoading && <Loader2 className="h-7 w-7 animate-spin" />}
        {!isLoading && event ? (
          <div className="relative md:flex">
            <div className="flex h-full flex-col gap-8 md:w-1/3">
              <AspectRatio ratio={1 / 1}>
                <img
                  src={event.poster}
                  alt="Event poster"
                  className="w-full object-cover"
                />
              </AspectRatio>
              <div className="flex w-fit items-center justify-center bg-stone-50 p-2">
                <QRCode
                  viewBox={`0 0 256 256`}
                  value={`http://localhost:3000${path}`}
                  className="h-60 w-60"
                />
              </div>
            </div>
            <div className="flex-1 md:p-6">
              <CardHeader>
                <div className="flex flex-col items-start justify-between md:flex-row">
                  <div>
                    <CardTitle className="mb-2 text-3xl font-bold">
                      {event.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mb-4">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <ul>
                      <li>
                        <p className="text-2xl font-bold">
                          {event.regularPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                      </li>
                      <li>
                        <p className="text-2xl font-bold">
                          {event.vipPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                      </li>
                    </ul>

                    <p className="text-sm text-muted-foreground">
                      {t("per_person")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{event.description}</p>
                <div className="mb-2 flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {formatDistanceToNow(event.date, { addSuffix: true })}
                  </span>
                </div>
                <div className="mb-4 flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  <span>{event.name}</span>
                </div>
                <div className="mb-6">
                  <h3 className="mb-2 font-semibold">{t("seats")}</h3>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src="https://ssearenabelfast.s3.amazonaws.com/ARENA_MAPS_5LOS-02.png"
                      alt="seat selection"
                      className="aspect-video"
                    />
                  </AspectRatio>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full flex-col gap-2">
                  <Button
                    className="w-full"
                    onClick={handleAdd}
                    disabled={isAdded}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {t("cart")}
                  </Button>
                  <BuyModal event={event} userId={user.id} />
                </div>
              </CardFooter>
            </div>
          </div>
        ) : (
          <p>{t("not_found")}</p>
        )}
      </Card>
    </div>
  );
}
