import { create } from "zustand";
import { axiosClient } from "@/lib/axiosClient";
import { devtools, persist } from "zustand/middleware";

interface StoreState {
  isAuth: boolean;
  user: {
    username: string;
    email: string;
    role: string;
  };
  fetchUser: () => void;
  logout: () => void;
  setIsAuth: (isAuth: boolean) => void;
}

export const useTicketStore = create<StoreState>()(
  persist(
    devtools((set) => ({
      isAuth: false,
      user: {
        username: "",
        email: "",
        role: "",
      },
      fetchUser: async () => {
        const response = await axiosClient.get("/users/me");
        console.log(response);
        const { data } = response;
        console.log(data);
        set(() => ({
          user: {
            username: data.username,
            email: data.email,
            role: data.role,
          },
          isAuth: true,
        }));
      },
      logout: async () => {
        try {
          await axiosClient.post("/auth/logout");
          set(() => ({
            isAuth: false,
            user: {
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
