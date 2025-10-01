"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const NAV = [
  { href: "/browse", label: "Browse" },
  { href: "/projects", label: "Projects" },
  { href: "/people", label: "People" },
  { href: "/regions", label: "Regions" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-neutral-900/70 dark:supports-[backdrop-filter]:bg-neutral-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Brand + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-semibold text-lg">
            Kalahari Database
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
                  pathname === href
                    ? "text-neutral-900 dark:text-neutral-100 font-semibold"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Theme toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
