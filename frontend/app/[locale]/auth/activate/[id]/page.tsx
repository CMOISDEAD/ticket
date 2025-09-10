"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/axiosClient";
import { Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ActivatePage() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const activate = async () => {
      try {
        await api(`/auth/activate/${id}`, { method: "POST" });
        toast({
          title: "Your account has been activated",
          description: "You will be redirected to login page.",
        });
        router.push("/auth/login");
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error activating your account",
          description: `{error}`,
        });
      }
    };
    activate();
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Your account has been activated</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6">
          <Check className="size-8 text-green-500" />
          <p className="text-sm text-muted-foreground">
            Redirecting to login...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
