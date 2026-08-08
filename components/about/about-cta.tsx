import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AboutCta() {
  return (
    <section aria-labelledby="about-cta-heading" className="theme-light bg-background">
      <div className="mx-auto grid max-w-container gap-10 px-4 py-20 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-6 md:py-28">
        <div>
          <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
            Próximo projeto
          </p>
          <h2
            id="about-cta-heading"
            className="mt-5 max-w-[15ch] font-display text-h2 font-black uppercase leading-[0.94] tracking-[-0.045em] text-foreground"
          >
            Tem uma ideia? <span className="text-primary">Traz pra mesa.</span>
          </h2>
        </div>

        <div className="md:pb-1 md:text-right">
          <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            Conta o que você quer colocar no mundo. A conversa começa por aí.
          </p>
          <Link
            href="/contato"
            className="group mt-7 inline-flex min-h-11 items-center gap-3 rounded-pill bg-primary px-7 text-sm font-semibold text-primary-foreground transition-[transform,background] duration-300 ease-premium hover:-translate-y-0.5 hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Falar com o estúdio
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
