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
              fontFamily:"var(--font-display)",
              fontWeight:800,
              letterSpacing:"-0.02em",
              background:"linear-gradient(90deg,var(--accent),var(--accent-2))",
              WebkitBackgroundClip:"text",
              backgroundClip:"text",
              color:"transparent",
              textShadow:"0 2px 14px color-mix(in oklab,var(--accent) 15%, transparent)",
              fontSize:"clamp(1.4rem, 2.6vw + .6rem, 2.6rem)",
              lineHeight:1.05
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