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
  cases: HolofoteCase[];
};

const DEV_CASES: HolofoteCase[] = [
  {
    id: "dev-case-01",
    title: "Aurora",
    client: "Cliente A",
    description: "Série de motion gerada por IA para redes sociais.",
  },
  {
    id: "dev-case-02",
    title: "Sinal",
    client: "Cliente B",
    description: "Vídeo institucional com atores sintéticos e trilha original.",
  },
  {
    id: "dev-case-03",
    title: "Origem",
    client: "Cliente C",
    description: "Campanha completa, do roteiro à edição, criada com IA.",
  },
];

export function ScrollHolofote({ id = "cases", cases }: ScrollHolofoteProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pega o item mais próximo do centro da viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const index = rowRefs.current.findIndex((el) => el === visible[0].target);
        if (index !== -1) setActiveIndex(index);
      },
      {
        // faixa estreita no meio da tela: o card que cruzar ela vira o ativo
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [cases.length]);

  return (
    <section id={id} aria-label="Cases" className="relative scroll-mt-24">
      <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-28">
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-[minmax(0,1fr)_minmax(0,520px)_minmax(0,1fr)]">
          {/* COLUNA ESQUERDA — título grande, sticky, crossfade entre os cases */}
          <div className="hidden md:block">
            <div className="sticky top-1/2 -translate-y-1/2">
              <div className="relative h-32">
                {cases.map((item, index) => (
                  <h2
                    key={item.id}
                    data-active={index === activeIndex}
                    aria-hidden={index !== activeIndex}
                    className="absolute inset-0 flex items-center font-display text-4xl font-black uppercase leading-none text-foreground opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[active=true]:opacity-100 lg:text-5xl"
                  >
                    {item.title}
                  </h2>
                ))}
              </div>
            </div>
          </div>

          {/* COLUNA CENTRAL + DIREITA — uma linha por case.
              Card e texto coexistem na página e esmaecem/acendem juntos. */}
          <div className="contents">
            {cases.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                data-active={index === activeIndex}
                className="group col-start-1 mb-5 md:col-start-2 md:mb-6"
              >
                <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,520px)]">
                  {/* card cinematográfico — 16:9, não ocupa a tela toda */}
                  <div className="aspect-video overflow-hidden rounded-md border border-border bg-gradient-to-br from-blue-700 to-black-900 opacity-30 brightness-[0.5] transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active=true]:opacity-100 group-data-[active=true]:brightness-100 motion-reduce:opacity-100 motion-reduce:brightness-100">
                    <div className="flex h-full items-end p-4">
                      <span className="font-display text-sm font-extrabold uppercase text-white/90">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  {/* texto — mobile: abaixo do card. desktop: reposicionado na col. 3 */}
                  <div className="opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active=true]:opacity-100 motion-reduce:opacity-100 md:absolute md:left-[calc(50%+300px)] md:max-w-[260px]">
                    <span className="font-body text-caption font-semibold uppercase tracking-[0.15em] text-accent-text">
                      {item.client}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HolofoteDevPage() {
  return (
    <main>
      <ScrollHolofote cases={DEV_CASES} />
    </main>
  );
}
