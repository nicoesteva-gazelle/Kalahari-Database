import Link from "next/link";

type CTA = { href: string; label: string; primary?: boolean; };

export default function Hero(props: {
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  ctas: CTA[];
}) {
  const { title, highlight, subtitle, image, ctas } = props;

  return (
    <section className="relative hero-image" style={{ minHeight: "min(56vh, 520px)" }}>
      {/* background media */}
      <img src={image} alt="" className="hero-media" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />

      {/* acacia overlay (now above bg, below glass) */}
      <img src="/acacia.svg" alt="" aria-hidden className="hero-acacia" style={{ zIndex: 1, opacity: 0.3 }} />

      {/* glass content */}
      <div className="glass rounded-3xl p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.18)] relative z-[2]">
        <h1 className="font-display heading-hero" style={{ fontSize: "clamp(2.2rem, 3.2vw + 1rem, 3.4rem)", lineHeight: 1.05 }}>
          {title} <span className="opacity-80">{highlight}</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl opacity-95 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          {ctas.map((c, i) => (
            <Link key={i} href={c.href} className={c.primary ? "btn-primary" : "btn-ghost"}>
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}