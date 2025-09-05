import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Providers from "./providers";
import { CONTACT } from "@/data/contact";
import { Merriweather_Sans, Special_Elite } from "next/font/google";

const body = Merriweather_Sans({ subsets: ["latin"], weight: ["400","700"], variable: "--font-body" });
const display = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-display" });

export const metadata: Metadata = {
  title: "Kalahari Database",
  description: "Botswana–Kalahari research: papers, projects, people & places.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${display.variable}`}>
      <body className="min-h-dvh bg-[var(--bg)] text-[var(--text)] antialiased" style={{fontFamily:"var(--font-body), system-ui, sans-serif"}}>
        <Providers>
          <SiteHeader />
          <main className="container py-8">{children}</main>
          <footer className="border-t mt-16 py-10 text-sm">
            <div className="container">
              <div style={{display:"flex",flexWrap:"wrap",gap:"12px",alignItems:"center",justifyContent:"space-between"}}>
                <div className="muted">© {year} Kalahari Database</div>
                <div className="pillbar">
                  {CONTACT.email && <a className="chip" href={`mailto:${CONTACT.email}`}>Email</a>}
                  {CONTACT.github && <a className="chip" href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>}
                  {CONTACT.linkedin && <a className="chip" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}