import type { Metadata } from "next";
import { ProjectsCatalog } from "@/components/projects/projects-catalog";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-projects";
import { TEAM_MEMBERS } from "@/lib/team-members";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projetos",
  description:
    "Catálogo de filmes, campanhas e projetos criados pela Cria Frames.",
  path: "/projetos",
});

export default function ProjectsPage() {
  return (
    <ProjectsCatalog projects={PORTFOLIO_PROJECTS} members={TEAM_MEMBERS} />
  );
}
