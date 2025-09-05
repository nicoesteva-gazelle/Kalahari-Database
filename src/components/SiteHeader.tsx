"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/app/components/ThemeToggle";

const NAV = [
  { href: "/browse", label: "Browse" },
  { href: "/map", label: "Map" },
  { href: "/papers", label: "Papers" },
  { href: "/people", label: "People" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b bg-[color-mix(in_oklab,var(--bg)_92%,#fff)]/80 backdrop-blur">
      <div className="container h-20 flex items-center justify-between">
        <Link href="/" aria-label="Kalahari Database — Home" className="group">
          <span
            className="brand"
            style={{
              display:"inline-block",
              fontWeight:800,
              fontSize:"clamp(1.6rem, 2.8vw + .6rem, 2.8rem)",
              lineHeight:1.05,
            }}
          >
            Kalahari Database
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-1.5 rounded-lg hover:bg-white/60 ${pathname === n.href ? "bg-white/80" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}