import Image from "next/image";
import Link from "next/link";

export function CtaFinal() {
  return (
    // theme-light = Modo Estúdio: vira claro por seção, sinaliza "hora de decidir"
    <section className="theme-light bg-background">
      <div className="mx-auto max-w-container px-4 py-24 text-center md:px-6 md:py-32">
        <h2 className="mx-auto font-display text-h2 font-black uppercase leading-[0.95] tracking-[-0.045em]">
          <span className="block text-foreground">Você pensa</span>
          <span className="mt-2 block text-primary">
            A gente{" "}
            <Image
              src="/cria-frames-logo-so-texto.svg"
              alt="cria"
              width={690}
              height={470}
              className="inline-block h-[0.9em] w-auto align-[-0.08em]"
            />
          </span>
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
