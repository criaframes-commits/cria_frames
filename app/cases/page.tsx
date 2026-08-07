import type { Metadata } from "next";
import { CasesCatalog } from "@/components/cases/cases-catalog";
import { PORTFOLIO_CASES } from "@/lib/portfolio-cases";

export const metadata: Metadata = {
  title: "Cases — Cria Frames",
  description:
    "Catálogo de filmes, campanhas e projetos criados pela Cria Frames.",
};

export default function CasesPage() {
  return <CasesCatalog cases={PORTFOLIO_CASES} />;
}

