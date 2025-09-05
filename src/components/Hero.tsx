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
    <section className="relative hero-image">
      <img src={image} alt="" className="hero-media" />
      <div className="glass rounded-3xl p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.18)] relative z-[1]">
        <h1 className="font-display heading-hero" style={{ fontSize: "clamp(2.4rem, 3.6vw + 1rem, 3.8rem)", lineHeight: 1.05 }}>
          {title} <span className="opacity-80">{highlight}</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl opacity-95 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          {ctas.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className={c.primary ? "btn-primary" : "btn-ghost"}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}