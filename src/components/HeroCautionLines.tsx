"use client";

const band1Text = "ADAPTIVE / FLUID / DEPENDABLE / CAPTIVATING / USER-FRIENDLY / SEO-READY / PROTECTED / FULL STACK / UI ENGINEERING / AI PRODUCTS / ";
const band2Text = "TYPESCRIPT / REACT.JS / NEXT.JS / GSAP / THREE.JS / NODE.JS / TAILWIND CSS / MOTION / WEBGL / ";

function MovingBand({
  text,
  className,
  innerClassName,
  reverse = false,
}: {
  text: string;
  className: string;
  innerClassName?: string;
  reverse?: boolean;
}) {
  return (
    <div className={className}>
      <div
        className={[
          reverse ? "marquee-track marquee-reverse" : "marquee-track",
          innerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} className="mx-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroCautionLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-95" aria-hidden="true">
      <div className="absolute left-0 top-[12%] h-px w-full animate-caution-x bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute bottom-[12%] left-0 h-px w-full animate-caution-x-reverse bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute left-[8%] top-0 h-full w-px animate-caution-y bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
      <div className="absolute right-[8%] top-0 h-full w-px animate-caution-y-reverse bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

      <MovingBand
        text={band1Text}
        className="hero-band hero-band-cyan absolute -left-1/4 top-[18%] h-12 w-[160%] -rotate-6 overflow-hidden border-y border-cyan-400/20 bg-cyan-400/5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-400/55 shadow-[0_0_60px_rgba(0,204,220,0.1)]"
      />
      <MovingBand
        text={band2Text}
        reverse
        className="hero-band hero-band-violet absolute -right-1/4 bottom-[10%] h-9 w-[155%] rotate-4 overflow-hidden border-y border-violet-400/20 bg-violet-400/5 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-violet-400/55 shadow-[0_0_60px_rgba(109,9,255,0.1)]"
      />
      <MovingBand
        text="INNOVATIVE / RESPONSIVE / ACCESSIBLE / "
        reverse
        className="hero-band hero-band-purple absolute -right-1/3 top-[60%] h-7 w-[150%] -rotate-12 overflow-hidden border-y border-purple-400/10 bg-purple-400/5 font-mono text-[8px] uppercase tracking-[0.24em] text-purple-400/38"
      />
    </div>
  );
}
