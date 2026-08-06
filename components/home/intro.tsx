export function Intro() {
  return (
    <section
      aria-label="O que fazemos"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-24">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)]">
          <span className="font-body text-caption font-semibold uppercase tracking-[0.15em] text-accent-text">
            O que fazemos
          </span>
          <p className="max-w-[52ch] text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-relaxed text-foreground">
            Criamos vídeo, motion e campanhas completas com inteligência
            artificial em todas as etapas do processo — da pré-produção à
            finalização.
          </p>
        </div>
      </div>
    </section>
  );
}
