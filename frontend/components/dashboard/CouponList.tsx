"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { Pen, RefreshCw, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const CouponList = () => {
  const t = useTranslations("dashboard.coupons");
  const [fetching] = useState(false);
  const [coupons] = useState<[]>([]);

  return (
    <Card className="w-2/3 overflow-auto">
      <CardHeader className="flex flex-row content-center justify-between">
        <div>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{coupons.length} </CardDescription>
        </div>
        <Button size="icon" disabled={fetching}>
          <RefreshCw className={fetching ? "animate-spin" : ""} />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 overflow-auto">
        {coupons.length ? (
          coupons.map((coupon, i) => (
            <CouponCard key={i} coupon={coupon} remove={() => null} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">{t("not_found")}</p>
        )}
      </CardContent>
    </Card>
  );
};

const CouponCard = ({
  coupon,
  remove,
}: {
  coupon: any;
  remove: (id: string) => void;
}) => {
  return (
    <Card className="w-[14rem]">
      <CardHeader>
        <CardTitle>{coupon.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm text-muted-foreground">
          <li>{formatDistanceToNow(coupon.expiryDate, { addSuffix: true })}</li>
          <li>{coupon.code}</li>
        </ul>
      </CardContent>
      <CardFooter>
        <ButtonGroup className="w-full">
          <Button size="icon" variant="outline" className="w-full">
            <Pen />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="w-full"
            onClick={() => remove(coupon.id)}
          >
            <Trash2 />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
