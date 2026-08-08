"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MoveHorizontal,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/team-members";

type TeamSectionProps = {
  members: TeamMember[];
};

type DragState = {
  active: boolean;
  moved: boolean;
  pointerId: number;
  startScrollLeft: number;
  startX: number;
};

export function TeamSection({ members }: TeamSectionProps) {
  const [activeMember, setActiveMember] = useState<string | null>(
    members[0]?.id ?? null
  );
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const suppressClickRef = useRef(false);
  const dragRef = useRef<DragState>({
    active: false,
    moved: false,
    pointerId: -1,
    startScrollLeft: 0,
    startX: 0,
  });

  const centerCard = useCallback((memberId: string) => {
    const rail = railRef.current;
    const card = cardRefs.current.get(memberId);
    if (!rail || !card) return;

    const desiredLeft =
      card.offsetLeft + card.offsetWidth / 2 - rail.clientWidth / 2;
    const maxLeft = rail.scrollWidth - rail.clientWidth;

    rail.scrollTo({
      left: Math.min(Math.max(desiredLeft, 0), Math.max(maxLeft, 0)),
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!activeMember) return;

    // No desktop, aguarda a largura terminar de animar antes de centralizar.
    // O cancelamento no cleanup impede reposicionamentos antigos em cliques rápidos.
    const delay = window.matchMedia("(min-width: 768px)").matches ? 540 : 0;
    const timer = window.setTimeout(() => centerCard(activeMember), delay);
    return () => window.clearTimeout(timer);
  }, [activeMember, centerCard]);

  const selectMember = (memberId: string) => {
    if (suppressClickRef.current) return;
    setActiveMember((current) => (current === memberId ? null : memberId));
  };

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.72,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const rail = event.currentTarget;
    suppressClickRef.current = false;
    dragRef.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startScrollLeft: rail.scrollLeft,
      startX: event.clientX,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const rail = event.currentTarget;
    const distance = event.clientX - drag.startX;

    // Um clique simples deve continuar pertencendo ao botão do card. O trilho
    // só captura o ponteiro depois que o gesto realmente vira um arrasto.
    if (!drag.moved && Math.abs(distance) > 6) {
      drag.moved = true;
      rail.setPointerCapture(event.pointerId);
    }
    if (!drag.moved) return;

    event.preventDefault();
    rail.scrollLeft = drag.startScrollLeft - distance;
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.active = false;

    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 80);
    }
  };

  return (
    <section
      id="equipe"
      aria-labelledby="equipe-heading"
      className="scroll-mt-[var(--site-header-height)] overflow-hidden border-y border-border bg-black-900 py-16 md:py-6"
    >
      <div className="mx-auto flex max-w-container flex-col gap-7 px-4 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
            Equipe
          </p>
          <h2
            id="equipe-heading"
            className="mt-4 max-w-[14ch] font-display text-[clamp(1.75rem,1.3rem+1.35vw,2.75rem)] font-black uppercase leading-[0.96] tracking-[-0.035em] text-foreground"
          >
            A equipe.
          </h2>
        </div>

        <div className="flex items-center justify-between gap-5 md:justify-end">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <MoveHorizontal aria-hidden="true" className="h-4 w-4" />
            Arraste para explorar
          </p>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Ver membros anteriores"
              onClick={() => moveRail(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-blue-500/50 hover:bg-blue-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Ver próximos membros"
              onClick={() => moveRail(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-blue-500/50 hover:bg-blue-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-10 md:mt-6">
        <div
          ref={railRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onDragStart={(event) => event.preventDefault()}
          className="team-rail flex select-none gap-4 overflow-x-auto overscroll-x-contain px-4 pb-6 max-md:snap-x max-md:snap-mandatory md:cursor-grab md:px-6 md:pb-4 md:active:cursor-grabbing xl:px-[calc((100vw-1320px)/2+24px)]"
        >
          {members.map((member, index) => {
            const expanded = activeMember === member.id;
            const detailsId = `${member.id}-details`;

            return (
              <article
                key={member.id}
                ref={(element) => {
                  if (element) cardRefs.current.set(member.id, element);
                  else cardRefs.current.delete(member.id);
                }}
                data-expanded={expanded ? "true" : "false"}
                className={cn(
                  "team-member-card group/member relative h-[72vw] max-h-[18rem] w-[72vw] max-w-[18rem] shrink-0 overflow-hidden rounded-lg border border-border bg-black-950 transition-[width,border-color,box-shadow] duration-500 ease-premium will-change-[width] max-md:snap-center md:h-[23rem] md:max-h-none md:w-[23rem] md:max-w-none",
                  expanded &&
                    "w-[96vw] max-w-[24rem] border-blue-500/45 shadow-[0_0_70px_rgba(61,110,255,0.18)] md:w-[30.6667rem] md:max-w-none"
                )}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={detailsId}
                  onClick={() => selectMember(member.id)}
                  className="relative block h-full w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-blue-300"
                >
                  <div
                    aria-hidden="true"
                    className="team-member-art absolute inset-0 overflow-hidden"
                  >
                    <Image
                      src={member.imageSrc}
                      alt=""
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 31rem, 96vw"
                      style={{ objectPosition: member.imagePosition }}
                      className="object-cover transition-transform duration-700 ease-premium group-hover/member:scale-[1.035] group-focus-within/member:scale-[1.035] motion-reduce:transform-none"
                    />
                    <span className="absolute right-5 top-4 font-display text-[5rem] font-black leading-none text-white/[0.055]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                          {String(index + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}
                        </p>
                        <h3
                          className={cn(
                            "mt-2 font-display text-base font-bold uppercase leading-none tracking-[-0.005em] text-white transition-[font-size] duration-500",
                            expanded && "md:text-xl"
                          )}
                        >
                          {member.name}
                        </h3>
                        <p className="mt-2 text-sm text-white/65">
                          {member.role}
                        </p>
                      </div>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white">
                        <Plus
                          aria-hidden="true"
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            expanded && "rotate-45"
                          )}
                        />
                      </span>
                    </div>

                    <div
                      id={detailsId}
                      className={cn(
                        "grid max-h-0 grid-cols-1 gap-5 overflow-hidden opacity-0 transition-[max-height,opacity,margin] duration-500 ease-premium md:grid-cols-[minmax(0,1fr)_auto]",
                        expanded && "mt-6 max-h-56 opacity-100"
                      )}
                    >
                      <p className="max-w-[42ch] text-sm leading-relaxed text-white/72">
                        {member.bio}
                      </p>
                      <ul className="flex flex-wrap content-start gap-2 md:max-w-44 md:justify-end">
                        {member.specialties.map((specialty) => (
                          <li
                            key={specialty}
                            className="rounded-pill border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70"
                          >
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>

                <Link
                  href={`/sobre/equipe/${member.id}`}
                  tabIndex={expanded ? 0 : -1}
                  aria-hidden={!expanded}
                  aria-label={`Ver projetos de ${member.name}`}
                  className={cn(
                    "group/projects absolute right-5 top-5 z-20 inline-flex min-h-10 origin-top-right items-center gap-2 rounded-md bg-blue-500 px-4 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-white opacity-0 shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-[opacity,transform,background,color] duration-300 hover:bg-white hover:text-black-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-6 md:top-6",
                    expanded
                      ? "pointer-events-auto translate-y-0 scale-100 opacity-100 delay-300"
                      : "pointer-events-none -translate-y-2 scale-95"
                  )}
                >
                  Projetos
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover/projects:-translate-y-0.5 group-hover/projects:translate-x-0.5"
                  />
                </Link>
              </article>
            );
          })}
          <div aria-hidden="true" className="w-px shrink-0" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black-900 to-transparent md:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black-900 to-transparent md:w-16"
        />
      </div>
    </section>
  );
}
