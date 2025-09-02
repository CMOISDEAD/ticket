import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AppEventType, AppTicketType } from "@/types/global.types";
import { Calendar, Hash, DollarSign } from "lucide-react";
import QRCode from "react-qr-code";

interface Props {
  event: AppEventType;
  ticket: AppTicketType;
}

export const Ticket = ({ event, ticket }: Props) => {
  return (
    <div className="perspective-1000">
      <div className="ticket-3d shadow-3d group relative h-[290px] w-[700px] overflow-hidden rounded-xl border-2 border-border bg-card">
        <div className="gradient-glow absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-50 flex h-full">
          <div
            className={cn(
              "flex w-12 items-center justify-center",
              ticket.type === "VIP" ? "bg-purple-800/20" : "bg-stone-600",
            )}
          >
            <div className="text-vertical font-experimental text-xs tracking-wider text-muted-foreground">
              <span>
                TICKET SYSTEM 2024 • QUE BOLETA INC • ALL RIGHTS RESERVED
              </span>
            </div>
          </div>

          <div className="relative flex-1 p-6">
            <div className="font-experimental mb-2 text-xs text-muted-foreground">
              NEX GEN presents [LATIN AMERICA] DEC 2025+
            </div>

            <div className="mb-4">
              <h1 className="font-bold-condensed text-3xl uppercase leading-tight text-foreground md:text-4xl">
                {event.name}
              </h1>
              <p className="font-experimental text-sm text-muted-foreground">
                W/ {event.venue!.name}
              </p>
            </div>

            {/* Pre-sale info */}
            <div className="mb-6">
              <p className="text-lg font-bold text-foreground">
                → {ticket.status}
              </p>
              <p className="font-experimental text-sm text-muted-foreground">
                {event.date}
              </p>
            </div>
          </div>

          <div className="relative w-32 bg-muted/10">
            <div className="flex flex-col items-center p-4">
              <QRCode
                value={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${ticket.id}`}
                className="size-20"
              />
              <p className="font-experimental text-center text-xs text-muted-foreground">
                {ticket.id.slice(-8).toUpperCase()}
              </p>
            </div>

            {/* Artistic section placeholder */}
            <div className="absolute bottom-0 right-0 flex h-32 w-full items-center justify-center bg-gradient-to-tr from-transparent to-primary/5">
              <div className="rotate-12 transform text-4xl font-bold text-muted-foreground/20">
                ※
              </div>
            </div>

            {/* Real time display simulation */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 transform">
              <p className="font-experimental border border-border bg-card px-1 py-0.5 text-xs text-muted-foreground">
                REAL TIME DISPLAY
              </p>
              <p className="font-experimental mt-1 border border-border bg-card px-1 py-0.5 text-xs text-muted-foreground">
                03:95:38:29:06
              </p>
            </div>
          </div>
        </div>

        {/* Additional details on edges */}
        <div className="absolute bottom-0 left-12 right-32 h-px bg-border"></div>
        <div className="font-experimental absolute bottom-2 right-4 z-10 text-xs text-muted-foreground">
          PH222.2 Q386
        </div>

        <img
          src={event.logo}
          alt="logo"
          className="absolute -bottom-28 -right-16 size-96 opacity-20 dark:invert"
        />
      </div>
    </div>
  );
};
