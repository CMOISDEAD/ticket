"use client";
import router from "next/router";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { axiosClient } from "@/lib/axiosClient";
import { AppOrderType } from "@/types/global.types";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  MapPin,
  Ticket as TicketIcon,
  Timer,
  Users,
  XCircle,
} from "lucide-react";
import { Ticket } from "@/components/orders/tickets";

const getStatusConfig = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return {
        color: "bg-green-500/10 text-green-500 border-green-500/20",
        icon: CheckCircle,
        message: "Orden completada - Tickets disponibles para descarga",
      };
    case "PENDING":
      return {
        color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        icon: Timer,
        message: "Pago pendiente - Completa el pago para confirmar tu orden",
      };
    case "CANCELLED":
      return {
        color: "bg-red-500/10 text-red-500 border-red-500/20",
        icon: XCircle,
        message: "Orden cancelada - Reembolso procesado",
      };
    case "EXPIRED":
      return {
        color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
        icon: AlertCircle,
        message: "Orden expirada - El tiempo de pago ha vencido",
      };
    default:
      return {
        color: "bg-muted text-muted-foreground",
        icon: AlertCircle,
        message: "Estado desconocido",
      };
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatShortDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [order, setOrder] = useState<AppOrderType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    axiosClient
      .get(`/orders/${id}`)
      .then((res) => {
        console.log(res.data);
        setIsLoading(true);
        setOrder(res.data);
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handlePayment = () => {
    if (!order) return;
    axiosClient
      .post("/payments", {
        orderId: id,
        ammount: order.total,
        method: "CREDIT_CARD",
      })
      .then((res) => {
        const { init_point } = res.data;

        if (init_point) {
          window.location.href = init_point;
        } else {
          console.error("No init_point returned");
          setIsLoading(false);
        }
      })
      .catch((error: any) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  if (
    !order ||
    !order.event ||
    !order.payments ||
    !order.tickets ||
    !order.event.venue
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="mx-auto max-w-md">
          <CardContent className="py-8 text-center">
            <XCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h2 className="mb-2 font-mono text-xl font-bold">
              Orden no encontrada
            </h2>
            <p className="mb-4 font-mono text-muted-foreground">
              La orden que buscas no existe o ha sido eliminada.
            </p>
            <Button
              onClick={() => router.push("/orders")}
              className="font-mono"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Órdenes
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="mb-2 font-mono text-3xl font-bold">
              Orden #{order.id.slice(-8).toUpperCase()}
            </h2>
            <p className="font-mono text-muted-foreground">
              Creada el {formatShortDate(new Date(order.createdAt))}
            </p>
          </div>
          <div className="text-right">
            <div className="mb-2 font-mono text-3xl font-bold">
              {order.total.toLocaleString("en-US", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              })}
            </div>
            <Badge className={`${statusConfig.color} font-mono`}>
              <StatusIcon className="mr-1 h-4 w-4" />
              {order.status}
            </Badge>
          </div>
        </div>

        <Alert
          className={`border-2 ${
            statusConfig.color.includes("green")
              ? "border-green-500/20"
              : statusConfig.color.includes("yellow")
                ? "border-yellow-500/20"
                : statusConfig.color.includes("red")
                  ? "border-red-500/20"
                  : "border-gray-500/20"
          }`}
        >
          <AlertDescription className="flex content-center items-center gap-4 font-mono">
            <StatusIcon className="size-4" />
            {statusConfig.message}
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-mono">
                <CalendarDays className="h-5 w-5" />
                Información del Evento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative">
                  <img
                    src={order.event.poster || "/placeholder.svg"}
                    alt={order.event.name}
                    className="h-48 w-full rounded-lg border object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-mono text-xl font-bold">
                      {order.event.name}
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground">
                      {order.event.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-mono text-sm">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span>{formatDate(new Date(order.event.date))}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <div>{order.event.venue.name}</div>
                        <div className="text-muted-foreground">
                          {order.event.venue.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-mono">
                <TicketIcon className="h-5 w-5" />
                Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-mono font-semibold">
                          {ticket.type} Ticket
                        </div>
                        <div className="font-mono text-sm text-muted-foreground">
                          Cantidad: 1
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold">
                        $
                        {ticket.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="flex items-center justify-between font-mono text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {order.total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          {/* Payment Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-mono">
                <CreditCard className="h-5 w-5" />
                Acciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.status === "PENDING" && (
                <Button
                  className="w-full font-mono"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <Timer className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pagar Ahora
                    </>
                  )}
                </Button>
              )}

              {order.status === "COMPLETED" && (
                <Button className="w-full font-mono" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Tickets
                </Button>
              )}

              {(order.status === "CANCELLED" || order.status === "EXPIRED") && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent font-mono"
                  size="lg"
                  disabled
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  No Disponible
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-mono">
                <Clock className="h-5 w-5" />
                Historial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="font-mono text-sm">
                    <div>Orden creada</div>
                    <div className="text-muted-foreground">
                      {formatShortDate(new Date(order.createdAt))}
                    </div>
                  </div>
                </div>

                {order.status === "COMPLETED" && (
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <div className="font-mono text-sm">
                      <div>Pago completado</div>
                      <div className="text-muted-foreground">
                        {formatShortDate(new Date(order.payments[0].updatedAt))}
                      </div>
                    </div>
                  </div>
                )}

                {(order.status === "CANCELLED" ||
                  order.status === "EXPIRED") && (
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="font-mono text-sm">
                      <div>Orden {order.status.toLowerCase()}</div>
                      <div className="text-muted-foreground">
                        {formatShortDate(new Date(order.updatedAt))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {order.payments &&
            order.payments.map((payment) => (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <CreditCard className="h-5 w-5" />
                    Información de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between font-mono text-sm">
                    <span>Método:</span>
                    <span>{payment.method}</span>
                  </div>
                  <div className="flex justify-between font-mono text-sm">
                    <span>Tarjeta:</span>
                    <span>****5846</span>
                  </div>
                  <div className="flex justify-between font-mono text-sm">
                    <span>Procesado:</span>
                    <span>{formatShortDate(new Date(payment.updatedAt))}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div className="my-12 flex flex-col gap-8">
        {order.tickets.map((ticket) => (
          <Ticket key={ticket.id} event={order.event!} ticket={ticket} />
        ))}
      </div>
    </main>
  );
}
