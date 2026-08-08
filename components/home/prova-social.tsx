"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Feedback = {
  id: string;
  author: string;
  role?: string;
  quote: string;
};

const FEEDBACKS: Feedback[] = [
  {
    id: "feedback-01",
    author: "Dayana Vieira",
    quote: "Incrível!!! Vcs arrasam!!! 🔥🔥 🚀 🚀",
  },
  {
    id: "feedback-02",
    author: "Geovanna",
    quote: "Padrão Cria! 👏🏽👏🏽👏🏽🔥",
  },
  {
    id: "feedback-03",
    author: "Wanessa Maria de Carvalho",
    quote: "Ficou perfeito e emocionou a todos…parabéns",
  },
  {
    id: "feedback-04",
    author: "Ntake Creative Media",
    role: "Agência de publicidade",
    quote:
      "Excelente direção, Seedance 2.5 pode melhorar muito o skin tone dessas cenas, a versão nova é espetacular…",
  },
  {
    id: "feedback-05",
    author: "Filippe Alves Duarte",
    quote: "👏👏👏👏 Trabalho top demais",
  },
  {
    id: "feedback-06",
    author: "Cecília de Lima",
    quote: "Perfeito, em todos os detalhes 👏👏",
  },
  {
    id: "feedback-07",
    author: "Tatiane Roque Brito",
    quote: "Ficou muito bom, vcs estão de parabéns 👏🏻👏🏻",
  },
  {
    id: "feedback-08",
    author: "Isabela Matrak",
    quote: "Ficou fenomenal ⭐️⭐️⭐️⭐️⭐️",
  },
  {
    id: "feedback-09",
    author: "Geovanna Zafred",
    quote: "Parabéns aos envolvidos 👏👏 Ficou incrível!!",
  },
  {
    id: "feedback-10",
    author: "Felipe Santos",
    quote: "Isso ficou incrível!!👏👏🔥",
  },
  {
    id: "feedback-11",
    author: "Gabriel Resani",
    role: "Criador de conteúdo IA",
    quote: "muito bom 👏",
  },
  {
    id: "feedback-12",
    author: "Lívia Costa Andrade",
    role: "Criador de conteúdo IA",
    quote: "👏👏👏👏👏Ficou Lindo!!",
  },
];

type FeedbackCardProps = {
  feedback: Feedback;
  instanceKey: string;
  expanded: boolean;
  onToggle: (instanceKey: string) => void;
};

function FeedbackCard({
  feedback,
  instanceKey,
  expanded,
  onToggle,
}: FeedbackCardProps) {
  const contentId = useId();
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote || expanded) return;

    const measureOverflow = () => {
      setCanExpand(quote.scrollHeight > quote.clientHeight + 1);
    };

    const frame = window.requestAnimationFrame(measureOverflow);
    const resizeObserver = new ResizeObserver(measureOverflow);
    resizeObserver.observe(quote);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [expanded, feedback.quote]);

  return (
    <article
      data-feedback-card
      data-expanded={expanded ? "true" : "false"}
      className="group/card relative flex h-60 min-h-60 w-[min(84vw,23rem)] shrink-0 snap-center flex-col overflow-hidden rounded-lg border border-border bg-card p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] transition-[border-color,background-color] duration-300 ease-premium data-[expanded=true]:h-auto data-[expanded=true]:border-blue-500/45 data-[expanded=true]:bg-black-800 md:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(61,110,255,0.16),transparent_42%)]" />

      <div className="relative flex items-start justify-between gap-4">
        <Quote className="h-8 w-8 fill-blue-500/15 text-blue-300" aria-hidden="true" />
        <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Feedback
        </span>
      </div>

      <div className="relative mt-3 flex min-h-0 flex-1 flex-col">
        <p
          id={contentId}
          ref={quoteRef}
          data-expanded={expanded ? "true" : "false"}
          className="max-h-11 overflow-hidden text-[0.95rem] leading-[1.375rem] text-foreground transition-[max-height] duration-500 ease-premium data-[expanded=true]:max-h-80 data-[expanded=true]:overflow-y-auto data-[expanded=true]:pr-2"
        >
          “{feedback.quote}”
        </p>

        <div className="mt-2 min-h-5">
          {canExpand && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={contentId}
              onClick={() => onToggle(instanceKey)}
              className="inline-flex w-fit items-center gap-1.5 font-body text-xs font-semibold text-blue-300 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              {expanded ? "Recolher" : "Ler mais..."}
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  expanded && "rotate-180"
                )}
              />
            </button>
          )}
        </div>
      </div>

      <footer className="relative mt-3 flex min-h-[3.25rem] items-center border-t border-border pt-3">
        <div className="min-w-0">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.04em] text-foreground">
            {feedback.author}
          </p>
          {feedback.role && (
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {feedback.role}
            </p>
          )}
        </div>
      </footer>
    </article>
  );
}

export function ProvaSocial() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (instanceKey: string) => {
    setExpandedCard((current) =>
      current === instanceKey ? null : instanceKey
    );
  };

  return (
    <section
      aria-labelledby="feedbacks-heading"
      className="relative mt-16 bg-background py-20 md:mt-24 md:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-0 mx-auto h-px max-w-container bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-36 w-[min(80vw,64rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-3xl"
      />

      <div className="mx-auto max-w-container px-4 md:px-6">
        <p className="font-body text-caption font-semibold uppercase tracking-[0.16em] text-accent-text">
          Feedbacks
        </p>
        <h2
          id="feedbacks-heading"
          className="mt-4 max-w-[18ch] font-display text-h2 font-black uppercase leading-[0.96] tracking-[-0.04em] text-foreground"
        >
          Quem cria com a gente, conta.
        </h2>
      </div>

      <div className="mt-10 overflow-x-auto overscroll-x-contain py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-12 md:overflow-x-clip md:py-6">
        <div
          className={cn(
            "flex w-max snap-x snap-mandatory items-stretch md:snap-none md:animate-[marquee_104s_linear_infinite] md:hover:[animation-play-state:paused] md:focus-within:[animation-play-state:paused] motion-reduce:animate-none",
            expandedCard && "md:[animation-play-state:paused]"
          )}
        >
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className={
                copyIndex === 0
                  ? "flex shrink-0 items-center gap-5 px-4 md:min-w-[100vw] md:justify-around md:px-2.5"
                  : "hidden min-w-[100vw] shrink-0 items-center justify-around gap-5 px-2.5 md:flex"
              }
            >
              {FEEDBACKS.map((feedback) => {
                const instanceKey = `${copyIndex}-${feedback.id}`;

                return (
                  <FeedbackCard
                    key={instanceKey}
                    feedback={feedback}
                    instanceKey={instanceKey}
                    expanded={expandedCard === instanceKey}
                    onToggle={toggleCard}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
