"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  return (
    <header className="k-header">
      <div className="k-container">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-[22px] h-[22px] rounded-md" style={{ background: "var(--accent-2)" }}>✦</span>
            <Link href="/" className="k-brand-xxl font-display k-pop">
              Kalahari Database
              <span className="block k-brand-subtle">Research Atlas</span>
            </Link>
          </div>
          <div className="k-navlinks">
            <Link href="/" className="muted">Home</Link>
            <Link href="/papers" className="muted">Browse</Link>
            <Link href="/projects" className="muted">Projects</Link>
            <Link href="/people" className="muted">People</Link>
            <Link href="/map" className="muted">Map</Link>
            <Link href="/about" className="muted">About</Link>
            <ThemeToggle />
            <a className="k-btn" href="mailto:hello@kalahari-atlas.org">Contribute</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
