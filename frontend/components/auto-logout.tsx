"use client";
import { toast } from "@/hooks/use-toast";
import { useTicketStore } from "@/store/useTicketStore";
import { useRouter } from "@/navigation";
import { useEffect, useRef } from "react";

export const AutoLogout = () => {
  const { logout } = useTicketStore((state) => state);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out 🚪",
      description: "You have been kicked...",
    });
    router.push("/auth/login");
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      handleLogout();
    }, 60000);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
};
