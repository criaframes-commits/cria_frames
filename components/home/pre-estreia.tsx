"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BellRing, CalendarDays, Play } from "lucide-react";

/* ============================================================
   SEÇÃO TEMPORÁRIA — PRÉ-ESTREIA DO CURTA
   Remover este arquivo e o import em app/page.tsx assim que o
   curta estrear. Nenhum outro componente depende dele.
   ============================================================ */

// data/hora da estreia — ajustar aqui (formato ISO, fuso de Brasília)
export const PREMIERE_DATE = new Date("2026-08-16T20:00:00-03:00");

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft | null {
  const diff = PREMIERE_DATE.getTime() - Date.now();
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
    <div className="w-[72px] rounded-md border border-border bg-black-950 px-2 py-3 text-center md:w-20">
      <div className="font-display text-2xl font-black tabular-nums text-foreground md:text-3xl">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function PreEstreia() {
  // null no 1º render evita mismatch de hidratação (server ≠ client)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);
  const trailerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initialFrame = requestAnimationFrame(() => {
      setMounted(true);
      setTimeLeft(getTimeLeft());
    });
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => {
      cancelAnimationFrame(initialFrame);
      clearInterval(timer);
    };
  }, []);

  // já estreou → seção some sozinha
  if (mounted && !timeLeft) return null;

  const playTrailer = () => {
    trailerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    void trailerRef.current?.play();
  };

  return (
    <section
      id="pre-estreia"
      aria-labelledby="titulo-curta-caiado"
      className="relative isolate overflow-hidden border-y border-border bg-black-900 scroll-mt-24"
    >
      <div
        aria-hidden
        className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-700/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[clamp(5rem,17vw,15rem)] font-black uppercase leading-none tracking-[-0.06em] text-white/[0.025]"
      >
        Caiado
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent"
      />

      <div className="relative mx-auto max-w-container px-4 py-20 md:px-6 md:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex min-h-8 items-center gap-2 rounded-pill border border-blue-500/30 bg-blue-500/10 px-4 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Pré-estreia
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-accent-text" aria-hidden />
                16 ago 2026 · 20h
              </span>
            </div>

            <p className="mt-8 font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              Cria Frames apresenta
            </p>
            <h2
              id="titulo-curta-caiado"
              className="mt-3 font-display text-[clamp(3.4rem,7vw,6.75rem)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-foreground"
            >
              Ronaldo
              <span className="block text-accent-text">Caiado</span>
            </h2>

            <p className="mt-7 max-w-[30ch] font-display text-[clamp(1.35rem,2.2vw,2rem)] font-bold uppercase leading-tight text-foreground">
              Uma trajetória que parte de Goiás e mira o Brasil.
            </p>
            <p className="mt-4 max-w-[56ch] leading-relaxed text-muted-foreground">
              Um curta sobre a história do ex-governador de Goiás e candidato à
              Presidência da República, criado com inteligência artificial, do
              roteiro à finalização.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["História real", "Goiás", "Brasil", "Produção com IA"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-pill border border-border bg-black-950/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={playTrailer}
                className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-primary px-7 text-sm font-semibold text-primary-foreground transition-[transform,background] duration-200 ease-premium hover:-translate-y-0.5 hover:bg-blue-300 hover:text-black-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
              >
                <Play className="h-4 w-4 fill-current" aria-hidden />
                Assistir ao trailer
              </button>
              <Link
                href="mailto:oi@criaframes.com?subject=Lembrete%20da%20estreia%20do%20curta%20Ronaldo%20Caiado"
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-border px-7 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-blue-500/50 hover:bg-blue-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
              >
                <BellRing className="h-4 w-4" aria-hidden />
                Ativar lembrete
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Unit value={timeLeft?.days ?? null} label="Dias" />
              <Unit value={timeLeft?.hours ?? null} label="Horas" />
              <Unit value={timeLeft?.minutes ?? null} label="Min" />
              <Unit value={timeLeft?.seconds ?? null} label="Seg" />
            </div>
          </div>

          <div id="trailer-caiado" className="relative scroll-mt-28">
            <div className="absolute -inset-4 rounded-lg bg-blue-500/10 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-lg border border-blue-500/25 bg-black-950 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border bg-black-950/90 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-text">
                  Trailer oficial
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  Filme original
                </span>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-black sm:aspect-video">
                <div
                  aria-hidden
                  className="absolute -inset-8 scale-110 bg-[url('/curta-poster.jpg')] bg-cover bg-center opacity-45 blur-2xl"
                />
                <div aria-hidden className="absolute inset-0 bg-black/40" />
                <video
                  ref={trailerRef}
                  controls
                  playsInline
                  poster="/curta-poster.jpg"
                  preload="metadata"
                  className="relative z-10 h-full w-full object-contain"
                  aria-label="Trailer do curta sobre Ronaldo Caiado"
                >
                  <source src="/curta-trailer.mp4" type="video/mp4" />
                  Seu navegador não suporta a reprodução deste vídeo.
                </video>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border bg-black-950/90 px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                <span>Cria Frames AI Studio</span>
                <span className="text-accent-text">Em breve</span>
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-[52ch] text-center text-xs leading-relaxed text-muted-foreground">
              Uma narrativa visual criada com IA para revisitar uma trajetória
              política que atravessa décadas da história brasileira.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
