import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { SidebarTrigger } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { AppEventType } from "@/types/global.types";
import { axiosClient } from "@/lib/axiosClient";

export const SearchBar = () => {
  const t = useTranslations("dashboard");
  const [events, setEvents] = useState<AppEventType[]>([]);

  useEffect(() => {
    axiosClient
      .get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border px-6">
      <SidebarTrigger />
      <div className="flex-1">
        <form>
          <div className="relative">
            <Input
              className="w-full pl-8"
              placeholder={t("placeholder_search")}
              type="search"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </form>
      </div>
    </header>
  );
};
