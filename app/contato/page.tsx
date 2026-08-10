import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  AtSign,
  Check,
  Clock3,
  Mail,
} from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contato",
  description:
    "Peça um orçamento para filmes de marca, campanhas, motion design e projetos audiovisuais com IA.",
  path: "/contato",
});

const COMMERCIAL_POINTS = [
  "Briefing sem compromisso",
  "Escopo pensado para o projeto",
  "Resposta em até 2 dias úteis",
] as const;

const NEXT_STEPS = [
  ["01", "Entendemos a necessidade"],
  ["02", "Alinhamos formato, prazo e investimento"],
  ["03", "Você recebe uma proposta clara"],
] as const;

export default function ContactPage() {
  return (
    <main className="theme-light bg-background text-foreground">
      <section
        aria-labelledby="contact-heading"
        className="relative isolate overflow-hidden border-b border-border bg-background"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-blue-100/70 blur-[110px]"
        />

        <div className="mx-auto grid min-h-[calc(68svh-var(--site-header-height))] max-w-container gap-12 px-4 py-14 md:grid-cols-[minmax(0,1.12fr)_minmax(19rem,0.58fr)] md:items-end md:px-6 md:py-20 lg:gap-20">
          <div className="hero-fade hero-fade-1">
            <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              Contato · Orçamento
            </p>
            <h1
              id="contact-heading"
              className="mt-5 max-w-[14ch] font-display text-page-title font-black uppercase leading-[0.92] tracking-[-0.045em] text-foreground"
            >
              Seu próximo projeto <span className="text-primary">começa aqui.</span>
            </h1>
            <p className="mt-6 max-w-[53ch] text-base leading-relaxed text-muted-foreground md:text-lede">
              Conte o que você precisa produzir. A gente organiza o caminho e
              responde com os próximos passos para tirar a ideia do papel.
            </p>
            <Link
              href="#orcamento"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-pill bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_16px_38px_rgba(0,68,189,0.22)] transition-[transform,background,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-[0_20px_44px_rgba(0,68,189,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Pedir orçamento
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </Link>
          </div>

          <div className="hero-fade hero-fade-2 border-l border-border pl-5 md:justify-self-end md:pl-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
              Pode chegar com
            </p>
            <p className="mt-4 max-w-[34ch] font-display text-[clamp(1.25rem,1.05rem+0.65vw,1.75rem)] font-bold uppercase leading-tight tracking-[-0.025em] text-foreground">
              Uma ideia, um roteiro, referências ou um briefing completo.
            </p>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
              Se ainda houver perguntas, tudo bem. A primeira conversa serve
              justamente para organizar o projeto.
            </p>
          </div>
        </div>

        <div className="border-t border-border bg-card">
          <ul className="mx-auto grid max-w-container divide-y divide-border px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-6">
            {COMMERCIAL_POINTS.map((point) => (
              <li
                key={point}
                className="flex min-h-16 items-center gap-3 py-4 text-sm font-medium text-foreground sm:px-5 first:sm:pl-0 last:sm:pr-0"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-100 text-primary">
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="orcamento"
        aria-labelledby="budget-heading"
        className="scroll-mt-[var(--site-header-height)] border-b border-border bg-card"
      >
        <div className="mx-auto grid max-w-container gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.55fr)] lg:gap-16 xl:gap-20">
          <div className="rounded-lg border border-border bg-background p-5 shadow-soft sm:p-7 md:p-9">
            <div className="mb-8 border-b border-border pb-7">
              <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
                Pedido de orçamento
              </p>
              <h2
                id="budget-heading"
                className="mt-4 max-w-[16ch] font-display text-h2 font-black uppercase leading-[0.94] tracking-[-0.04em] text-foreground"
              >
                Vamos entender o projeto.
              </h2>
              <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                Preencha o essencial. Quanto mais contexto você compartilhar,
                mais objetiva será a primeira resposta.
              </p>
            </div>

            <ContactForm />
          </div>

          <aside aria-label="Informações de contato" className="space-y-4 lg:pt-3">
            <div className="rounded-lg border border-primary bg-primary p-6 text-primary-foreground md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Fale direto
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.45rem,1.2rem+0.7vw,2rem)] font-black uppercase leading-tight tracking-[-0.03em] text-white">
                Prefere começar pelo e-mail?
              </h2>
              <a
                href="mailto:cria@criaframes.com.br"
                className="group mt-6 inline-flex min-h-11 max-w-full items-center gap-3 rounded-pill bg-white px-5 text-sm font-semibold text-blue-900 transition-transform duration-300 ease-premium hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                <span className="truncate">cria@criaframes.com.br</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="bg-background p-5 md:p-6">
                <Clock3 aria-hidden="true" className="h-5 w-5 text-primary" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                  Prazo de resposta
                </p>
                <p className="mt-2 font-display text-lg font-bold uppercase text-foreground">
                  Até 2 dias úteis
                </p>
              </div>

              <div className="bg-background p-5 md:p-6">
                <AtSign aria-hidden="true" className="h-5 w-5 text-primary" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/cria_frames/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex min-h-11 items-center gap-2 font-display text-lg font-bold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  @cria_frames
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
                O que acontece depois
              </p>
              <ol className="mt-6 divide-y divide-border border-y border-border">
                {NEXT_STEPS.map(([number, label]) => (
                  <li key={number} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 py-4">
                    <span className="font-display text-xs font-bold text-primary">
                      {number}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Atendemos projetos em todo o Brasil, com reuniões remotas e
                produção presencial quando o trabalho pedir.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
