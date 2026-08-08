"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Play,
  Search,
} from "lucide-react";
import { ProjectViewer } from "@/components/projects/project-viewer";
import { InlineProjectTeaser } from "@/components/projects/inline-project-teaser";
import { cn } from "@/lib/utils";
import {
  PROJECT_CATEGORIES,
  type PortfolioProject,
} from "@/lib/portfolio-projects";
import type { TeamMember } from "@/lib/team-members";

type ProjectsCatalogProps = {
  projects: PortfolioProject[];
  members: TeamMember[];
};

type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export function ProjectsCatalog({ projects, members }: ProjectsCatalogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Todos");
  const [memberId, setMemberId] = useState("todos");
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [activeProjectId, setActiveProjectId] = useState(
    projects[0]?.slug ?? ""
  );
  const [visibleProjectIds, setVisibleProjectIds] = useState<Set<string>>(
    () => new Set()
  );
  const projectRefs = useRef(new Map<string, HTMLElement>());

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      const project = projects.find((item) => item.slug === slug);
      setSelectedProject(project && !project.specialHref ? project : null);
    };

    syncProjectFromUrl();
    window.addEventListener("hashchange", syncProjectFromUrl);
    window.addEventListener("popstate", syncProjectFromUrl);

    return () => {
      window.removeEventListener("hashchange", syncProjectFromUrl);
      window.removeEventListener("popstate", syncProjectFromUrl);
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return projects.filter((item) => {
      const matchesCategory =
        category === "Todos" || item.category === category;
      const matchesMember =
        memberId === "todos" || item.memberIds.includes(memberId);
      const participantNames = members
        .filter((member) => item.memberIds.includes(member.id))
        .map((member) => member.name);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          item.title,
          item.client ?? "",
          item.category,
          item.summary,
          ...participantNames,
        ].some((value) =>
          value.toLocaleLowerCase("pt-BR").includes(normalizedQuery)
        );

      return matchesCategory && matchesMember && matchesQuery;
    });
  }, [projects, members, category, memberId, query]);

  const resolvedActiveProjectId = filteredProjects.some(
    (project) => project.slug === activeProjectId
  )
    ? activeProjectId
    : filteredProjects[0]?.slug ?? "";

  useEffect(() => {
    if (filteredProjects.length === 0) return;

    const focusObserver = new IntersectionObserver(
      (entries) => {
        const closest = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const slug = closest?.target.getAttribute("data-project-slug");
        if (slug) setActiveProjectId(slug);
      },
      {
        rootMargin: "-18% 0px -30% 0px",
        threshold: [0.05, 0.25, 0.5],
      }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        const enteredSlugs = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.getAttribute("data-project-slug"))
          .filter((slug): slug is string => slug !== null);

        if (enteredSlugs.length === 0) return;
        setVisibleProjectIds((current) => {
          const next = new Set(current);
          let changed = false;
          enteredSlugs.forEach((slug) => {
            if (!next.has(slug)) {
              next.add(slug);
              changed = true;
            }
          });
          return changed ? next : current;
        });
      },
      { rootMargin: "0px", threshold: 0.04 }
    );

    const elements = filteredProjects
      .map((project) => projectRefs.current.get(project.slug))
      .filter((element): element is HTMLElement => element !== undefined);
    elements.forEach((element) => {
      focusObserver.observe(element);
      revealObserver.observe(element);
    });

    return () => {
      focusObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [filteredProjects]);

  const openProject = (item: PortfolioProject) => {
    if (item.specialHref) {
      router.push(item.specialHref);
      return;
    }
    setSelectedProject(item);
    window.history.pushState(null, "", `#${item.slug}`);
  };

  const navigateProject = (item: PortfolioProject) => {
    setSelectedProject(item);
    window.history.replaceState(null, "", `#${item.slug}`);
  };

  const closeProject = () => {
    setSelectedProject(null);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`
    );
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("Todos");
    setMemberId("todos");
  };

  const scrollToCatalog = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    document.getElementById("catalogo")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const heroProject = projects[0];

  return (
    <>
      <main>
        <section
          aria-labelledby="projects-page-heading"
          className="relative isolate overflow-hidden border-b border-border bg-black-900"
        >
          {heroProject && (
            <Image
              src={heroProject.coverSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-30 object-cover opacity-30 brightness-[0.42] saturate-75"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,3,3,0.98)_0%,rgba(3,3,3,0.82)_48%,rgba(3,3,3,0.66)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black-950 via-black-950/45 to-transparent"
          />

          <div className="mx-auto flex min-h-[calc(66svh-var(--site-header-height))] max-w-container flex-col justify-between px-4 py-14 md:px-6 md:py-20">
            <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              Portfólio
            </p>

            <div className="my-14 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(19rem,0.56fr)] md:items-end">
              <h1
                id="projects-page-heading"
                className="max-w-[10ch] font-display text-display font-black uppercase leading-[0.9] tracking-[-0.05em] text-foreground"
              >
                Nosso trabalho.
              </h1>
              <p className="max-w-[41ch] border-l border-white/14 pl-5 text-sm leading-relaxed text-white/68 md:justify-self-end md:pl-6 md:text-base">
                Filmes, campanhas e experimentos feitos pela Cria Frames. Um
                arquivo para explorar com calma e assistir em tela cheia.
              </p>
            </div>

            <div className="flex items-end justify-between gap-8">
              <p className="inline-flex border-y border-white/12 py-3 pr-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                {String(projects.length).padStart(2, "0")} projetos no arquivo
              </p>
              <a
                href="#catalogo"
                onClick={scrollToCatalog}
                className="group inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                Explorar catálogo
                <ArrowDown
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>
        </section>

        <section
          id="catalogo"
          aria-labelledby="catalog-heading"
          className="theme-light scroll-mt-[var(--site-header-height)] bg-background pb-28"
        >
          <h2 id="catalog-heading" className="sr-only">
            Catálogo de projetos
          </h2>

          <div className="relative z-30 border-b border-border bg-background/92 backdrop-blur-xl lg:sticky lg:top-[var(--site-header-height)]">
            <div className="mx-auto flex max-w-container flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div
                className="flex gap-6 overflow-x-auto pb-1 lg:pb-0"
                aria-label="Filtrar por categoria"
              >
                {PROJECT_CATEGORIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                    className="min-h-11 shrink-0 border-b border-transparent px-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-[color,border-color] duration-300 hover:text-foreground aria-pressed:border-primary aria-pressed:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <label className="relative block w-full sm:w-56">
                  <span className="sr-only">
                    Filtrar por integrante da equipe
                  </span>
                  <select
                    value={memberId}
                    onChange={(event) => setMemberId(event.target.value)}
                    className="h-11 w-full appearance-none rounded-md border border-border bg-secondary pl-4 pr-10 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="todos">Toda a equipe</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  />
                </label>

                <label className="relative block w-full sm:w-72">
                  <span className="sr-only">Buscar projetos</span>
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar projeto"
                    className="h-11 w-full rounded-md border border-border bg-secondary pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-container px-4 pt-8 md:px-6 md:pt-10">
            <div className="mb-7">
              <p
                className="inline-flex border-b border-border pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                aria-live="polite"
              >
                Arquivo / {String(filteredProjects.length).padStart(2, "0")} {" "}
                {filteredProjects.length === 1 ? "projeto" : "projetos"}
              </p>
            </div>

            {filteredProjects.length > 0 ? (
              <ol className="space-y-14 sm:space-y-16 md:space-y-20">
                {filteredProjects.map((item, index) => {
                  const active = resolvedActiveProjectId === item.slug;
                  const visible = visibleProjectIds.has(item.slug);
                  const reversed = index % 2 === 1;
                  const projectMembers = members.filter((member) =>
                    item.memberIds.includes(member.id)
                  );
                  const isSpecial = Boolean(item.specialHref);

                  return (
                    <li key={item.slug}>
                      <article
                        ref={(element) => {
                          if (element) projectRefs.current.set(item.slug, element);
                          else projectRefs.current.delete(item.slug);
                        }}
                        data-project-slug={item.slug}
                        className={cn(
                          "transition-[opacity,transform,filter] duration-[1100ms] ease-premium",
                          visible
                            ? "translate-y-0 opacity-100 blur-0"
                            : "translate-y-14 opacity-0 blur-[5px]"
                        )}
                        style={{
                          transitionDelay: `${Math.min(index, 2) * 90}ms`,
                        }}
                      >
                        <h3 className="sr-only">{item.title}</h3>
                        <button
                          type="button"
                          aria-haspopup={isSpecial ? undefined : "dialog"}
                          aria-label={
                            isSpecial
                              ? `Conhecer o projeto especial ${item.title}`
                              : `Assistir ao projeto ${item.title}`
                          }
                          onClick={() => openProject(item)}
                          className={cn(
                            "group/project grid w-full overflow-hidden rounded-t-md border bg-black-900 text-left transition-[border-color,box-shadow,transform] duration-1000 ease-premium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-[34rem]",
                            isSpecial &&
                              "rounded-md border-blue-500/48 md:min-h-[44rem]",
                            reversed
                              ? "md:grid-cols-[minmax(18rem,0.62fr)_minmax(0,1.38fr)]"
                              : "md:grid-cols-[minmax(0,1.38fr)_minmax(18rem,0.62fr)]",
                            active
                              ? "border-blue-500/48 shadow-[0_30px_90px_rgba(6,6,6,0.24)]"
                              : "border-black-800 shadow-[0_20px_65px_rgba(6,6,6,0.15)]",
                            "hover:border-blue-500/65 hover:shadow-[0_36px_110px_rgba(6,6,6,0.32)]"
                          )}
                        >
                          <span
                            className={cn(
                              "relative block min-h-[22rem] overflow-hidden bg-black-950 md:min-h-full",
                              isSpecial && "min-h-[28rem]",
                              reversed && "md:order-2"
                            )}
                          >
                            <Image
                              src={item.coverSrc}
                              alt=""
                              fill
                              loading={index < 2 ? "eager" : "lazy"}
                              sizes="(min-width: 768px) 68vw, 100vw"
                              className={cn(
                                "object-cover blur-2xl transition-[transform,filter,opacity] duration-[1400ms] ease-premium group-hover/project:scale-[1.17] group-hover/project:opacity-55",
                                active
                                  ? "scale-[1.12] brightness-100 opacity-36"
                                  : "scale-[1.08] brightness-65 opacity-18"
                              )}
                            />
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-black/26"
                            />
                            <Image
                              src={item.coverSrc}
                              alt=""
                              fill
                              loading={index < 2 ? "eager" : "lazy"}
                              sizes="(min-width: 768px) 68vw, 100vw"
                              className={cn(
                                "object-contain transition-[transform,filter,opacity] duration-[1300ms] ease-premium group-hover/project:scale-[1.018] group-hover/project:brightness-110 group-hover/project:opacity-100 motion-reduce:transform-none",
                                active
                                  ? "brightness-100 opacity-100"
                                  : "brightness-[0.58] opacity-68"
                              )}
                            />
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 ring-1 ring-inset ring-white/8"
                            />
                            <span className="absolute bottom-5 right-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/22 bg-black/52 text-white opacity-72 shadow-xl backdrop-blur-sm transition-[background,color,opacity,transform] duration-700 group-hover/project:scale-110 group-hover/project:bg-white group-hover/project:text-black-950 group-hover/project:opacity-100 md:bottom-6 md:right-6">
                              <Play
                                aria-hidden="true"
                                className="ml-0.5 h-4 w-4 fill-current"
                              />
                            </span>
                          </span>

                          <span
                            className={cn(
                              "flex min-h-[21rem] flex-col justify-between bg-black-900 p-6 transition-colors duration-1000 group-hover/project:bg-black-800 md:min-h-full md:p-8 lg:p-10",
                              reversed && "md:order-1"
                            )}
                          >
                            <span className="flex items-start justify-between gap-4">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                                {item.category}
                              </span>
                              <span className="text-[10px] tabular-nums uppercase tracking-[0.14em] text-white/40">
                                {isSpecial ? "Projeto especial" : item.duration}
                              </span>
                            </span>

                            <span>
                              <span className="block font-display text-[clamp(2rem,1.45rem+1.45vw,3.45rem)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-white transition-[text-shadow] duration-1000 group-hover/project:[text-shadow:0_0_38px_rgba(255,255,255,0.2)]">
                                {item.title}
                              </span>
                              <span className="mt-5 block text-xs uppercase tracking-[0.14em] text-white/48">
                                {item.client ? `${item.client} · ` : ""}
                                {item.year}
                              </span>
                            </span>

                            <span className="flex items-center justify-between gap-5 border-t border-white/10 pt-5">
                              <span className="text-[10px] uppercase tracking-[0.14em] text-white/38">
                                Projeto {String(index + 1).padStart(2, "0")} / {" "}
                                {String(filteredProjects.length).padStart(2, "0")}
                              </span>
                              <span className="text-xs font-semibold uppercase tracking-[0.13em] text-white transition-colors group-hover/project:text-blue-300">
                                {isSpecial ? "Explorar projeto" : "Assistir"}
                              </span>
                            </span>
                          </span>
                        </button>

                        {projectMembers.length > 0 && <div
                          className={cn(
                            "relative -mt-px flex flex-col gap-4 border bg-black-950 px-5 py-4 transition-[border-color,background-color] duration-700 sm:flex-row sm:items-center sm:justify-between md:px-8",
                            item.teaser ? "rounded-none" : "rounded-b-md",
                            active
                              ? "border-blue-500/48 bg-black-900"
                              : "border-black-800"
                          )}
                        >
                          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">
                            Equipe do projeto
                          </p>
                          <ul className="flex flex-wrap gap-2 sm:justify-end">
                            {projectMembers.map((member) => (
                              <li key={member.id}>
                                <Link
                                  href={`/sobre/equipe/${member.id}`}
                                  aria-label={`Ver perfil de ${member.name}`}
                                  className="group/member-link inline-flex min-h-9 items-center gap-2 rounded-pill border border-white/12 bg-white/[0.035] px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/72 transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-blue-300/55 hover:bg-blue-500/14 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                >
                                  {member.name}
                                  <ArrowUpRight
                                    aria-hidden="true"
                                    className="h-3.5 w-3.5 text-blue-300 transition-transform duration-300 group-hover/member-link:-translate-y-0.5 group-hover/member-link:translate-x-0.5"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>}

                        <InlineProjectTeaser
                          project={item}
                          className={cn(
                            active ? "border-blue-500/48" : "border-black-800"
                          )}
                        />
                      </article>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div className="border-y border-border py-20 text-center">
                <p className="font-display text-2xl font-black uppercase text-foreground">
                  Nenhum projeto encontrado.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 text-sm font-semibold text-primary underline underline-offset-4"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <ProjectViewer
        project={selectedProject}
        projects={filteredProjects.filter((project) => !project.specialHref)}
        members={members}
        onSelect={navigateProject}
        onClose={closeProject}
      />
    </>
  );
}
