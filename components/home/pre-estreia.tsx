"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="w-[72px] rounded-md border border-border bg-black-950 px-2 py-3 text-center md:w-20">
      <div className="font-display text-2xl font-black tabular-nums text-foreground md:text-3xl">
        {String(value).padStart(2, "0")}
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

  return (
    <section
      id="pre-estreia"
      aria-label="Pré-estreia do curta"
      className="relative overflow-hidden border-y border-border bg-black-900 scroll-mt-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(61,110,255,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-container px-4 py-20 text-center md:px-6 md:py-28">
        <span className="inline-flex items-center gap-2 rounded-pill border border-border px-4 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-accent-text">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Estreia em breve
        </span>

        <h2 className="mx-auto mt-6 max-w-[16ch] font-display text-h2 font-black uppercase leading-[1.05] text-foreground">
          Nosso primeiro curta
        </h2>
        <p className="mx-auto mt-4 max-w-[44ch] text-muted-foreground">
          Um filme inteiro criado com IA, do roteiro à finalização.
        </p>

        {/* trailer */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg border border-border">
          <video
            controls
            playsInline
            poster="/curta-poster.jpg"
            preload="metadata"
            className="aspect-video w-full"
          >
            <source src="/curta-trailer.mp4" type="video/mp4" />
          </video>
        </div>

        {/* contagem regressiva */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {timeLeft ? (
            <>
              <Unit value={timeLeft.days} label="Dias" />
              <Unit value={timeLeft.hours} label="Horas" />
              <Unit value={timeLeft.minutes} label="Min" />
              <Unit value={timeLeft.seconds} label="Seg" />
            </>
          ) : (
            // placeholder do SSR — mesma altura, evita CLS
            <div className="h-[86px]" />
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contato"
            className="inline-flex min-h-11 items-center rounded-pill bg-primary px-7 text-sm font-semibold text-primary-foreground transition-[transform,background] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-blue-300 hover:text-black-950"
          >
            Ativar lembrete
          </Link>
        </div>
      </div>
    </section>
  );
}
