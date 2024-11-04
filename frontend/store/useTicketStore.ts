import { AppUserType } from "@/types/global.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StoreState {
  user: {
    data: Omit<AppUserType, "password"> | null;
    token: string | null;
    isAuth: boolean;
  };
}

export const useTicketStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          data: null,
          token: null,
          isAuth: false,
        },
      }),
      { name: "ticket-store" },
    ),
  ),
);
