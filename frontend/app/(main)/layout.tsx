"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import { useTicketStore } from "@/store/useTicketStore";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  const { fetchUser } = useTicketStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      try {
        await fetchUser();
      } catch (error: any) {
        router.push("/auth/login");
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
      }
    };
    handle();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-5">{children}</main>
    </div>
  );
}
