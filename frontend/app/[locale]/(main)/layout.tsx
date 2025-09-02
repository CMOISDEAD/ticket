"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/navigation";
import { Footer } from "@/components/footer/footer";
import { AutoLogout } from "@/components/auto-logout";

interface Props {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  const { isAuth, fetchUser } = useTicketStore((state) => state);
  const router = useRouter();

  const handle = async () => {
    if (!isAuth) return;
    try {
      await fetchUser();
    } catch (error: any) {
      const isUnauthorized = ["400", "401"].some((code) =>
        error.message.includes(code),
      );
      toast({
        variant: "destructive",
        title: isUnauthorized ? "Session Expired" : "Error",
        description: isUnauthorized
          ? "Session expired, please login again."
          : error.message,
      });
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    handle();
  }, [isAuth]);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-5 min-h-[59vh]">{children}</main>
      <Footer />
      <AutoLogout />
    </div>
  );
}
