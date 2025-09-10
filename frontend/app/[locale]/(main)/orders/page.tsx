"use client";
import { Overview } from "@/components/cart/overview";
import { OrderCard } from "@/components/orders/order-card";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axiosClient";
import { AppOrderType } from "@/types/global.types";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [orders, setOrders] = useState<AppOrderType[]>([]);

  useEffect(() => {
    api("/users/orders")
      .then((data) => {
        setOrders(data.order);
      })
      .catch((error: any) => {
        console.error(error);
        toast({
          title: "error fetching your orders",
          description: `${error}`,
        });
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="mb-2 font-mono text-3xl font-bold">My Orders</h2>
        <p className="font-mono text-muted-foreground">
          Manage your tickets and event orders.
        </p>
      </div>

      <div className="flex gap-4">
        <Overview />
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          {orders.length ? (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <p className="text-muted-foreground">You already have no orders</p>
          )}
        </div>
      </div>
    </div>
  );
}
