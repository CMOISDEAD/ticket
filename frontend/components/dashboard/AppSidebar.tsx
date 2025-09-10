"use client";

import {
  CalendarDays,
  LayoutDashboard,
  ReceiptJapaneseYen,
  Settings,
  Tag,
  Ticket,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type LinkType = {
  href: string;
  icon: any;
  text: {
    [key: string]: string;
  };
};

const links: LinkType[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    text: {
      en: "Dashboard",
      es: "Dashboard",
    },
  },
  {
    href: "/dashboard/events",
    icon: CalendarDays,
    text: {
      en: "Events",
      es: "Eventos",
    },
  },
  {
    href: "/dashboard/users",
    icon: Users,
    text: {
      en: "Users",
      es: "Usuarios",
    },
  },
  {
    href: "/dashboard/orders",
    icon: ReceiptJapaneseYen,
    text: {
      en: "Orders",
      es: "Ordenes",
    },
  },
];

export const AppSidebar = () => {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex content-center gap-2">
            <Ticket className="h-6 w-6" />
            <span className="font-semibold">Admin Dashboard</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {links.map((link, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton asChild isActive={pathname === link.href}>
                <Link href={link.href}>
                  <link.icon className="h-4 w-4" />
                  <span>{link.text[locale]}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Settings className="h-4 w-4" />
                <span>{t("settings")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
