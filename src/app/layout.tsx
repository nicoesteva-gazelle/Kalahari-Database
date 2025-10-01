import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Kalahari Database",
  description: "Knowledge base for the Kalahari region",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          © Kalahari Database
        </footer>
      </body>
    </html>
  );
}
