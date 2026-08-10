"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { CaiadoAuthorshipNotice } from "@/components/projects/caiado-authorship-notice";
import {
  CAIADO_FEATURE_END_DATE,
  CAIADO_PREMIERE_DATE,
} from "@/lib/caiado-project";

/* ============================================================
   DESTAQUE DE NOVIDADE — HOME
   O conteúdo muda de pré-estreia para CTA após o lançamento.
   Para uma nova campanha, atualize datas e conteúdo neste módulo.
   ============================================================ */

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft | null {
  const diff = CAIADO_PREMIERE_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="min-w-16 rounded-lg border border-blue-500/40 bg-blue-950/45 px-3 py-2.5 text-center shadow-[0_12px_32px_rgba(0,68,189,0.16)] backdrop-blur-md md:min-w-[4.75rem]">
      <div className="font-display text-2xl font-black tabular-nums text-white md:text-3xl">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </div>
      <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-100/60">
        {label}
      </div>
    </div>
  );
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothStep(value: number) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

export function PreEstreia() {
  // null no 1º render evita mismatch de hidratação (server ≠ client)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);
  const [featureExpired, setFeatureExpired] = useState(false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateReleaseState = () => {
      const now = Date.now();
      setTimeLeft(getTimeLeft());
      setFeatureExpired(now >= CAIADO_FEATURE_END_DATE.getTime());
    };
    const initialFrame = requestAnimationFrame(() => {
      setMounted(true);
      updateReleaseState();
    });
    const timer = setInterval(updateReleaseState, 1000);
    return () => {
      cancelAnimationFrame(initialFrame);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const elements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-curta-reveal]")
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let currentProgress = 0;
    let targetProgress = 0;

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(window.innerHeight * 1.02, 1);
      return reducedMotion.matches
        ? 1
        : clamp((window.innerHeight - rect.top) / travel);
    };

    const paint = (sectionProgress: number) => {
      const panelProgress = smoothStep(clamp(sectionProgress / 0.94));
      const panelRemaining = 1 - panelProgress;
      panel.style.transform = `translate3d(0, ${panelRemaining * 140}px, 0) scale(${0.988 + panelProgress * 0.012})`;

      elements.forEach((element) => {
        const start = Number(element.dataset.start ?? 0);
        const end = Number(element.dataset.end ?? 1);
        const localProgress = smoothStep(
          (sectionProgress - start) / Math.max(end - start, 0.01)
        );
        const remaining = 1 - localProgress;
        const x = Number(element.dataset.x ?? 0) * remaining;
        const y = Number(element.dataset.y ?? 90) * remaining;
        const rotate = Number(element.dataset.rotate ?? 0) * remaining;
        const scaleFrom = Number(element.dataset.scale ?? 0.96);
        const scale = scaleFrom + (1 - scaleFrom) * localProgress;

        element.style.opacity = String(localProgress);
        element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      });
    };

    const render = () => {
      const distance = targetProgress - currentProgress;
      currentProgress += distance * (reducedMotion.matches ? 1 : 0.13);
      paint(currentProgress);

      if (Math.abs(distance) > 0.0005) {
        animationFrame = requestAnimationFrame(render);
      } else {
        currentProgress = targetProgress;
        paint(currentProgress);
        animationFrame = 0;
      }
    };

    const requestUpdate = () => {
      targetProgress = readProgress();
      if (!animationFrame) animationFrame = requestAnimationFrame(render);
    };

    targetProgress = readProgress();
    currentProgress = targetProgress;
    paint(currentProgress);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  // O conteúdo atual sai após um mês; o módulo permanece para a próxima novidade.
  if (mounted && featureExpired) return null;

  const released = mounted && timeLeft === null;

  const playTrailer = () => {
    const trailer = trailerRef.current;
    if (!trailer) return;
    trailer.scrollIntoView({ behavior: "smooth", block: "center" });
    trailer.controls = true;
    void trailer.play();
  };

  return (
    <section
      ref={sectionRef}
      id="pre-estreia"
      aria-labelledby="titulo-curta-caiado"
      className="relative z-20 -mt-[clamp(3.5rem,8vw,6rem)] min-h-[calc(100svh-var(--site-header-height))] scroll-mt-[var(--site-header-height)]"
    >
      <div
        ref={panelRef}
        className="relative isolate flex min-h-[calc(100svh-var(--site-header-height))] origin-top items-center overflow-hidden rounded-t-[clamp(1.5rem,3vw,2.75rem)] border-t border-white/10 bg-black-900 shadow-[0_-28px_80px_rgba(0,0,0,0.48)] will-change-transform"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_14%_20%,rgba(61,110,255,0.2),transparent_34%),radial-gradient(circle_at_88%_75%,rgba(0,68,189,0.18),transparent_38%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black-950/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-container px-4 py-14 md:px-6 md:py-16 lg:py-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 xl:gap-16">
          <div className="relative z-10">
            <div
              data-curta-reveal
              data-start="0.02"
              data-end="0.56"
              data-x="-34"
              data-y="92"
              data-rotate="-4"
              className="flex items-center gap-3 will-change-transform"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(61,110,255,0.95)]" />
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-text md:text-xs">
                {released ? "Novidade · Já disponível" : "Novo curta · Pré-estreia"}
              </p>
            </div>

            <h2
              id="titulo-curta-caiado"
              data-curta-reveal
              data-start="0.1"
              data-end="0.68"
              data-x="26"
              data-y="118"
              data-rotate="3.5"
              data-scale="0.92"
              className="mt-4 max-w-[9ch] font-display text-[clamp(2.75rem,5.2vw,4.5rem)] font-black uppercase leading-[0.86] tracking-[-0.05em] text-foreground will-change-transform"
            >
              Ronaldo
              <span className="block text-blue-300">Caiado</span>
            </h2>

            <p
              data-curta-reveal
              data-start="0.16"
              data-end="0.76"
              data-x="-22"
              data-y="105"
              data-rotate="-2.4"
              className="mt-5 max-w-[31ch] border-l-2 border-blue-500 pl-4 font-display text-base font-bold uppercase leading-tight tracking-[-0.01em] text-foreground will-change-transform md:text-lg"
            >
              Um filme <span className="text-blue-300">inteiramente feito com IA.</span>
            </p>

            <div
              data-curta-reveal
              data-start="0.22"
              data-end="0.84"
              data-x="34"
              data-y="96"
              data-rotate="2.8"
              className="mt-6 flex max-w-md items-center justify-between gap-5 rounded-md border border-blue-500/30 bg-blue-500/10 px-4 py-3 will-change-transform"
            >
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-accent-text">
                  {released ? "Projeto especial" : "Estreia · Amanhã"}
                </p>
                <p className="mt-0.5 font-display text-lg font-black uppercase tracking-[-0.02em] text-foreground">
                  {released ? "Assista agora" : "10 ago 2026"}
                </p>
              </div>
              <span className="h-8 w-px bg-blue-500/30" aria-hidden />
              <p className="font-display text-2xl font-black tabular-nums text-blue-300">
                {released ? "NOVO" : "12H"}
              </p>
            </div>

            <div
              data-curta-reveal
              data-start="0.28"
              data-end="0.9"
              data-x="-26"
              data-y="78"
              data-rotate="-2"
              className="mt-5 flex flex-wrap items-center gap-3 will-change-transform"
            >
              {released ? (
                <Link
                  href="/projetos/ronaldo-caiado#assistir"
                  className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_rgba(61,110,255,0.28)] transition-[transform,background,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:bg-blue-300 hover:text-black-950 hover:shadow-[0_18px_48px_rgba(61,110,255,0.42)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                  Assistir ao curta
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={playTrailer}
                  className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_rgba(61,110,255,0.28)] transition-[transform,background,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:bg-blue-300 hover:text-black-950 hover:shadow-[0_18px_48px_rgba(61,110,255,0.42)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                  Assistir ao trailer
                </button>
              )}
            </div>

            {!released && (
              <div
                data-curta-reveal
                data-start="0.34"
                data-end="0.96"
                data-x="18"
                data-y="62"
                data-rotate="1.5"
                className="mt-5 will-change-transform"
                aria-label="Contagem regressiva para a estreia"
              >
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-blue-300">
                  Falta pouco · Hoje às 12h
                </p>
                <div className="flex flex-wrap gap-2">
                  <Unit value={timeLeft?.days ?? null} label="Dias" />
                  <Unit value={timeLeft?.hours ?? null} label="Horas" />
                  <Unit value={timeLeft?.minutes ?? null} label="Min" />
                  <Unit value={timeLeft?.seconds ?? null} label="Seg" />
                </div>
              </div>
            )}

            <div
              data-curta-reveal
              data-start="0.38"
              data-end="0.98"
              data-x="14"
              data-y="48"
              data-rotate="0.8"
              className="mt-3 will-change-transform"
            >
              <CaiadoAuthorshipNotice compact />
            </div>
          </div>

          <div
            id="trailer-caiado"
            data-curta-reveal
            data-start="0.08"
            data-end="0.9"
            data-x="46"
            data-y="170"
            data-rotate="4.5"
            data-scale="0.88"
            className="relative scroll-mt-28 will-change-transform"
          >
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-lg bg-blue-500/15 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-lg border border-blue-500/30 bg-blue-900/50"
            />
            <div className="relative aspect-video overflow-hidden rounded-lg border border-white/15 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              {!isTrailerPlaying &&
                (released ? (
                  <Link
                    href="/projetos/ronaldo-caiado#assistir"
                    aria-label="Assistir ao curta Ronaldo Caiado"
                    className="absolute right-3 top-3 z-20 grid size-10 place-items-center rounded-full border border-white/30 bg-white/90 text-black-950 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[transform,background] duration-300 ease-premium hover:scale-105 hover:bg-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Play className="h-4 w-4 fill-current" aria-hidden />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={playTrailer}
                    aria-label="Reproduzir trailer"
                    className="absolute right-3 top-3 z-20 grid size-10 place-items-center rounded-full border border-white/30 bg-white/90 text-black-950 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[transform,background] duration-300 ease-premium hover:scale-105 hover:bg-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Play className="h-3.5 w-3.5 translate-x-px fill-current" aria-hidden />
                  </button>
                ))}
              <video
                ref={trailerRef}
                playsInline
                poster="/curta-poster.jpg"
                preload="metadata"
                className="h-full w-full object-cover"
                aria-label="Trailer do curta sobre Ronaldo Caiado"
                onPlay={() => setIsTrailerPlaying(true)}
                onPause={() => setIsTrailerPlaying(false)}
                onEnded={() => setIsTrailerPlaying(false)}
              >
                <source src="/curta-trailer.mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução deste vídeo.
              </video>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
