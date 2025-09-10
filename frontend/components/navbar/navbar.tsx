"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, ReceiptJapaneseYen, Search, Ticket } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../theme-toggle";
import { useTicketStore } from "@/store/useTicketStore";
import UserDropdown from "./user-dropdown";
import { LocaleSwitcher } from "../locale/locale-switcher";
import { useLocale, useTranslations } from "next-intl";

const links: { [key: string]: { name: string; href: string }[] } = {
  en: [
    {
      name: "Events",
      href: "/events",
    },
    {
      name: "Contact",
      href: "/help",
    },
  ],
  es: [
    {
      name: "Eventos",
      href: "/events",
    },

    {
      name: "Contacto",
      href: "/help",
    },
  ],
};

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Ticket className="h-7 w-7" />
          <h1 className="text-lg font-bold">
            QueBoletas
            <span className="text-xs text-muted-foreground">.shop</span>
          </h1>
          <span className="sr-only">QueBoleta</span>
        </Link>
        <nav className="items-center gap-6 text-sm font-medium md:flex">
          <ul className="hidden gap-6 md:flex">
            {links[locale].map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="capitalize text-muted-foreground hover:text-foreground"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">{t("search")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px] border-border bg-background p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder={`${t("search")}...`}
                    className="w-full pl-8"
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>
            <div className="hidden gap-4 md:flex">
              <AuthSection />
              <LocaleSwitcher />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden">
                  <Menu className="h-5 w-5 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="grid gap-4 p-4">
                  {links[locale].map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="text-sm font-medium capitalize text-muted-foreground hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <LocaleSwitcher />
                  <AuthSection />
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

const AuthSection = () => {
  const t = useTranslations("navbar");
  const { isAuth } = useTicketStore((state) => state);

  return isAuth ? (
    <div className="flex content-center gap-4">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/orders">
          <ReceiptJapaneseYen className="size-5" />
        </Link>
      </Button>
      <UserDropdown />
    </div>
  ) : (
    <>
      <Button asChild variant="link" size="sm">
        <Link href="/auth/login">{t("login")}</Link>
      </Button>
      <Button asChild variant="link" size="sm">
        <Link href="/auth/register">{t("register")}</Link>
      </Button>
    </>
  );
};
