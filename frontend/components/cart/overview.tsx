"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "../ui/badge";

export const Overview = () => {
  const [code] = useState("");
  const [coupons] = useState<[]>([]);
  const t = useTranslations("cart");

  return (
    <Card className="h-fit w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-4">
        <h3 className="text-lg font-bold">Coupons</h3>
        <ul className="flex flex-col gap-2">
          {coupons.length ? (
            coupons.map((coupon, i) => (
              <li key={i} className="flex gap-4">
                <Badge>{coupon}</Badge>
                <p>{coupon}%</p>
              </li>
            ))
          ) : (
            <p>{t("no_coupon")}</p>
          )}
        </ul>
        <div className="flex w-full gap-4">
          <Input
            className="w-full"
            placeholder={t("coupon_code")}
            value={code}
          />
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button className="w-full">{t("checkout")}</Button>
      </CardFooter>
    </Card>
  );
};
