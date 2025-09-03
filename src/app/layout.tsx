import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalahari Database",
  description: "Botswana Kalahari: papers, projects, people, places.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
