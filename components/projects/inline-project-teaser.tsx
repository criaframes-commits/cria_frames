"use client";

import { useEffect, useId, useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio-projects";
import { cn } from "@/lib/utils";

type InlineProjectTeaserProps = {
  project: PortfolioProject;
  className?: string;
};

export function InlineProjectTeaser({
  project,
  className,
}: InlineProjectTeaserProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const teaser = project.teaser;
  const [available, setAvailable] = useState(!teaser?.availableFrom);

  useEffect(() => {
    if (!teaser?.availableFrom) return;

    const updateAvailability = () => {
      setAvailable(Date.now() >= new Date(teaser.availableFrom!).getTime());
    };
    const frame = window.requestAnimationFrame(updateAvailability);
    const timer = window.setInterval(updateAvailability, 1000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, [teaser?.availableFrom]);

  if (!teaser || !available) return null;

  const label = teaser.label.toLocaleLowerCase("pt-BR");

  return (
    <div
      className={cn(
        "relative -mt-px overflow-hidden rounded-b-md border border-white/10 bg-black-950 text-white transition-colors duration-500",
        open && "border-blue-500/45 bg-black",
        className
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="group/teaser flex min-h-14 w-full items-center justify-between gap-5 px-5 py-3 text-left transition-colors duration-300 hover:bg-white/[0.035] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-300 md:px-8"
      >
        <span className="inline-flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-blue-300/35 bg-blue-500/12 text-blue-300 transition-[background,color,transform] duration-300 group-hover/teaser:scale-105 group-hover/teaser:bg-blue-500 group-hover/teaser:text-white">
            <Play aria-hidden="true" className="ml-0.5 h-3.5 w-3.5 fill-current" />
          </span>
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
              {open ? `Fechar ${label}` : `Ver ${label}`}
            </span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.13em] text-white/38">
              Reprodução inline
            </span>
          </span>
        </span>

        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-blue-300 transition-transform duration-500 ease-premium",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-700 ease-premium",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          {open && (
            <div className="relative aspect-video w-full overflow-hidden border-t border-white/10 bg-black">
              {teaser.youtubeId ? (
                <iframe
                  key={teaser.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${teaser.youtubeId}?autoplay=1&controls=1&fs=0&rel=0&modestbranding=1&playsinline=1`}
                  title={`${teaser.label} do projeto ${project.title}`}
                  allow="autoplay; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : teaser.src ? (
                <video
                  key={teaser.src}
                  src={teaser.src}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={project.coverSrc}
                  aria-label={`${teaser.label} do projeto ${project.title}`}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
