import type { Metadata } from "next";
import { AboutCta } from "@/components/about/about-cta";
import { HistorySection } from "@/components/about/history-section";
import { ManifestoSection } from "@/components/about/manifesto-section";
import { PillarsSection } from "@/components/about/pillars-section";
import { TeamSection } from "@/components/about/team-section";
import { TEAM_MEMBERS } from "@/lib/team-members";

export const metadata: Metadata = {
  title: "Sobre — Cria Frames",
  description:
    "Conheça a história, o processo e a equipe por trás da Cria Frames.",
};

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
