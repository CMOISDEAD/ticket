"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, UserCheck, UserX, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AppUserType } from "@/types/global.types";
import { api } from "@/lib/axiosClient";
import { toast } from "@/hooks/use-toast";

export default function UsersPage() {
  const [users, setUsers] = useState<AppUserType[]>([]);

  useEffect(() => {
    api("/users")
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error fetching users",
          description: `${error}`,
        });
      });
  }, []);

  const activeUsers = users.filter((user) => user.active).length;
  const inactiveUsers = users.filter((user) => !user.active).length;

  const getInitials = (fullnames: string, lastnames: string) => {
    return `${fullnames.charAt(0)}${lastnames.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Users Management
          </h1>
          <p className="text-muted-foreground">
            Manage and view all users in your system
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm">
            <UserCheck className="h-4 w-4 text-green-600" />
            <span className="font-medium">{activeUsers} Active</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <UserX className="h-4 w-4 text-red-600" />
            <span className="font-medium">{inactiveUsers} Inactive</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{users.length} Total</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                      {getInitials(user.fullnames, user.lastnames)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        {user.fullnames} {user.lastnames}
                      </h3>
                      <Badge
                        variant={
                          user.role === "ADMIN" ? "default" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                      <Badge variant={user.active ? "default" : "destructive"}>
                        {user.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>@{user.username}</span>
                      <span>{user.email}</span>
                      <span>{user.phone}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Joined {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/users/${user.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
