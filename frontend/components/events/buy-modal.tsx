import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CreditCard, Loader, Minus, Plus, Ticket } from "lucide-react";
import { AppEventType } from "@/types/global.types";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { api } from "@/lib/axiosClient";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useTicketStore } from "@/store/useTicketStore";

interface Props {
  event: AppEventType;
  userId: string;
  children: any;
}

export const BuyModal = ({ userId, event, children }: Props) => {
  const { isAuth } = useTicketStore((state) => state);
  const [total, setTotal] = useState(0);
  const [regular, setRegular] = useState(0);
  const [vip, setVip] = useState(0);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentDisabled, setPaymentDisabled] = useState(true);

  useEffect(() => {
    setTotal(regular * event.regularPrice + vip * event.vipPrice);
  }, [regular, vip]);

  const generateOrder = () => {
    if (!isAuth)
      return toast({
        title: "You are not logged",
        description: "Login in your account",
      });
    if (total === 0) return;
    api("/orders", {
      method: "POST",
      data: {
        eventId: event.id,
        userId,
        total,
        tickets: [
          {
            type: "VIP",
            quantity: vip,
          },
          {
            type: "REGULAR",
            quantity: regular,
          },
        ],
      },
    })
      .then((data) => {
        setOrderLoading(true);
        setOrderId(data.id);
        setPaymentDisabled(false);
        toast({
          title: "Order generated successfully",
          description: "Check it on orders page.",
        });
        console.log(data);
      })
      .catch((error: any) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error generating order",
          description: `${error}`,
        });
        setOrderLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl">Select Tickets</DialogTitle>
          <DialogDescription>
            Choose the number of tickets you'd like to purchase for this event.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <TicketCard
            type="VIP"
            price={event.vipPrice}
            quantity={vip}
            available={event.vipAvailable}
            onIncrease={() => {
              if (vip < event.vipAvailable) setVip((prev) => prev + 1);
            }}
            onDecrease={() => {
              if (vip > 0) setVip((prev) => prev - 1);
            }}
          />

          <TicketCard
            type="Regular"
            price={event.regularPrice}
            quantity={regular}
            available={event.regularAvailable}
            onIncrease={() => {
              if (regular < event.regularAvailable)
                setRegular((prev) => prev + 1);
            }}
            onDecrease={() => {
              if (regular > 0) setRegular((prev) => prev - 1);
            }}
          />

          {total > 0 && (
            <>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold">
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            onClick={generateOrder}
            disabled={total === 0 || orderLoading}
            className="flex-1"
            size="lg"
          >
            {orderLoading ? (
              <>
                <Loader className="mr-2 size-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 size-4" />
                Generate Order
              </>
            )}
          </Button>

          {!paymentDisabled && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex-1 bg-transparent"
            >
              <Link href={`/orders/${orderId}`}>Pay Order</Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TicketCard = ({
  type,
  price,
  quantity,
  available,
  onIncrease,
  onDecrease,
}: {
  type: string;
  price: number;
  quantity: number;
  available: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) => {
  return (
    <div className="space-y-3 border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="size-4 text-muted-foreground" />
          <h3 className="font-medium capitalize">{type}</h3>
        </div>
        <div className="text-right">
          <p className="font-semibold">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="text-xs text-muted-foreground">{available} available</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-8 bg-transparent"
            onClick={onDecrease}
            disabled={quantity === 0}
          >
            <Minus className="size-3" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-8 bg-transparent"
            onClick={onIncrease}
            disabled={quantity >= available}
          >
            <Plus className="size-3" />
          </Button>
        </div>

        {quantity > 0 && (
          <div className="text-right">
            <p className="text-sm font-medium">
              {(quantity * price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {quantity} ×{" "}
              {price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
