"use client";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <SidebarProvider className="">
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <div className="flex flex-1 flex-col">
            <SearchBar />
            <main className="p-4 md:p-6">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
