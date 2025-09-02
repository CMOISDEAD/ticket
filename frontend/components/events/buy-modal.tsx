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
import { CreditCard, Loader, Minus, Plus } from "lucide-react";
import { AppEventType } from "@/types/global.types";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { axiosClient } from "@/lib/axiosClient";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface Props {
  event: AppEventType;
  userId: string;
}

export const BuyModal = ({ userId, event }: Props) => {
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
    if (total === 0) return;
    axiosClient
      .post("/orders", {
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
      })
      .then((res) => {
        setOrderLoading(true);
        setOrderId(res.data.id);
        setPaymentDisabled(false);
        toast({
          title: "Order generated successfully",
          description: "Check it on orders page.",
        });
        console.log(res);
      })
      .catch((error: any) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error generating order",
          description: "Failed to generate user order",
        });
        setOrderLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          Buy
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select your tickets</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="flex content-center items-center gap-2">
            <Button
              size="icon"
              onClick={() => {
                if (vip > 0) setVip((prev) => prev - 1);
              }}
            >
              <Minus className="size-4" />
            </Button>
            <p>vip: {vip}</p>
            <Button
              size="icon"
              onClick={() => {
                if (vip < event.vipAvailable) setVip((prev) => prev + 1);
              }}
            >
              <Plus className="size-4" />
            </Button>

            <p className="text-sm text-muted-foreground">
              Avaible: {event.vipAvailable}
            </p>
          </div>
          <div className="flex content-center items-center gap-2">
            <Button
              size="icon"
              onClick={() => {
                if (regular > 0) setRegular((prev) => prev - 1);
              }}
            >
              <Minus className="size-4" />
            </Button>
            <p>regular: {regular}</p>
            <Button
              size="icon"
              onClick={() => {
                if (regular < event.regularAvailable)
                  setRegular((prev) => prev + 1);
              }}
            >
              <Plus className="size-4" />
            </Button>
            <p className="text-sm text-muted-foreground">
              regular: {event.regularAvailable}
            </p>
          </div>
          <Separator />
          <p>
            Total:{" "}
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <DialogFooter>
          <Button
            onClick={generateOrder}
            disabled={total === 0 || orderLoading}
            className="flex items-center gap-4"
          >
            {orderLoading && <Loader className="size-4" />}
            Generate Order
          </Button>
          <Button disabled={paymentDisabled}>
            <Link href={`/orders/${orderId}`}>Pay Order</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
