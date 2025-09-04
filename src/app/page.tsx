'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dark, setDark] = useState(false);

  // initialize from localStorage + set root class once on mount
  useEffect(() => {
    const saved = localStorage.getItem('kalahari-theme');
    const d = saved ? saved === 'dark' : false;
    setDark(d);
    if (d) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('kalahari-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <main className="min-h-screen dark:text-sand-100 relative">
      {/* Kalahari backgrounds */}
      <div className="kalahari-sand dark:kalahari-dusk absolute inset-0 -z-10" />

      {/* NAV */}
      <header className="max-w-7xl mx-auto px-5 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-2xl grid place-items-center bg-acacia-600 text-white font-bold shadow-soft">
            KD
          </span>
          <div className="leading-tight">
            <h1 className="font-display text-lg font-semibold tracking-tight text-sand-900 dark:text-sand-100">
              Kalahari Database
            </h1>
            <p className="text-xs opacity-80">Botswana Kalahari · papers · projects · people · places</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="rounded-xl border px-3 py-2 text-sm font-medium shadow-soft hover:shadow-softLg transition glass"
          title="Toggle theme"
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 pb-12 pt-2">
        <div className="rounded-3xl border glass overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs mb-4">
                <span className="px-2 py-1 rounded-full bg-sand-200 text-sand-900 dark:bg-acacia-800/40 dark:text-sand-100">App Router</span>
                <span className="px-2 py-1 rounded-full bg-sand-200 text-sand-900 dark:bg-acacia-800/40 dark:text-sand-100">Tailwind</span>
                <span className="px-2 py-1 rounded-full bg-sand-200 text-sand-900 dark:bg-acacia-800/40 dark:text-sand-100">Theme Toggle</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-sand-900 dark:text-sand-100">
                Explore the Kalahari’s
                <span className="text-acacia-600 dark:text-acacia-400"> people</span>,{' '}
                <span className="text-acacia-600 dark:text-acacia-400">projects</span>, and{' '}
                <span className="text-acacia-600 dark:text-acacia-400">places</span>.
              </h2>
              <p className="mt-4 text-sand-800/80 dark:text-sand-100/80 max-w-prose">
                A research atlas for corridors, fieldwork, and literature—lightweight, beautiful, and ready for data.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#map" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-acacia-600 hover:bg-acacia-700 text-white shadow-soft">
                  View Map
                </a>
                <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-sand-500 hover:bg-sand-600 text-white shadow-soft">
                  Browse Projects
                </Link>
              </div>
            </div>

            {/* Terrain preview */}
            <div className="rounded-2xl border glass p-6 md:p-8 grid place-items-center text-center">
              <div className="text-6xl mb-3">🏜️</div>
              <div className="font-display text-xl">Kalahari Terrain Preview</div>
              <div className="text-sm opacity-80">Swap for your Leaflet/Mapbox component</div>
              <div className="mt-6 h-40 w-full rounded-xl border bg-gradient-to-br from-sand-200/70 to-acacia-100/70 dark:from-dusk-900/40 dark:to-acacia-900/20" />
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <h3 className="font-display text-2xl mb-4">Browse</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link href="/map" className="rounded-2xl border glass p-5 hover:-translate-y-0.5 transition shadow-soft hover:shadow-softLg block">
            <div className="text-3xl">🗺️</div>
            <h4 className="mt-3 font-display text-lg">Map</h4>
            <p className="text-sm opacity-80 mt-1">Places, corridors, sites, geographies.</p>
            <span className="inline-block mt-4 rounded-xl px-3 py-2 text-sm font-medium bg-acacia-600 hover:bg-acacia-700 text-white">Open Map</span>
          </Link>

          <Link href="/people" className="rounded-2xl border glass p-5 hover:-translate-y-0.5 transition shadow-soft hover:shadow-softLg block">
            <div className="text-3xl">👥</div>
            <h4 className="mt-3 font-display text-lg">People</h4>
            <p className="text-sm opacity-80 mt-1">Researchers, authors, institutions.</p>
            <span className="inline-block mt-4 rounded-xl px-3 py-2 text-sm font-medium bg-acacia-600 hover:bg-acacia-700 text-white">View People</span>
          </Link>

          <Link href="/projects" className="rounded-2xl border glass p-5 hover:-translate-y-0.5 transition shadow-soft hover:shadow-softLg block">
            <div className="text-3xl">🧭</div>
            <h4 className="mt-3 font-display text-lg">Projects</h4>
            <p className="text-sm opacity-80 mt-1">Fieldwork and ongoing initiatives.</p>
            <span className="inline-block mt-4 rounded-xl px-3 py-2 text-sm font-medium bg-acacia-600 hover:bg-acacia-700 text-white">View Projects</span>
          </Link>

          <Link href="/papers" className="rounded-2xl border glass p-5 hover:-translate-y-0.5 transition shadow-soft hover:shadow-softLg block">
            <div className="text-3xl">📄</div>
            <h4 className="mt-3 font-display text-lg">Papers</h4>
            <p className="text-sm opacity-80 mt-1">Publications & grey literature.</p>
            <span className="inline-block mt-4 rounded-xl px-3 py-2 text-sm font-medium bg-acacia-600 hover:bg-acacia-700 text-white">View Papers</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-sand-200/60 dark:border-acacia-800/60">
        <div className="max-w-7xl mx-auto px-5 py-8 text-sm opacity-80">
          © {new Date().getFullYear()} Kalahari Database · Built with Next.js & Tailwind
        </div>
      </footer>
    </main>
  );
}
