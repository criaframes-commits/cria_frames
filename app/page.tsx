import { Hero } from "@/components/home/hero";
import { PreEstreia } from "@/components/home/pre-estreia";
import { ScrollHolofote } from "@/components/holofote/scroll-holofote";
import { ProvaSocial } from "@/components/home/prova-social";
import { CtaFinal } from "@/components/home/cta-final";
import { PORTFOLIO_CASES } from "@/lib/portfolio-cases";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* TEMPORÁRIO — remover este bloco e o import após a estreia do curta */}
      <PreEstreia />
      <ScrollHolofote heading="Cases em destaque" cases={PORTFOLIO_CASES} />
      <ProvaSocial />
      <CtaFinal />
    </main>
  );
}
