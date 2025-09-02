import { AppEventType } from "@/types/global.types";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { axiosClient } from "@/lib/axiosClient";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

type Props = {
  event: AppEventType;
};

export const EventCard = ({ event }: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  const { user } = useTicketStore((state) => state);

  const handleAdd = async () => {
    try {
      await axiosClient.put("/cart/add", {
        userId: user.id,
        eventId: event.id,
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

  useEffect(() => {
    // const check = user.cart.eventsIds?.includes(event.id);
    const check = false;
    setIsAdded(check);
  }, [user]);

  return (
    <Card className="flex h-[32rem] max-h-[32rem] flex-col justify-between">
      <CardHeader>
        <img
          src={event.poster}
          alt={event.name}
          className="max-h-[200px] w-full rounded-lg object-cover"
        />
        <CardTitle className="line-clamp-1">{event.name}</CardTitle>
        <CardDescription>
          <ul>
            <li className="line-clamp-1">{event.venue?.address}</li>
            <li className="line-clamp-1">
              {formatDistanceToNow(event.date, { addSuffix: true })}
            </li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{event.description}</p>
        <ul className="mt-4 space-y-1">
          <li>
            vip:{" "}
            {event.vipPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </li>
          <li>
            regular:{" "}
            {event.regularPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            })}
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <ButtonGroup className="w-full">
          <Button className="w-full">Comprar</Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleAdd}
            disabled={isAdded}
          >
            <ShoppingCart />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
