"use client";
import { OrderCard } from "@/components/orders/order-card";
import { axiosClient } from "@/lib/axiosClient";
import { AppOrderType } from "@/types/global.types";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [orders, setOrders] = useState<AppOrderType[]>([]);

  useEffect(() => {
    axiosClient
      .get("/users/orders")
      .then((res) => {
        const { data } = res;
        setOrders(data.order);
      })
      .catch((error: any) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="mb-2 font-mono text-3xl font-bold">My Orders</h2>
        <p className="font-mono text-muted-foreground">
          Manage your tickets and event orders.
        </p>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
