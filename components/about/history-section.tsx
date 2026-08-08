"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const HISTORY = [
  {
    marker: "01",
    label: "A inquietação",
    title: "Antes da Cria.",
    description:
      "Primeiro veio a vontade de produzir imagens com mais liberdade e menos distância entre ideia e execução.",
  },
  {
    marker: "02",
    label: "O encontro",
    title: "Uma mesa só.",
    description:
      "Direção, produção, arte, motion e pós passaram a pensar juntas — desde o primeiro rascunho.",
  },
  {
    marker: "03",
    label: "O método",
    title: "Tecnologia com direção.",
    description:
      "A IA entrou no processo como ferramenta de criação. O repertório, as escolhas e o acabamento continuam humanos.",
  },
  {
    marker: "Agora",
    label: "O estúdio",
    title: "A Cria, hoje.",
    description:
      "Um time que reúne linguagens e técnicas para conduzir cada projeto do conceito à tela.",
  },
] as const;

export function HistorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const updateActiveItem = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const readingLine = window.innerHeight * 0.5;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        itemRefs.current.forEach((item, index) => {
          if (!item) return;
          const bounds = item.getBoundingClientRect();
          const itemCenter = bounds.top + bounds.height / 2;
          const distance = Math.abs(itemCenter - readingLine);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex((current) =>
          current === closestIndex ? current : closestIndex
        );
      });
    };

    updateActiveItem();
    window.addEventListener("scroll", updateActiveItem, { passive: true });
    window.addEventListener("resize", updateActiveItem);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveItem);
      window.removeEventListener("resize", updateActiveItem);
    };
  }, []);

  const progress =
    HISTORY.length > 1 ? (activeIndex / (HISTORY.length - 1)) * 100 : 100;

  return (
    <section
      aria-labelledby="history-heading"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto grid max-w-container gap-14 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:gap-24">
        <div className="self-start lg:sticky lg:top-[calc(var(--site-header-height)+3rem)]">
          <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
            Nossa história
          </p>
          <h2
            id="history-heading"
            className="mt-5 max-w-[11ch] font-display text-h2 font-black uppercase leading-[0.94] tracking-[-0.045em] text-foreground"
          >
            O caminho também é criação.
          </h2>
          <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            A Cria não nasceu pronta. Ela foi tomando forma conforme o processo
            ficou mais próximo, mais inquieto e mais nosso.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[1.12rem] top-10 w-px bg-border"
          >
            <span
              className="block w-px bg-blue-500 transition-[height] duration-700 ease-premium"
              style={{ height: `${progress}%` }}
            />
          </div>

          <ol className="space-y-2">
            {HISTORY.map((item, index) => {
              const active = activeIndex === index;

              return (
                <li
                  key={item.marker}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  data-history-index={index}
                  className="relative grid min-h-[13rem] grid-cols-[2.25rem_minmax(0,1fr)] gap-5 py-6 md:min-h-[15rem] md:gap-8 md:py-8"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 mt-1 h-9 w-9 rounded-full border bg-background transition-[border-color,box-shadow,transform] duration-500",
                      active
                        ? "scale-110 border-blue-300 shadow-[0_0_28px_rgba(61,110,255,0.42)]"
                        : "border-border"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500",
                        active ? "bg-blue-300" : "bg-muted-foreground/35"
                      )}
                    />
                  </span>

                  <div
                    className={cn(
                      "border-t border-border pt-5 transition-[opacity,transform] duration-500 ease-premium md:grid md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8 md:pt-7",
                      active
                        ? "translate-x-0 opacity-100"
                        : "translate-x-1 opacity-45"
                    )}
                  >
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                        {item.marker}
                      </p>
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                    <div className="mt-5 md:mt-0">
                      <h3 className="font-display text-[clamp(1.3rem,1.1rem+0.65vw,1.85rem)] font-black uppercase leading-none tracking-[-0.025em] text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
