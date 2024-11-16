"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, CreditCard } from "lucide-react";
import { useTicketStore } from "@/store/useTicketStore";
import { useTranslations } from "next-intl";
import { axiosClient } from "@/lib/axiosClient";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/navigation";

export default function ProfilePage() {
  const { user, fetchUser, logout } = useTicketStore((state) => state);
  const t = useTranslations("profile");
  const router = useRouter();

  const [paymentHistory] = useState([
    {
      id: 1,
      date: "2023-05-15",
      amount: 19.99,
      description: "Monthly Subscription",
    },
    {
      id: 2,
      date: "2023-04-15",
      amount: 19.99,
      description: "Monthly Subscription",
    },
    {
      id: 3,
      date: "2023-03-15",
      amount: 19.99,
      description: "Monthly Subscription",
    },
  ]);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDesactivate = async () => {
    try {
      await axiosClient.put(`/users/${user.id}/desactivate`);
      logout();
      toast({
        title: "Success",
        description: "User desactivated",
      });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to desactivate user",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/users/${user.id}/delete`);
      logout();
      toast({
        title: "Success",
        description: "User deleted",
      });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user",
      });
    }
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex flex-col items-center">
            <Avatar className="mb-4 h-32 w-32">
              <AvatarImage
                src="/placeholder.svg?height=128&width=128"
                alt="User"
              />
              <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          <div className="mb-8 flex flex-col justify-center gap-2 md:flex-row">
            <Button
              variant="outline"
              className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-600"
              onClick={handleDesactivate}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              {t("desactivate")}
            </Button>
            <Button
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-600"
              onClick={handleDelete}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              {t("delete")}
            </Button>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("history")}</h3>
            <div className="space-y-4">
              {user.history &&
                user.history.map((item, i) => (
                  <Card key={i}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-sm text-sm">No. Events: 1</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date().toString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs font-semibold md:text-base">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
