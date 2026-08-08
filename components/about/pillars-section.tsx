const PILLARS = [
  {
    number: "01",
    title: "Ideia",
    description: "Tudo começa por uma ideia capaz de sustentar o filme.",
  },
  {
    number: "02",
    title: "Pré-produção",
    description: "Planejamos antes de gerar, filmar ou animar.",
  },
  {
    number: "03",
    title: "Produção",
    description: "Cada frame responde a uma escolha de direção.",
  },
  {
    number: "04",
    title: "Pós-produção",
    description: "O acabamento é o que faz a imagem permanecer.",
  },
  {
    number: "05",
    title: "Conteúdo",
    description: "A linguagem muda de formato sem perder identidade.",
  },
  {
    number: "06",
    title: "Impacto",
    description: "Criar só faz sentido quando provoca alguma coisa.",
  },
] as const;

export function PillarsSection() {
  return (
    <section
      aria-labelledby="pillars-heading"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.62fr)] md:items-end">
          <div>
            <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              Como pensamos
            </p>
            <h2
              id="pillars-heading"
              className="mt-5 max-w-[13ch] font-display text-h2 font-black uppercase leading-[0.94] tracking-[-0.045em] text-foreground"
            >
              O processo faz parte da criação.
            </h2>
          </div>
          <p className="max-w-[40ch] border-l border-border pl-5 text-sm leading-relaxed text-muted-foreground md:justify-self-end md:pl-6 md:text-base">
            Não separamos técnica de ideia. Cada etapa existe para proteger a
            intenção do projeto até o último frame.
          </p>
        </div>

        <ol className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <li
              key={pillar.number}
              className="group relative min-h-[15rem] overflow-hidden bg-background p-6 md:min-h-[17rem] md:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(61,110,255,0.24),transparent_58%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-xs font-bold tracking-[0.16em] text-blue-300">
                    {pillar.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-8 origin-right bg-blue-300/70 transition-transform duration-500 group-hover:scale-x-150"
                  />
                </div>

                <div>
                  <h3 className="font-display text-[clamp(1.15rem,1rem+0.45vw,1.55rem)] font-black uppercase leading-none tracking-[-0.02em] text-foreground transition-transform duration-500 ease-premium group-hover:-translate-y-1">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/78">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
