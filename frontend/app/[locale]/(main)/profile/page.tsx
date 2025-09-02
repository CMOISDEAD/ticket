"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  User,
  Edit,
  LogOut,
  Crown,
} from "lucide-react";
import { AppUserType } from "@/types/global.types";
import { axiosClient } from "@/lib/axiosClient";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "@/hooks/use-toast";
import { Link, useRouter } from "@/navigation";
import { formatDistanceToNow } from "date-fns";

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-primary/10 text-primary border-primary/20";
    case "PENDING":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400";
    case "CANCELLED":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "EXPIRED":
      return "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getUserInitials = (username: string) => {
  return username.slice(0, 2).toUpperCase();
};

export default function ProfilePage() {
  const { logout } = useTicketStore((state) => state);
  const [user, setUser] = useState<AppUserType | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out 🚪",
      description: "You have been successfully logged out. See you soon!",
    });
    router.push("/auth/login");
  };

  useEffect(() => {
    axiosClient
      .get("/users/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error: any) => console.error(error));
  }, []);

  if (!user) {
    return <p>User not found.</p>;
  }

  const totalSpent = user.order
    .filter((order) => order.status === "COMPLETED")
    .reduce((sum, order) => sum + order.total, 0);

  const completedOrders = user.order.filter(
    (order) => order.status === "COMPLETED",
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <Avatar className="mx-auto mb-4 h-24 w-24 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
              {getUserInitials(user.username)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-balance text-3xl font-bold">
                {user.fullnames} {user.lastnames}
              </h1>
              {user.role === "ADMIN" && (
                <Crown className="h-6 w-6 text-yellow-500" />
              )}
            </div>
            <p className="font-mono text-muted-foreground">@{user.username}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Information Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono">{user.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-pretty font-mono">{user.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono">
                  Member since{" "}
                  {formatDistanceToNow(user.createdAt, { addSuffix: true })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-4 text-center">
                  <div className="font-mono text-2xl font-bold text-primary">
                    {completedOrders}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Completed Orders
                  </div>
                </div>
                <div className="rounded-lg border border-accent/10 bg-accent/5 p-4 text-center">
                  <div className="font-mono text-xl font-bold text-muted-foreground">
                    {totalSpent.toLocaleString("en-US", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Spent
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/20 p-4 text-center">
                <div className="font-mono text-2xl font-bold">
                  {user.order.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Orders
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Your latest ticket purchases and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.order.map((order, index) => (
                <Link key={order.id} href={`/order/${order.id}`}>
                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-4 transition-colors hover:bg-muted/20">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-balance font-semibold">
                          {order.event!.name}
                        </h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="font-mono">
                            {order.event!.venue!.name}
                          </span>
                          <span className="font-mono">
                            {formatDistanceToNow(order.event!.date, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <div className="font-mono">
                          Ordered:{" "}
                          {formatDistanceToNow(order.createdAt, {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg font-bold">
                        {order.total.toLocaleString("en-US", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                  </div>
                  {index < user.order.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
