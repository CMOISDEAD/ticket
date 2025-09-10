import { create } from "zustand";
import { api } from "@/lib/axiosClient";
import { devtools, persist } from "zustand/middleware";
// import { AppCartType } from "@/types/global.types";

interface StoreState {
  isAuth: boolean;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    // cart: AppCartType;
    // history: AppCartType[];
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
      },
      fetchUser: async () => {
        try {
          const data = await api("/users/me");
          const { id, username, email, role } = data;
          set(() => ({
            isAuth: true,
            user: {
              id,
              username,
              email,
              role,
            },
          }));
        } catch (error) {
          console.log(error);
        }
      },
      logout: async () => {
        try {
          await api("/auth/logout", { method: "POST" });
          set(() => ({
            isAuth: false,
            user: {
              id: "",
              username: "",
              email: "",
              role: "",
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
