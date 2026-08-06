"use client";

import { useEffect, useRef, useState } from "react";

export type HolofoteCase = {
  id: string;
  title: string;
  client: string;
  description: string;
};

type ScrollHolofoteProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  cases: HolofoteCase[];
};

export function ScrollHolofote({
  id = "cases",
  eyebrow = "Como funciona",
  heading,
  intro,
  cases,
}: ScrollHolofoteProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return; // fica no estado default (sem dimming), sem observer

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const index = cardRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: [0.6], rootMargin: "-20% 0px -20% 0px" }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [cases.length]);

  return (
    <section id={id} aria-label={heading} className="relative scroll-mt-20">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-8 px-4 py-14 md:grid-cols-[0.9fr_1.2fr_0.9fr] md:px-6 md:py-20">
        {/* coluna esquerda — estática */}
        <div className="md:sticky md:top-32 md:self-start">
          <span className="mb-4 inline-flex items-center gap-2 font-body text-caption font-semibold uppercase tracking-[0.1em] text-accent-text before:content-['—'] after:content-['—'] before:opacity-60 after:opacity-60">
            {eyebrow}
          </span>
          <h2 className="font-display text-h3 font-extrabold uppercase leading-tight text-foreground">
            {heading}
          </h2>
          {intro && <p className="mt-3 text-sm text-muted-foreground">{intro}</p>}
        </div>

        {/* coluna central — stack de cards */}
        <div className="flex flex-col gap-6">
          {cases.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-active={index === activeIndex ? "true" : "false"}
              className="group aspect-[4/5] rounded-lg border border-border bg-gradient-to-br from-blue-700 to-card p-5 opacity-30 brightness-[.55] transition-[opacity,filter] duration-base ease-premium data-[active=true]:opacity-100 data-[active=true]:brightness-100 motion-reduce:opacity-100 motion-reduce:brightness-100"
            >
              <div className="flex h-full flex-col justify-end">
                <span className="font-display text-lg font-extrabold uppercase text-white">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* coluna direita — texto sincronizado com o card ativo */}
        <div className="md:sticky md:top-32 md:self-start">
          <div className="relative min-h-[120px]">
            {cases.map((item, index) => (
              <div
                key={item.id}
                data-active={index === activeIndex ? "true" : "false"}
                aria-hidden={index !== activeIndex}
                className="absolute inset-0 translate-y-3 opacity-0 transition-[opacity,transform] duration-base ease-premium data-[active=true]:relative data-[active=true]:translate-y-0 data-[active=true]:opacity-100"
              >
                <span className="font-body text-caption font-semibold uppercase tracking-[0.1em] text-accent-text">
                  {item.client}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
