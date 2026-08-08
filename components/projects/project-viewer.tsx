"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  X,
} from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-projects";
import type { TeamMember } from "@/lib/team-members";

type ProjectViewerProps = {
  project: PortfolioProject | null;
  projects: PortfolioProject[];
  members?: TeamMember[];
  currentMemberId?: string;
  onClose: () => void;
  onSelect: (project: PortfolioProject) => void;
  returnLabel?: string;
};

export function ProjectViewer({
  project,
  projects,
  members = [],
  currentMemberId,
  onClose,
  onSelect,
  returnLabel = "Projetos",
}: ProjectViewerProps) {
  const currentIndex = project
    ? projects.findIndex((item) => item.slug === project.slug)
    : -1;
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;
  const projectMembers = project
    ? members.filter((member) => project.memberIds.includes(member.id))
    : [];

  return (
    <DialogPrimitive.Root
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup className="fixed inset-0 z-[100] overflow-y-auto p-3 transition-[opacity,transform] duration-300 data-ending-style:scale-[0.985] data-ending-style:opacity-0 data-starting-style:scale-[0.985] data-starting-style:opacity-0 md:p-6">
          {project && (
            <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col justify-center">
              <header className="mb-4 flex items-center justify-between gap-6 text-white md:mb-5">
                <div className="min-w-0">
                  <DialogPrimitive.Title className="truncate font-display text-lg font-black uppercase tracking-[-0.02em] md:text-2xl">
                    {project.title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">
                    {project.category} · {project.year} · {project.duration}
                  </DialogPrimitive.Description>
                </div>
                <DialogPrimitive.Close
                  aria-label="Fechar projeto"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </DialogPrimitive.Close>
              </header>

              <div className="overflow-hidden rounded-md border border-white/10 bg-black shadow-2xl">
                <iframe
                  key={project.slug}
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={`Projeto ${project.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="aspect-video max-h-[76vh] w-full bg-black"
                />
              </div>

              {projectMembers.length > 0 && (
                <section
                  aria-label="Participantes do projeto"
                  className="mt-3 rounded-md border border-white/10 bg-black/70 px-5 py-4 text-white md:px-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                        Participaram deste projeto
                      </p>
                      <p className="mt-1 text-xs text-white/42">
                        {projectMembers.length === 1
                          ? "1 integrante"
                          : `${projectMembers.length} integrantes`}
                      </p>
                    </div>

                    <ul className="flex flex-wrap gap-2 sm:justify-end">
                      {projectMembers.map((member) => (
                        <li key={member.id}>
                          {member.id === currentMemberId ? (
                            <span
                              aria-current="page"
                              className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-blue-300/35 bg-blue-500/12 px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-white"
                            >
                              {member.name}
                              <span className="text-[8px] tracking-[0.12em] text-blue-300">
                                Perfil atual
                              </span>
                            </span>
                          ) : (
                            <Link
                              href={`/sobre/equipe/${member.id}`}
                              aria-label={`Ver perfil de ${member.name}`}
                              className="group/member inline-flex min-h-10 items-center gap-2 rounded-pill border border-white/14 bg-white/[0.04] px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/78 transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-blue-300/60 hover:bg-blue-500/16 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                            >
                              {member.name}
                              <ArrowUpRight
                                aria-hidden="true"
                                className="h-3.5 w-3.5 text-blue-300 transition-transform duration-300 group-hover/member:-translate-y-0.5 group-hover/member:translate-x-0.5"
                              />
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              <details className="group/context mt-4 rounded-md border border-white/10 bg-black/70 text-white open:bg-black md:mt-5">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white md:px-6 [&::-webkit-details-marker]:hidden">
                  Por trás do projeto
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-open/context:rotate-180"
                  />
                </summary>
                <div className="border-t border-white/10 px-5 py-5 md:px-6 md:py-6">
                  <p className="w-full text-justify text-sm leading-relaxed text-white/70 [hyphens:auto] md:text-base">
                    {project.context}
                  </p>
                </div>
              </details>

              {projects.length > 1 && currentIndex >= 0 && (
                <nav
                  aria-label="Navegação entre projetos"
                  className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2 text-white"
                >
                  <button
                    type="button"
                    onClick={() =>
                      previousProject ? onSelect(previousProject) : onClose()
                    }
                    className="group/nav flex min-h-20 min-w-0 items-center gap-3 rounded-md border border-white/10 bg-black/70 px-4 py-3 text-left transition-[border-color,background-color] hover:border-blue-500/50 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-5"
                  >
                    <ArrowLeft
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform group-hover/nav:-translate-x-1"
                    />
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        {previousProject ? "Anterior" : "Voltar"}
                      </span>
                      <span className="mt-1 block truncate font-display text-sm font-bold uppercase tracking-[-0.015em] md:text-base">
                        {previousProject?.title ?? returnLabel}
                      </span>
                    </span>
                  </button>

                  <span className="flex min-w-12 items-center justify-center text-[10px] tabular-nums tracking-[0.14em] text-white/35">
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    onClick={() => (nextProject ? onSelect(nextProject) : onClose())}
                    className="group/nav flex min-h-20 min-w-0 items-center justify-end gap-3 rounded-md border border-white/10 bg-black/70 px-4 py-3 text-right transition-[border-color,background-color] hover:border-blue-500/50 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-5"
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        {nextProject ? "Próximo" : "Voltar"}
                      </span>
                      <span className="mt-1 block truncate font-display text-sm font-bold uppercase tracking-[-0.015em] md:text-base">
                        {nextProject?.title ?? returnLabel}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform group-hover/nav:translate-x-1"
                    />
                  </button>
                </nav>
              )}
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
