"use client";

import { useEffect, useRef, useState } from "react";
import { CaseViewer } from "@/components/cases/case-viewer";
import type { PortfolioCase } from "@/lib/portfolio-cases";

type ScrollHolofoteProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  cases: PortfolioCase[];
};

export function ScrollHolofote({
  id = "cases",
  eyebrow,
  heading,
  intro,
  cases,
}: ScrollHolofoteProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCase, setSelectedCase] = useState<PortfolioCase | null>(null);
  const activeIndexRef = useRef(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const openedFromRef = useRef<HTMLButtonElement | null>(null);

  const closeSelectedCase = () => {
    setSelectedCase(null);
    window.requestAnimationFrame(() => {
      openedFromRef.current?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveCard = () => {
      animationFrame = 0;
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const bounds = card.getBoundingClientRect();
        const cardCenter = bounds.top + bounds.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndexRef.current) {
        activeIndexRef.current = closestIndex;
        setActiveIndex(closestIndex);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateActiveCard);
    };

    updateActiveCard();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [cases.length]);

  return (
    <section
      id={id}
      aria-label={heading}
      className="relative scroll-mt-20 overflow-clip bg-background"
    >
      <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-0">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(360px,500px)_minmax(0,1fr)] md:gap-x-10 lg:gap-x-14">
          <div className="mb-10 md:mb-0 md:self-stretch">
            <div className="md:sticky md:top-[calc(50%_-_4rem)]">
              {eyebrow && (
                <p className="mb-4 font-body text-caption font-semibold uppercase tracking-[0.14em] text-accent-text">
                  {eyebrow}
                </p>
              )}

              <div className="hidden min-h-32 items-center md:flex">
                <div className="relative w-full">
                  {cases.map((item, index) => (
                    <h2
                      key={item.slug}
                      data-active={index === activeIndex ? "true" : "false"}
                      aria-hidden={index !== activeIndex}
                      className="absolute left-0 top-1/2 w-full -translate-y-1/2 font-display text-[clamp(2.5rem,4vw,4.75rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-foreground opacity-0 transition-opacity duration-500 ease-premium data-[active=true]:opacity-100"
                    >
                      {item.title}
                    </h2>
                  ))}
                </div>
              </div>

              <h2 className="font-display text-h2 font-black uppercase leading-none tracking-[-0.04em] text-foreground md:hidden">
                {heading}
              </h2>
              {intro && (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {intro}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:py-[31svh]">
            {cases.map((item, index) => (
              <article
                key={item.slug}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                data-active={index === activeIndex ? "true" : "false"}
                className="group"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    openedFromRef.current = event.currentTarget;
                    setSelectedCase(item);
                  }}
                  aria-label={`Assistir ao case ${item.title}`}
                  className="block w-full rounded-[3px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                >
                  <div className="relative aspect-video overflow-hidden rounded-[3px] border border-border bg-gradient-to-br from-blue-700 via-blue-500 to-black-900 opacity-30 brightness-[0.42] saturate-50 transition-[opacity,filter,box-shadow] duration-500 ease-premium group-data-[active=true]:opacity-100 group-data-[active=true]:brightness-100 group-data-[active=true]:saturate-100 group-hover:shadow-[0_0_55px_rgba(61,110,255,0.2)] motion-reduce:opacity-100 motion-reduce:brightness-100 motion-reduce:saturate-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.28),transparent_35%)]" />
                    <span className="absolute bottom-4 left-4 font-display text-sm font-extrabold uppercase tracking-[-0.02em] text-white">
                      {item.title}
                    </span>
                  </div>
                </button>

                <div className="pt-4 md:hidden">
                  <p className="font-body text-caption font-semibold uppercase tracking-[0.14em] text-accent-text">
                    {item.client}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.context}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden md:block md:self-stretch">
            <div className="sticky top-[calc(50%_-_4rem)]">
              <div className="relative min-h-32">
                {cases.map((item, index) => (
                  <div
                    key={item.slug}
                    data-active={index === activeIndex ? "true" : "false"}
                    aria-hidden={index !== activeIndex}
                    className="absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-0 transition-opacity duration-500 ease-premium data-[active=true]:opacity-100"
                  >
                    <p className="font-body text-caption font-semibold uppercase tracking-[0.16em] text-accent-text">
                      {item.client}
                    </p>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {item.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CaseViewer caseItem={selectedCase} onClose={closeSelectedCase} />
    </section>
  );
}
