"use client";

import { AppCartType, AppCouponType } from "@/types/global.types";
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
import { useTranslations } from "next-intl";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { axiosClient } from "@/lib/axiosClient";
import { useTicketStore } from "@/store/useTicketStore";
import { Badge } from "../ui/badge";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/navigation";

export const Overview = ({
  cart,
  setCart,
}: {
  cart: AppCartType | undefined;
  setCart: Dispatch<SetStateAction<AppCartType | undefined>>;
}) => {
  const { user } = useTicketStore((state) => state);
  const [code, setCode] = useState("");
  const [coupons, setCoupons] = useState<AppCouponType[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const t = useTranslations("cart");

  useEffect(() => {
    if (!cart) return;
    setTotal(
      cart.totalPrice -
        (cart.totalPrice *
          coupons.reduce((acc, coupon) => acc + coupon.discount, 0)) /
          100,
    );
  }, [cart, coupons]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleCheck = async () => {
    if (code === "") return;
    try {
      await axiosClient.post("/coupons/add", {
        userId: user.id,
        code,
      });
      const response = await axiosClient.get(`/cart/${user.id}`);
      setCart(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCode("");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await axiosClient.post("/coupons/remove", {
        userId: user.id,
        code: id,
      });
      const response = await axiosClient.get(`/cart/${user.id}`);
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCoupons([]);
    const fetchCoupons = async () => {
      const ids = cart?.couponsIds;
      if (!ids) return;
      try {
        ids.forEach(async (id) => {
          const response = await axiosClient.get(`/coupons/${id}`);
          setCoupons((prev) => [...prev, response.data]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCoupons();
  }, [cart]);

  const handleCheckout = async () => {
    try {
      await axiosClient.post(`/cart/checkout/${user.id}`);
      setCart(undefined);
      router.push("/profile");
      toast({
        title: "Success checkout",
        content: "Checkout successful",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        content: "Checkout failed",
      });
    }
  };

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
            coupons.map((coupon) => (
              <li
                key={coupon.id}
                className="flex gap-4"
                onClick={() => handleRemove(coupon.code)}
              >
                <Badge>{coupon.code}</Badge>
                <p>{coupon.discount}%</p>
              </li>
            ))
          ) : (
            <p> No coupons applied. </p>
          )}
        </ul>
        <div className="flex w-full gap-4">
          <Input
            className="w-full"
            placeholder={t("coupon_code")}
            onChange={handleChange}
            value={code}
          />
          <Button size="icon" onClick={handleCheck}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          disabled={cart?.eventsIds?.length === 0}
          className="w-full"
          onClick={handleCheckout}
        >
          {t("checkout")}
        </Button>
      </CardFooter>
    </Card>
  );
};
