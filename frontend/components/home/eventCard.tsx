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
import { ReceiptJapaneseYen, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BuyModal } from "../events/buy-modal";

type Props = {
  event: AppEventType;
};

export const EventCard = ({ event }: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  const { isAuth, user } = useTicketStore((state) => state);

  const handleAdd = async () => {
    if (!isAuth)
      return toast({
        title: "First enter in your account",
        description: "You are not logged.",
      });
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
          className="max-h-[200px] w-full object-cover"
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
              currency: "COP",
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
          <Button className="w-full" asChild>
            <Link href={`/events/${event.id}`}>Comprar</Link>
          </Button>
          <BuyModal event={event} userId={user.id}>
            <Button variant="ghost" size="icon" disabled={isAdded}>
              <ReceiptJapaneseYen className="h-4 w-4" />
            </Button>
          </BuyModal>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
