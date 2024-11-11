import { AppCartType } from "@/types/global.types";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Calendar, DollarSign, Loader2, Plus, Tickets } from "lucide-react";
import { Input } from "../ui/input";
import { FormField } from "../ui/form";
import { useTranslations } from "next-intl";

export const Overview = ({ cart }: { cart: AppCartType | undefined }) => {
  const t = useTranslations("cart");

  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {cart ? (
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {t("number_of_events")}: {cart.eventsIds?.length}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Tickets className="h-4 w-4" />
              <span>
                {t("number_of_tickets")}: {cart.numberOfTickets}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>
                {t("price")}: {cart.totalPrice}{" "}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>
                {t("total_disscount")}: {cart.totalPrice}{" "}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>
                {t("total_price")}: {cart.totalPrice}{" "}
              </span>
            </li>
          </ul>
        ) : (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex w-full gap-4">
          <Input placeholder={t("coupon_code")} className="w-full" />
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button disabled={cart?.eventsIds?.length === 0} className="w-full">
          {t("checkout")}
        </Button>
      </CardFooter>
    </Card>
  );
};
