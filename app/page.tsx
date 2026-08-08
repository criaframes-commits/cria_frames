import { Hero } from "@/components/home/hero";
import { PreEstreia } from "@/components/home/pre-estreia";
import { ScrollHolofote } from "@/components/holofote/scroll-holofote";
import { ProvaSocial } from "@/components/home/prova-social";
import { CtaFinal } from "@/components/home/cta-final";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-projects";
import { TEAM_MEMBERS } from "@/lib/team-members";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* TEMPORÁRIO — remover este bloco e o import após a estreia do curta */}
      <PreEstreia />
      <ScrollHolofote
        heading="Projetos em destaque"
        projects={PORTFOLIO_PROJECTS}
        members={TEAM_MEMBERS}
      />
      <ProvaSocial />
      <CtaFinal />
    </main>
  );
}
