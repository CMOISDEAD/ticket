import { AppOrderType } from "@/types/global.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  MapPin,
  Clock,
  CreditCard,
  Eye,
  Download,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500 text-foreground";
    case "PENDING":
      return "bg-secondary text-secondary-foreground";
    case "CANCELLED":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

// move to utils...
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

interface Props {
  order: AppOrderType;
}

export const OrderCard = ({ order }: Props) => {
  return (
    <Card className="w-full overflow-hidden border-2 transition-all duration-300 hover:border-border hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="mb-2 font-mono text-lg">
              {order.event?.name}
            </CardTitle>
            <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(new Date(order.event!.date))}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {order.event!.venue!.name}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
            <div className="text-right">
              <div className="font-mono text-2xl font-bold">
                {order.total.toLocaleString("en-US", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                Order #{order.id}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Event Image */}
          <div className="relative">
            <img
              src={order.event!.poster || "https://placehold.co/500"}
              alt={order.event!.name}
              className="h-52 w-full border object-cover"
            />
          </div>

          <div className="space-y-4 md:col-span-2">
            <div>
              <h4 className="mb-2 font-mono font-semibold">Tickets</h4>
              <div className="space-y-2">
                {order.tickets!.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-mono">
                      {1}x {ticket.type} Ticket
                    </span>
                    <span className="font-mono font-semibold">
                      {(ticket.type === "VIP"
                        ? order.event!.vipPrice
                        : order.event!.regularPrice
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between font-mono text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Order{" "}
                {formatDistanceToNow(order.createdAt, { addSuffix: true })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              {order.status === "PENDING" ? (
                <Link href={`/orders/${order.id}`}>
                  <Button size="sm" className="font-mono">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Continue with payment
                  </Button>
                </Link>
              ) : (
                <Link href={`/orders/${order.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent font-mono"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                </Link>
              )}
              {order.status === "COMPLETED" && (
                <Button size="sm" className="font-mono">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Tickets
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
