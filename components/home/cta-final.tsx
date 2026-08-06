import Link from "next/link";

export function CtaFinal() {
  return (
    // theme-light = Modo Estúdio: vira claro por seção, sinaliza "hora de decidir"
    <section className="theme-light bg-background">
      <div className="mx-auto max-w-container px-4 py-24 text-center md:px-6 md:py-32">
        <h2 className="mx-auto max-w-[18ch] font-display text-h2 font-black uppercase leading-[1.05] text-foreground">
          Vamos criar o impossível
        </h2>
        <p className="mx-auto mt-4 max-w-[42ch] text-muted-foreground">
          Conte o que você precisa. Respondemos com uma proposta em até 2 dias
          úteis.
        </p>
        <Link
          href="/contato"
          className="mt-10 inline-flex min-h-11 items-center rounded-pill bg-primary px-8 text-sm font-semibold text-primary-foreground transition-[transform,background] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-blue-900"
        >
          Pedir orçamento
        </Link>
      </div>
    </section>
  );
}
