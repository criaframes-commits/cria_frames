const PROCESS_STEPS = [
  {
    number: "01",
    title: "Briefing",
    description:
      "A gente entende objetivo, público, contexto e o que precisa ser entregue.",
  },
  {
    number: "02",
    title: "Produção",
    description:
      "Conceito aprovado, o projeto entra em roteiro, direção e execução.",
  },
  {
    number: "03",
    title: "Revisão",
    description:
      "Você acompanha os marcos certos e concentra o retorno em rodadas claras.",
  },
  {
    number: "04",
    title: "Entrega",
    description:
      "Finalizamos e organizamos os arquivos nos formatos combinados.",
  },
] as const;

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-b border-border bg-black-900"
    >
      <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.56fr)] md:items-end">
          <div>
            <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              Como funciona
            </p>
            <h2
              id="process-heading"
              className="mt-5 max-w-[12ch] font-display text-h2 font-black uppercase leading-[0.94] tracking-[-0.045em] text-foreground"
            >
              Do briefing à entrega.
            </h2>
          </div>
          <p className="max-w-[36ch] border-l border-border pl-5 text-sm leading-relaxed text-muted-foreground md:justify-self-end md:pl-6 md:text-base">
            Um processo visível, com decisões claras e espaço para o projeto
            evoluir sem perder o rumo.
          </p>
        </div>

        <ol className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.number}
              className="group relative min-h-[15rem] overflow-hidden bg-black-800 p-6 md:min-h-[17rem] md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-1 w-0 bg-primary transition-[width] duration-500 ease-premium group-hover:w-full"
              />
              <div className="flex h-full flex-col justify-between">
                <span className="font-display text-[clamp(2.5rem,2rem+1.2vw,3.5rem)] font-black leading-none tracking-[-0.05em] text-primary/20 transition-colors duration-500 group-hover:text-primary">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-black uppercase leading-none tracking-[-0.02em] text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
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
