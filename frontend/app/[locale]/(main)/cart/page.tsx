"use client";

import { Option, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Overview } from "@/components/cart/overview";
import { axiosClient } from "@/lib/axiosClient";
import { useTicketStore } from "@/store/useTicketStore";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AppCartType, AppEventType } from "@/types/global.types";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Component() {
  const [cart, setCart] = useState<AppCartType>();
  const { user, fetchUser } = useTicketStore((state) => state);
  const t = useTranslations("cart");

  const handleCart = async () => {
    if (!user.id) return console.log(user);
    try {
      const response = await axiosClient.get(`/cart/${user.id}`);
      console.log(response.data);
      setCart(response.data);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch cart",
      });
    }
  };

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6 lg:flex-row">
        <Overview cart={cart} setCart={setCart} />
        <div className="w-full lg:w-2/3">
          <h2 className="mb-4 text-2xl font-bold">{t("title")}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("detail")}</TableHead>
                <TableHead>{t("price")}</TableHead>
                <TableHead>{t("action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart && cart.eventsIds.length ? (
                cart.eventsIds.map((cart) => <CartRow key={cart} id={cart} />)
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    {t("not_found")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

const CartRow = ({ id }: { id: string }) => {
  const { user, fetchUser } = useTicketStore((state) => state);
  const [error, setError] = useState<boolean>(false);
  const [event, setEvent] = useState<AppEventType>();
  const t = useTranslations("cart");

  const handleDelete = async () => {
    try {
      await axiosClient.put("/cart/removeitem", {
        userId: user.id,
        eventId: id,
      });
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
      await fetchUser();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item from cart",
      });
    }
  };

  const handleEvent = async () => {
    try {
      console.log(id);
      const response = await axiosClient.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    handleEvent();
  }, []);

  if (error)
    return (
      <TableRow>
        <TableCell colSpan={4}>error</TableCell>
      </TableRow>
    );

  if (!event)
    return (
      <TableRow>
        <TableCell colSpan={4}>
          <Skeleton className="h-14 w-full rounded-xl" />
        </TableCell>
      </TableRow>
    );

  return (
    <TableRow key={event.id}>
      <TableCell>
        <Link href={`/events/${event.id}`}>
          <div className="flex items-center space-x-3">
            <img
              src={event.poster}
              alt={event.name}
              className="h-10 w-16 rounded object-cover"
            />
            <div>
              <div className="font-bold">{event.name}</div>
              <div className="text-sm text-gray-500">Year: 2024</div>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">
          <Option className="mr-1 h-3 w-3" />
          {event.type}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="font-bold">${event.price}</div>
      </TableCell>
      <TableCell>
        <Button size="icon" variant="destructive" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
