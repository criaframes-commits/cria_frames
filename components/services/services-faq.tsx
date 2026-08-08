"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "Que tipo de projeto vocês produzem?",
    answer:
      "Filmes de marca, campanhas, conteúdos para redes, motion design e projetos especiais. O formato nasce do objetivo — não de um pacote fechado.",
  },
  {
    question: "Preciso chegar com o roteiro pronto?",
    answer:
      "Não. Podemos entrar desde a ideia e construir conceito, roteiro e linguagem com você. Se já existe um roteiro, partimos dele e organizamos a produção.",
  },
  {
    question: "Como a IA entra no processo?",
    answer:
      "Ela pode apoiar pesquisa, prototipagem, geração de imagens, movimento e acabamento. Usamos apenas onde melhora a solução; a direção criativa continua conduzindo tudo.",
  },
  {
    question: "Quanto tempo leva para produzir?",
    answer:
      "Depende do escopo, da quantidade de peças e das aprovações. Depois do briefing, enviamos um cronograma com etapas e datas claras antes de começar.",
  },
  {
    question: "Vocês trabalham com equipes de outras cidades?",
    answer:
      "Sim. Briefing, acompanhamento e aprovações podem acontecer de forma remota, com produção presencial organizada quando o projeto pedir.",
  },
] as const;

export function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="theme-light bg-background"
    >
      <div className="mx-auto grid max-w-container gap-12 px-4 py-20 md:grid-cols-[minmax(13rem,0.52fr)_minmax(0,1.48fr)] md:px-6 md:py-28 lg:gap-20">
        <div>
          <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-5 max-w-[10ch] font-display text-h2 font-black uppercase leading-[0.94] tracking-[-0.045em] text-foreground"
          >
            Dúvidas comuns.
          </h2>
        </div>

        <div className="border-t border-border">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index;
            const answerId = `service-faq-answer-${index}`;

            return (
              <div key={item.question} className="border-b border-border">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary md:py-7"
                >
                  <span className="font-display text-base font-bold uppercase leading-tight tracking-[-0.01em] text-foreground md:text-lg">
                    {item.question}
                  </span>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-[background,color,border-color] duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Plus
                      aria-hidden="true"
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        open && "rotate-45"
                      )}
                    />
                  </span>
                </button>
                <div
                  id={answerId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-premium",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[65ch] pb-7 pr-12 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
