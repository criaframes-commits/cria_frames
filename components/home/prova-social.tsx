"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Feedback = {
  id: string;
  author: string;
  role: string;
  quote: string;
};

const FEEDBACKS: Feedback[] = [
  {
    id: "feedback-01",
    author: "Cliente A",
    role: "Direção de marketing",
    quote:
      "A Cria Frames entendeu a ideia desde o primeiro encontro e transformou um briefing complexo em uma narrativa clara, bonita e pronta para gerar resultado.",
  },
  {
    id: "feedback-02",
    author: "Cliente B",
    role: "Produção executiva",
    quote:
      "O que mais impressionou foi a combinação entre velocidade e cuidado. Tivemos acompanhamento durante todo o processo, decisões bem explicadas e uma entrega que manteve a personalidade da marca. Mesmo com um prazo curto e várias frentes acontecendo ao mesmo tempo, o projeto chegou consistente do roteiro à finalização.",
  },
  {
    id: "feedback-03",
    author: "Cliente C",
    role: "Brand manager",
    quote:
      "A equipe trouxe soluções que a gente ainda não tinha imaginado e soube usar IA sem deixar o trabalho com aparência genérica. O resultado ficou realmente nosso.",
  },
  {
    id: "feedback-04",
    author: "Cliente D",
    role: "Direção criativa",
    quote:
      "Do primeiro frame ao último, houve intenção. A Cria conseguiu equilibrar experimentação, linguagem de marca e acabamento com uma fluidez rara no processo criativo.",
  },
  {
    id: "feedback-05",
    author: "Cliente E",
    role: "Fundador",
    quote:
      "Chegamos com uma referência abstrata e saímos com uma peça que comunica exatamente o que queríamos. O processo foi próximo, rápido e muito bem conduzido.",
  },
  {
    id: "feedback-06",
    author: "Cliente F",
    role: "Liderança de conteúdo",
    quote:
      "Além da qualidade visual, a parceria trouxe segurança para experimentar. Cada ajuste tinha propósito e o time sempre apresentava uma alternativa melhor, sem perder tempo nem descaracterizar a campanha. Foi uma construção colaborativa de verdade, com transparência em todas as etapas e um resultado acima do que imaginávamos no início.",
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
      data-expanded={expanded ? "true" : "false"}
      className="group/card relative flex min-h-72 w-[min(84vw,23rem)] shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] transition-[border-color,background-color] duration-300 ease-premium data-[expanded=true]:border-blue-500/45 data-[expanded=true]:bg-black-800 md:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(61,110,255,0.16),transparent_42%)]" />

      <div className="relative flex items-start justify-between gap-4">
        <Quote className="h-8 w-8 fill-blue-500/15 text-blue-300" aria-hidden="true" />
        <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Feedback
        </span>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col">
        <p
          id={contentId}
          ref={quoteRef}
          data-expanded={expanded ? "true" : "false"}
          className="max-h-[7.5rem] overflow-hidden text-[0.95rem] leading-6 text-foreground transition-[max-height] duration-500 ease-premium data-[expanded=true]:max-h-80 data-[expanded=true]:overflow-y-auto data-[expanded=true]:pr-2"
        >
          “{feedback.quote}”
        </p>

        {canExpand && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => onToggle(instanceKey)}
            className="mt-3 inline-flex w-fit items-center gap-1.5 font-body text-xs font-semibold text-blue-300 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
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

      <footer className="relative mt-7 border-t border-border pt-5">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.04em] text-foreground">
          {feedback.author}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {feedback.role}
        </p>
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
      className="relative mt-20 bg-background py-24 md:mt-32 md:py-32"
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

      <div className="mt-12 overflow-x-clip py-6 md:mt-16 md:py-8">
        <div
          className={cn(
            "flex w-max items-stretch animate-[marquee_52s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none",
            expandedCard && "[animation-play-state:paused]"
          )}
        >
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className="flex min-w-[100vw] shrink-0 items-center justify-around gap-5 px-2.5"
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
