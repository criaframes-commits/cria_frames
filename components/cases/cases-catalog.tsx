"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Play, Search } from "lucide-react";
import { CaseViewer } from "@/components/cases/case-viewer";
import {
  CASE_CATEGORIES,
  type PortfolioCase,
} from "@/lib/portfolio-cases";

type CasesCatalogProps = {
  cases: PortfolioCase[];
};

type CaseCategory = (typeof CASE_CATEGORIES)[number];

export function CasesCatalog({ cases }: CasesCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CaseCategory>("Todos");
  const [selectedCase, setSelectedCase] = useState<PortfolioCase | null>(null);

  useEffect(() => {
    const syncCaseFromUrl = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      setSelectedCase(cases.find((item) => item.slug === slug) ?? null);
    };

    syncCaseFromUrl();
    window.addEventListener("hashchange", syncCaseFromUrl);
    window.addEventListener("popstate", syncCaseFromUrl);

    return () => {
      window.removeEventListener("hashchange", syncCaseFromUrl);
      window.removeEventListener("popstate", syncCaseFromUrl);
    };
  }, [cases]);

  const filteredCases = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return cases.filter((item) => {
      const matchesCategory = category === "Todos" || item.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [item.title, item.client, item.category].some((value) =>
          value.toLocaleLowerCase("pt-BR").includes(normalizedQuery)
        );

      return matchesCategory && matchesQuery;
    });
  }, [cases, category, query]);

  const openCase = (item: PortfolioCase) => {
    setSelectedCase(item);
    window.history.pushState(null, "", `#${item.slug}`);
  };

  const closeCase = () => {
    setSelectedCase(null);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`
    );
  };

  return (
    <>
      <main>
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-container px-4 pb-16 pt-20 md:px-6 md:pb-20 md:pt-28">
            <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              Arquivo Cria Frames
            </p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.55fr)] lg:items-end">
              <h1 className="max-w-[13ch] font-display text-display font-black uppercase leading-[0.88] tracking-[-0.055em] text-foreground">
                Ideias que viraram imagem.
              </h1>
              <p className="max-w-[42ch] text-base leading-relaxed text-muted-foreground lg:justify-self-end">
                Um catálogo vivo de filmes, campanhas e experimentos criados
                entre inteligência artificial, cinema e processo.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="catalog-heading" className="bg-background pb-28">
          <h2 id="catalog-heading" className="sr-only">
            Catálogo de cases
          </h2>

          <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-container flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
              <div
                className="flex gap-2 overflow-x-auto pb-1 md:pb-0"
                aria-label="Filtrar por categoria"
              >
                {CASE_CATEGORIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                    className="shrink-0 rounded-pill border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground transition-[color,background,border-color] duration-200 hover:border-blue-500/50 hover:text-foreground aria-pressed:border-blue-500 aria-pressed:bg-blue-500 aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <label className="relative block w-full md:w-72">
                <span className="sr-only">Buscar projetos</span>
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar projeto"
                  className="h-11 w-full rounded-pill border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-500"
                />
              </label>
            </div>
          </div>

          <div className="mx-auto max-w-container px-4 pt-10 md:px-6 md:pt-14">
            <p className="mb-7 text-xs uppercase tracking-[0.14em] text-muted-foreground" aria-live="polite">
              {filteredCases.length} {filteredCases.length === 1 ? "projeto" : "projetos"}
            </p>

            {filteredCases.length > 0 ? (
              <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-16">
                {filteredCases.map((item, index) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`Assistir ao case ${item.title}`}
                    onClick={() => openCase(item)}
                    className="group/case text-left opacity-0 animate-hero-in focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="relative block aspect-video overflow-hidden rounded-lg border border-border bg-black-900 transition-[border-color,box-shadow] duration-500 ease-premium group-hover/case:border-blue-500/45 group-hover/case:shadow-[0_0_70px_rgba(61,110,255,0.22)] group-focus-visible/case:border-blue-500/45 group-focus-visible/case:shadow-[0_0_70px_rgba(61,110,255,0.22)]">
                      <Image
                        src={item.coverSrc}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-contain brightness-[0.82] transition-[transform,filter] duration-700 ease-premium group-hover/case:scale-[1.045] group-hover/case:brightness-110 group-focus-visible/case:scale-[1.045] group-focus-visible/case:brightness-110 motion-reduce:transform-none"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.13),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover/case:opacity-100 group-focus-visible/case:opacity-100"
                      />
                      <span className="absolute bottom-5 right-5 inline-flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white text-black-950 opacity-0 shadow-xl transition-[opacity,transform] duration-300 ease-premium group-hover/case:translate-y-0 group-hover/case:opacity-100 group-focus-visible/case:translate-y-0 group-focus-visible/case:opacity-100">
                        <Play aria-hidden="true" className="ml-0.5 h-4 w-4 fill-current" />
                      </span>
                    </span>

                    <span className="mt-5 flex items-start justify-between gap-6">
                      <span>
                        <span className="block font-display text-2xl font-black uppercase tracking-[-0.035em] text-foreground md:text-3xl">
                          {item.title}
                        </span>
                        <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          {item.category} · {item.client}
                        </span>
                      </span>
                      <span className="pt-1 font-body text-xs tabular-nums text-muted-foreground">
                        {item.year}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="border-y border-border py-20 text-center">
                <p className="font-display text-2xl font-black uppercase text-foreground">
                  Nenhum projeto encontrado.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("Todos");
                  }}
                  className="mt-5 text-sm font-semibold text-blue-300 underline underline-offset-4"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <CaseViewer caseItem={selectedCase} onClose={closeCase} />
    </>
  );
}
