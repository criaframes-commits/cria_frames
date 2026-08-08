import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ServicesCta() {
  return (
    <section aria-labelledby="services-cta-heading" className="bg-blue-700">
      <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-8 px-4 py-14 md:flex-row md:items-center md:px-6 md:py-16">
        <div>
          <p className="text-caption font-semibold uppercase tracking-[0.18em] text-white/70">
            Próximo passo
          </p>
          <h2
            id="services-cta-heading"
            className="mt-3 max-w-[18ch] font-display text-[clamp(1.75rem,1.35rem+1.25vw,2.65rem)] font-black uppercase leading-[0.95] tracking-[-0.035em] text-white"
          >
            Conta a ideia. A gente desenha o caminho.
          </h2>
        </div>
        <Link
          href="/contato"
          className="group inline-flex min-h-11 shrink-0 items-center gap-3 rounded-pill bg-white px-7 text-sm font-semibold text-black-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Pedir orçamento
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
