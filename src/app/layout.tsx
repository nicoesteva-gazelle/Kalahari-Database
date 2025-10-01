import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { Merriweather_Sans, Special_Elite } from "next/font/google";

const body = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});
const display = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Kalahari Database",
  description: "Knowledge base for the Kalahari region",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${body.variable} ${display.variable} antialiased min-h-dvh flex flex-col bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          © Kalahari Database
        </footer>
      </body>
    </html>
  );
}
