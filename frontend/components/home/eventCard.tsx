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

type Props = {
  event: AppEventType;
};

export const EventCard = ({ event }: Props) => {
  return (
    <Card className="flex h-[28-rem] max-h-[28rem] flex-col justify-between">
      <CardHeader>
        <img
          width={600}
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
          <Button className="w-full">
            {event.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Button>
          <Button size="icon" variant="outline">
            <ShoppingCart />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
