"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { ProjectViewer } from "@/components/projects/project-viewer";
import type { PortfolioProject } from "@/lib/portfolio-projects";
import type { TeamMember } from "@/lib/team-members";

type ScrollHolofoteProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  projects: PortfolioProject[];
  members?: TeamMember[];
};

export function ScrollHolofote({
  id = "projetos",
  eyebrow,
  heading,
  intro,
  projects,
  members = [],
}: ScrollHolofoteProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const activeIndexRef = useRef(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const openedFromRef = useRef<HTMLButtonElement | null>(null);

  const updateSpotlight = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty(
      "--holofote-pointer-x",
      `${event.clientX}px`
    );
    event.currentTarget.style.setProperty(
      "--holofote-pointer-y",
      `${event.clientY}px`
    );
  };

  const closeSelectedProject = () => {
    setSelectedProject(null);
    window.requestAnimationFrame(() => {
      openedFromRef.current?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    let animationFrame = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const desktopLayout = window.matchMedia("(min-width: 768px)");
    let currentFocusY = 0;
    let targetFocusY = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const smoothstep = (start: number, end: number, value: number) => {
      const progress = clamp((value - start) / (end - start));
      return progress * progress * (3 - 2 * progress);
    };

    const getViewportMetrics = () => {
      const headerHeight =
        document.querySelector<HTMLElement>("body > header")?.offsetHeight ?? 0;
      const availableHeight = window.innerHeight - headerHeight;
      const viewportCenter = headerHeight + availableHeight / 2;
      return { availableHeight, viewportCenter };
    };

    const paintProjectProgress = (focusY: number) => {
      const { availableHeight, viewportCenter } = getViewportMetrics();
      const activationRadius = Math.max(availableHeight * 0.82, 380);
      const viewportFocusY = window.scrollY + viewportCenter;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const bounds = card.getBoundingClientRect();
        const cardCenter = bounds.top + window.scrollY + bounds.height / 2;
        const distance = Math.abs(cardCenter - focusY);
        const proximity = clamp(1 - distance / activationRadius);
        const imageProgress = !desktopLayout.matches
          ? 1
          : reducedMotion
          ? distance < bounds.height / 2
            ? 1
            : 0
          : smoothstep(0.18, 0.9, proximity);
        const textProgress = reducedMotion
          ? distance < bounds.height / 2
            ? 1
            : 0
          : smoothstep(0.68, 0.94, proximity);

        const media = mediaRefs.current[index];
        if (media) {
          const opacity = 0.16 + imageProgress * 0.84;
          const brightness = 0.3 + imageProgress * 0.7;
          const saturation = 0.42 + imageProgress * 0.58;
          const scale = 0.988 + imageProgress * 0.012;

          media.style.opacity = opacity.toFixed(3);
          media.style.filter = `brightness(${brightness.toFixed(3)}) saturate(${saturation.toFixed(3)})`;
          media.style.transform = `scale(${scale.toFixed(4)})`;
        }

        [titleRefs.current[index], copyRefs.current[index]].forEach(
          (textElement) => {
            if (!textElement) return;
            textElement.style.opacity = textProgress.toFixed(3);
            textElement.style.filter = `brightness(${(
              0.7 +
              textProgress * 0.3
            ).toFixed(3)})`;
            const alignmentOffset = Math.min(
              120,
              Math.max(-120, cardCenter - viewportFocusY)
            );
            textElement.style.transform = `translate3d(0, ${alignmentOffset.toFixed(2)}px, 0)`;
          }
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndexRef.current) {
        activeIndexRef.current = closestIndex;
        setActiveIndex(closestIndex);
      }
    };

    const animateProgress = () => {
      const distance = targetFocusY - currentFocusY;
      currentFocusY += distance * (reducedMotion ? 1 : 0.04);
      paintProjectProgress(currentFocusY);

      if (Math.abs(distance) > 0.25) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      } else {
        currentFocusY = targetFocusY;
        paintProjectProgress(currentFocusY);
        animationFrame = 0;
      }
    };

    const scheduleUpdate = () => {
      const { viewportCenter } = getViewportMetrics();
      targetFocusY = window.scrollY + viewportCenter;
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      }
    };

    const { viewportCenter } = getViewportMetrics();
    currentFocusY = window.scrollY + viewportCenter;
    targetFocusY = currentFocusY;
    paintProjectProgress(currentFocusY);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [projects.length]);

  return (
    <section
      id={id}
      aria-label={heading}
      onPointerMove={updateSpotlight}
      className="group/holofote relative scroll-mt-[var(--site-header-height)] bg-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-10 size-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-700 ease-premium will-change-[left,top,opacity] group-hover/holofote:opacity-100"
        style={{
          left: "var(--holofote-pointer-x, 50vw)",
          top: "var(--holofote-pointer-y, 50vh)",
          background:
            "radial-gradient(circle, rgba(61, 110, 255, 0.12) 0%, rgba(61, 110, 255, 0.055) 34%, transparent 68%)",
        }}
      />
      <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-0">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(360px,500px)_minmax(0,1fr)] md:gap-x-10 lg:gap-x-14">
          <div className="mb-10 md:mb-0 md:self-stretch">
            <div className="md:sticky md:top-[calc(50svh-3rem)]">
              {eyebrow && (
                <p className="mb-4 font-body text-caption font-semibold uppercase tracking-[0.14em] text-accent-text">
                  {eyebrow}
                </p>
              )}

              <div className="hidden min-h-48 items-center md:flex">
                <div className="relative h-48 w-full">
                  {projects.map((item, index) => (
                    <h2
                      key={item.slug}
                      ref={(element) => {
                        titleRefs.current[index] = element;
                      }}
                      data-active={index === activeIndex ? "true" : "false"}
                      aria-hidden={index !== activeIndex}
                      className="pointer-events-none absolute inset-0 flex items-center font-display text-[clamp(2.75rem,3.4vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-foreground opacity-0 will-change-[opacity,filter,transform]"
                    >
                      {item.title}
                    </h2>
                  ))}
                </div>
              </div>

              <h2 className="font-display text-h2 font-black uppercase leading-none tracking-[-0.04em] text-foreground md:hidden">
                {heading}
              </h2>
              {intro && (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {intro}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:py-[clamp(3.5rem,11svh,6rem)]">
            {projects.map((item, index) => (
              <article
                key={item.slug}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="group"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    openedFromRef.current = event.currentTarget;
                    setSelectedProject(item);
                  }}
                  aria-label={`Assistir ao projeto ${item.title}`}
                  className="block w-full rounded-[3px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                >
                  <div
                    ref={(element) => {
                      mediaRefs.current[index] = element;
                    }}
                    className="relative aspect-video overflow-hidden rounded-[3px] border border-border bg-black-900 opacity-[0.16] transition-shadow duration-700 ease-premium will-change-[opacity,filter,transform] group-hover:shadow-[0_0_72px_rgba(61,110,255,0.26)] motion-reduce:opacity-100 motion-reduce:brightness-100 motion-reduce:saturate-100 motion-reduce:transform-none"
                  >
                    <Image
                      src={item.coverSrc}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 500px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(130,166,255,0.16),transparent_38%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 font-display text-sm font-extrabold uppercase tracking-[-0.02em] text-white">
                      {item.title}
                    </span>
                  </div>
                </button>

                <div className="pt-4 md:hidden">
                  <p className="font-body text-caption font-semibold uppercase tracking-[0.14em] text-accent-text">
                    {item.client ?? item.category}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden md:block md:self-stretch">
            <div className="sticky top-[calc(50svh-3rem)]">
              <div className="relative h-48">
                {projects.map((item, index) => (
                  <div
                    key={item.slug}
                    ref={(element) => {
                      copyRefs.current[index] = element;
                    }}
                    data-active={index === activeIndex ? "true" : "false"}
                    aria-hidden={index !== activeIndex}
                    className="pointer-events-none absolute inset-0 flex flex-col justify-center opacity-0 will-change-[opacity,filter,transform]"
                  >
                    <p className="font-body text-caption font-semibold uppercase tracking-[0.16em] text-accent-text">
                      {item.client ?? item.category}
                    </p>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectViewer
        project={selectedProject}
        projects={projects}
        members={members}
        onSelect={setSelectedProject}
        onClose={closeSelectedProject}
        returnLabel="Home"
      />
    </section>
  );
}
