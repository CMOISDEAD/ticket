import { create } from "zustand";
import { axiosClient } from "@/lib/axiosClient";
import { devtools, persist } from "zustand/middleware";
import { AppCartType } from "@/types/global.types";

interface StoreState {
  isAuth: boolean;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    cart: AppCartType;
    history: AppCartType[];
  };
  fetchUser: () => Promise<void>;
  logout: () => void;
  setIsAuth: (isAuth: boolean) => void;
}

export const useTicketStore = create<StoreState>()(
  persist(
    devtools((set) => ({
      isAuth: false,
      user: {
        id: "",
        username: "",
        email: "",
        role: "",
        cart: {
          couponsIds: [],
          eventsIds: [],
          totalPrice: 0,
          numberOfTickets: 0,
        },
        history: [],
      },
      fetchUser: async () => {
        try {
          const response = await axiosClient.get("/users/me");
          const { data } = response;
          set(() => ({
            user: {
              id: data.id,
              username: data.username,
              email: data.email,
              role: data.role,
              cart: data.cart,
              history: data.history,
            },
            isAuth: true,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      logout: async () => {
        try {
          await axiosClient.post("/auth/logout");
          set(() => ({
            isAuth: false,
            user: {
              id: "",
              username: "",
              email: "",
              role: "",
              cart: {
                couponsIds: [],
                eventsIds: [],
                totalPrice: 0,
                numberOfTickets: 0,
              },
              history: [],
            },
          }));
        } catch (error) {
          console.log(error);
        }
      },
      setIsAuth: (isAuth) => set({ isAuth }),
    })),
    { name: "ticket-store" },
  ),
);
