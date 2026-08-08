export function ManifestoSection() {
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="relative isolate overflow-hidden border-b border-border bg-black-900"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-blue-500/16 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] top-[-8rem] -z-10 font-display text-[clamp(12rem,31vw,34rem)] font-black leading-none tracking-[-0.09em] text-white/[0.018]"
      >
        C
      </div>

      <div className="mx-auto flex min-h-[58svh] max-w-container flex-col justify-between px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(20rem,0.58fr)] md:items-end">
          <div>
            <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              Quem faz a Cria
            </p>

            <h1
              id="manifesto-heading"
              className="mt-7 max-w-[24ch] font-display text-h2 font-black uppercase leading-[0.98] tracking-[-0.045em] text-foreground md:mt-9"
            >
              Criamos o <span className="text-blue-300">impossível</span> porque
              dominamos o processo.
            </h1>
          </div>

          <div className="border-l border-border pl-5 md:justify-self-end md:pl-6">
            <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground md:text-base">
              Somos direção, produção, arte, motion e pós trabalhando na mesma
              mesa. A tecnologia entra no processo; o olhar continua sendo
              nosso.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px border-y border-white/10 bg-white/10 md:mt-14 sm:grid-cols-3">
          {[
            ["IA", "como método."],
            ["Audiovisual", "como linguagem."],
            ["Criação", "como resultado."],
          ].map(([subject, complement]) => (
            <p
              key={subject}
              className="bg-black-900 px-4 py-5 text-sm leading-relaxed text-white/62 sm:px-5 md:py-6"
            >
              <strong className="block font-display text-base font-bold uppercase tracking-[-0.01em] text-white">
                {subject}
              </strong>
              {complement}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
