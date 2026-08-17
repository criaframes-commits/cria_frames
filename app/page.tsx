import { Hero } from "@/components/home/hero";
import { PreEstreia } from "@/components/home/pre-estreia";
import { ScrollHolofote } from "@/components/holofote/scroll-holofote";
import { ProvaSocial } from "@/components/home/prova-social";
import { CtaFinal } from "@/components/home/cta-final";
import { HOME_FEATURED_PROJECTS } from "@/lib/portfolio-projects";
import { TEAM_MEMBERS } from "@/lib/team-members";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PreEstreia />
      <ScrollHolofote
        heading="Projetos em destaque"
        projects={HOME_FEATURED_PROJECTS}
        members={TEAM_MEMBERS}
      />
      <ProvaSocial />
      <CtaFinal />
    </main>
  );
}
