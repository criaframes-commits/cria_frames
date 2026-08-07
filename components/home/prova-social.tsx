"use client";

import { useEffect, useRef, useState } from "react";

const CLIENTS = ["Cliente A", "Cliente B", "Cliente C", "Cliente D", "Cliente E", "Cliente F"];

const METRICS = [
  { value: 180, suffix: "+", label: "Vídeos entregues" },
  { value: 32, suffix: "", label: "Marcas atendidas" },
  { value: 48, suffix: "h", label: "Turnaround médio" },
  { value: 4.9, suffix: "", label: "Satisfação média" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          setDisplay(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const isDecimal = !Number.isInteger(value);
  return (
    <div ref={ref} className="font-display text-metric font-black tabular-nums text-accent-text">
      {isDecimal ? display.toFixed(1) : Math.round(display)}
      {suffix}
    </div>
  );
}

export function ProvaSocial() {
  return (
    <section aria-label="Prova social" className="border-t border-border bg-background">
      {/* marquee de logos */}
      <div className="overflow-hidden py-12">
        <div className="flex w-max animate-[marquee_32s_linear_infinite] motion-reduce:animate-none">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1 ? true : undefined}
              className="flex min-w-[100vw] shrink-0 items-center justify-around gap-14 px-7"
            >
              {CLIENTS.map((name) => (
                <span
                  key={`${copyIndex}-${name}`}
                  className="whitespace-nowrap font-display text-lg font-bold uppercase tracking-wide text-muted-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* métricas */}
      <div className="mx-auto grid max-w-container grid-cols-2 gap-8 px-4 pb-20 text-center md:grid-cols-4 md:px-6">
        {METRICS.map((m) => (
          <div key={m.label}>
            <Counter value={m.value} suffix={m.suffix} />
            <div className="mt-2 text-caption uppercase tracking-[0.1em] text-muted-foreground">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
