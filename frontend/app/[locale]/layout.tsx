import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Provider } from "@/components/provider";
import { Toaster } from "@/components/ui/toaster";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import { locales } from "@/config";
import Script from "next/script";

const spaceMono = localFont({
  src: [
    {
      path: "../../public/fonts/space-mono/SpaceMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-mono/SpaceMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/space-mono/SpaceMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-mono/SpaceMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "QueBoleta",
  generator: "Next.js",
  applicationName: "QueBoleta",
  referrer: "origin-when-cross-origin",
  keywords: ["Boletas", "Eventos", "Conciertos", "Next.js", "shadcn-ui"],
  authors: [{ name: "CMOISDEAD", url: "https://camilodavila.vercel.app" }],
  creator: "CMOISDEAD",
  publisher: "CMOISDEAD",
  alternates: {},
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://queboleta.vercel.app"),
  openGraph: {
    title: "QueBoleta",
    description:
      "QueBoleta es una plataforma que te permite comprar boletas para eventos de manera rápida y segura.",
    url: "https://queboleta.vercel.app",
    siteName: "QueBoleta",
    images: [
      {
        url: "https://queboleta.vercel.app/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://queboleta.vercel.app/og-dark.png",
        width: 1800,
        height: 1600,
        alt: "Next.js, TailwindCSS and shadcn-ui Starter Template",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${spaceMono.className}`}>
        <NextIntlClientProvider messages={messages}>
          <Provider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
