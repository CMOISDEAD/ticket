"use client";

import { toast } from "@/hooks/use-toast";
import { axiosClient } from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { AppCouponType } from "@/types/global.types";
import { formatDistanceToNow } from "date-fns";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { Pen, RefreshCw, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const CouponList = () => {
  const t = useTranslations("dashboard.coupons");
  const [fetching, setFetching] = useState(false);
  const [coupons, setCoupons] = useState<AppCouponType[]>([]);

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
    try {
      setFetching(true);
      const response = await axiosClient.get("/coupons");
      setCoupons(response.data);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setFetching(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await axiosClient.delete(`/coupons/${id}`);
      getCoupons();
      toast({
        title: "Success 🎉",
        description: "Coupons removed successfully.",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Card className="w-2/3 overflow-auto">
      <CardHeader className="flex flex-row content-center justify-between">
        <div>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>
            {coupons.length} {coupons.length === 1 ? t("single") : t("plural")}
          </CardDescription>
        </div>
        <Button size="icon" onClick={getCoupons} disabled={fetching}>
          <RefreshCw className={fetching ? "animate-spin" : ""} />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 overflow-auto">
        {coupons.length ? (
          coupons.map((coupon: AppCouponType) => (
            <CouponCard key={coupon.id} coupon={coupon} remove={handleRemove} />
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
  coupon: AppCouponType;
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
