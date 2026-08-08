"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { InlineProjectTeaser } from "@/components/projects/inline-project-teaser";
import { ProjectViewer } from "@/components/projects/project-viewer";
import type { PortfolioProject } from "@/lib/portfolio-projects";
import type { TeamMember } from "@/lib/team-members";
import { cn } from "@/lib/utils";

type MemberProjectsProps = {
  memberName: string;
  memberId: string;
  projects: PortfolioProject[];
  members: TeamMember[];
};

export function MemberProjects({
  memberName,
  memberId,
  projects,
  members,
}: MemberProjectsProps) {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const openedFromRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [projects]);

  const closeSelectedProject = () => {
    setSelectedProject(null);
    window.requestAnimationFrame(() => {
      openedFromRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <section
      id="projetos"
      aria-labelledby="member-projects-heading"
      className="bg-background pb-0 pt-20 md:pt-28"
    >
      <div className="mx-auto max-w-container px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-5 border-b border-border pb-7 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              Projetos selecionados
            </p>
            <h2
              id="member-projects-heading"
              className="mt-4 font-display text-h2 font-black uppercase leading-none tracking-[-0.035em] text-foreground"
            >
              Trabalhos na Cria.
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {projects.length} {projects.length === 1 ? "projeto" : "projetos"} · {memberName}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              data-visible="false"
              className="translate-y-8 opacity-0 transition-[opacity,transform] duration-700 ease-premium data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Assistir ao projeto ${project.title}`}
                onClick={(event) => {
                  openedFromRef.current = event.currentTarget;
                  setSelectedProject(project);
                }}
                className={cn(
                  "group/project relative block w-full overflow-hidden border border-border bg-black-900 text-left transition-[border-color,box-shadow] duration-500 hover:border-blue-500/45 hover:shadow-[0_18px_48px_rgba(0,0,0,0.42)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300",
                  project.teaser ? "rounded-t-md" : "rounded-md"
                )}
              >
                <span className="relative block aspect-video overflow-hidden bg-black">
                  <Image
                    src={project.coverSrc}
                    alt=""
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain brightness-[0.82] transition-[transform,filter] duration-700 ease-premium group-hover/project:scale-[1.04] group-hover/project:brightness-110 group-focus-visible/project:scale-[1.04] group-focus-visible/project:brightness-110 motion-reduce:transform-none"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 md:p-6">
                    <span>
                      <span className="block font-display text-xl font-bold uppercase tracking-[-0.02em] text-white md:text-2xl">
                        {project.title}
                      </span>
                      <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                        {project.category} · {project.year}
                      </span>
                    </span>
                    <span className="inline-flex h-10 w-10 shrink-0 translate-y-2 items-center justify-center rounded-md bg-blue-500 text-white opacity-0 transition-[opacity,transform,background,color] duration-300 group-hover/project:translate-y-0 group-hover/project:opacity-100 group-hover/project:bg-white group-hover/project:text-black-950 group-focus-visible/project:translate-y-0 group-focus-visible/project:opacity-100">
                      <Play aria-hidden="true" className="ml-0.5 h-4 w-4 fill-current" />
                    </span>
                  </span>
                </span>
              </button>

              <InlineProjectTeaser project={project} className="border-border" />
            </article>
          ))}
        </div>
      </div>

      <ProjectViewer
        project={selectedProject}
        projects={projects}
        members={members}
        currentMemberId={memberId}
        onSelect={setSelectedProject}
        onClose={closeSelectedProject}
        returnLabel="Perfil"
      />
    </section>
  );
}
