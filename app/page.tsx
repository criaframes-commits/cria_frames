import { Hero } from "@/components/home/hero";
import { PreEstreia } from "@/components/home/pre-estreia";
import { ScrollHolofote } from "@/components/holofote/scroll-holofote";
import { ProvaSocial } from "@/components/home/prova-social";
import { CtaFinal } from "@/components/home/cta-final";

const CASES = [
  {
    id: "case-01",
    title: "Aurora",
    client: "Cliente A",
    description:
      "Série de motion gerada por IA para redes sociais, produção 100% interna.",
  },
  {
    id: "case-02",
    title: "Sinal",
    client: "Cliente B",
    description: "Vídeo institucional com atores sintéticos e trilha original.",
  },
  {
    id: "case-03",
    title: "Origem",
    client: "Cliente C",
    description: "Campanha completa: roteiro, imagem e edição via IA.",
  },
  {
    id: "case-04",
    title: "Pulso",
    client: "Cliente D",
    description: "Reel de lançamento de produto em 48h de turnaround.",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* TEMPORÁRIO — remover este bloco e o import após a estreia do curta */}
      <PreEstreia />
      <ScrollHolofote heading="Cases em destaque" cases={CASES} />
      <ProvaSocial />
      <CtaFinal />
    </main>
  );
}
