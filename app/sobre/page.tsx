import type { Metadata } from "next";
import { AboutCta } from "@/components/about/about-cta";
import { HistorySection } from "@/components/about/history-section";
import { ManifestoSection } from "@/components/about/manifesto-section";
import { PillarsSection } from "@/components/about/pillars-section";
import { TeamSection } from "@/components/about/team-section";
import { TEAM_MEMBERS } from "@/lib/team-members";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre",
  description:
    "Conheça a história, o processo e a equipe por trás da Cria Frames.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <main>
      <ManifestoSection />
      <HistorySection />
      <PillarsSection />
      <TeamSection members={TEAM_MEMBERS} />
      <AboutCta />
    </main>
  );
}
