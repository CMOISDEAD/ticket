"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Ticket,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AppOrderType } from "@/types/global.types";
import { api } from "@/lib/axiosClient";

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
    case "APPROVED":
    case "SOLD":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "CANCELLED":
    case "REJECTED":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "EXPIRED":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    case "REFUNDED":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [order, setOrder] = useState<AppOrderType | null>(null);
  const [loading, setLoading] = useState(false);

  const orderId = params.id as string;

  useEffect(() => {
    api(`/orders/${orderId}`)
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: `Error fetching order with ${orderId}`,
        });
      });
  }, []);

  const handleStatusUpdate = async (newStatus: string) => {};

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order #{order.id.slice(-6)}
          </h1>
          <p className="text-muted-foreground">
            Created on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="ml-auto">
          <Badge className={getStatusColor(order.status)} variant="secondary">
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Order Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-lg font-bold">
                {formatCurrency(order.total)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tickets</span>
              <span>
                {order.tickets!.length} ticket
                {order.tickets!.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge
                className={getStatusColor(order.status)}
                variant="secondary"
              >
                {order.status}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="flex space-x-2">
                {order.status === "PENDING" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate("COMPLETED")}
                      disabled={loading}
                    >
                      Mark Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate("CANCELLED")}
                      disabled={loading}
                    >
                      Cancel Order
                    </Button>
                  </>
                )}
                {order.status === "COMPLETED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusUpdate("CANCELLED")}
                    disabled={loading}
                  >
                    Refund Order
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {order.user!.fullnames.charAt(0)}
                  {order.user!.lastnames.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {order.user!.fullnames} {order.user!.lastnames}
                </h3>
                <p className="text-muted-foreground">{order.user!.email}</p>
                <p className="text-muted-foreground">{order.user!.phone}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{order.user!.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Event Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{order.event!.name}</h3>
              <p className="line-clamp-4 text-muted-foreground">
                {order.event!.description}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formatDate(order.event!.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{order.event!.venue!.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Ticket className="h-5 w-5" />
              <span>Tickets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48 overflow-hidden">
              {order.tickets!.map((ticket, index) => (
                <div
                  key={ticket.id}
                  className="my-4 flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Ticket #{index + 1}</span>
                      <Badge variant="outline">{ticket.type}</Badge>
                      <Badge
                        className={getStatusColor(ticket.status)}
                        variant="secondary"
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      {formatCurrency(ticket.price)}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order.payments!.map((payment) => (
              <div key={payment.id} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Amount
                    </span>
                    <div className="font-bold">
                      {formatCurrency(payment.amount)}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Method
                    </span>
                    <div className="font-medium">
                      {payment.method.replace("_", " ")}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <div>
                      <Badge
                        className={getStatusColor(payment.status)}
                        variant="secondary"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Transaction ID
                    </span>
                    <div className="font-mono text-sm">
                      {payment.mpPreferenceId}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Processed on {formatDate(payment.updatedAt)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
