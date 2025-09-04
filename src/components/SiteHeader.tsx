"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved as any;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function SiteHeader(){
  const [theme,setTheme] = useState<"dark"|"light">("light");
  useEffect(()=>{
    const t = getInitialTheme();
    setTheme(t);
    document.documentElement.classList.toggle("dark", t==="dark");
  },[]);
  const toggle = ()=>{
    const next = theme==="dark" ? "light":"dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next==="dark");
    localStorage.setItem("theme", next);
  };
  return (
    <header className="site-header">
      <div className="container">
        <nav className="site-nav">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{display:"inline-grid",placeItems:"center",width:"22px",height:"22px",borderRadius:"6px",background:"var(--accent-2)"}}></span>
            <Link href="/" style={{fontWeight:800,letterSpacing:".015em"}}>Kalahari Database : Research Atlas</Link>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
            <Link href="/browse" className="chip">Browse</Link>
            <Link href="/map" className="chip">Map</Link>
            <Link href="/about" className="chip">About</Link>
            <button onClick={toggle} aria-label="Toggle theme" className="toggle" data-on={theme==="dark"}>
              <span className="toggle-thumb" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}