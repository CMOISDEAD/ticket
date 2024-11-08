"use client";

import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
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
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    text: "Dashboard",
  },
  {
    href: "/dashboard/events",
    icon: CalendarDays,
    text: "Events",
  },
  {
    href: "/dashboard/tickets",
    icon: Ticket,
    text: "Tickets",
  },
  {
    href: "/dashboard/coupons",
    icon: Tag,
    text: "Coupons",
  },
  {
    href: "/dashboard/users",
    icon: Users,
    text: "Users",
  },
  {
    href: "/dashboard/analytics",
    icon: BarChart3,
    text: "Analytics",
  },
];

export const AppSidebar = () => {
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
                  <span>{link.text}</span>
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
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
