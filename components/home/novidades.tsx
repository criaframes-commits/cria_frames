"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getActiveHomeNews,
  type HomeNewsItem,
} from "@/lib/home-news";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothStep(value: number) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

const TONES = {
  brand: {
    accentText: "text-blue-300",
    dot: "bg-blue-500 shadow-[0_0_18px_rgba(61,110,255,0.95)]",
    title: "text-blue-300",
    details: "border-blue-500/30 bg-blue-500/10",
    label: "text-blue-300",
    divider: "bg-blue-500/30",
    posterGlow: "bg-blue-500/15",
    posterFrame: "border-blue-500/30 bg-blue-900/50",
    posterBorder: "border-blue-500/30",
    button:
      "bg-primary shadow-[0_14px_40px_rgba(61,110,255,0.28)] hover:bg-blue-300 hover:text-black-950 hover:shadow-[0_18px_48px_rgba(61,110,255,0.42)]",
  },
  horror: {
    accentText: "text-rose-200",
    dot: "bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.85)]",
    title: "text-rose-200",
    details: "border-rose-400/25 bg-rose-950/35",
    label: "text-rose-200",
    divider: "bg-rose-300/25",
    posterGlow: "bg-rose-900/30",
    posterFrame: "border-rose-300/20 bg-[#18080d]",
    posterBorder: "border-rose-200/20",
    button:
      "bg-rose-800 shadow-[0_14px_40px_rgba(127,29,45,0.42)] hover:bg-rose-200 hover:text-black-950 hover:shadow-[0_18px_48px_rgba(159,18,57,0.38)]",
  },
} as const;

function NewsPoster({ item, tone }: { item: HomeNewsItem; tone: string }) {
  const [src, setSrc] = useState(item.posterUrl);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-lg border bg-black shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${tone}`}
    >
      <Link
        href={item.href}
        aria-label={`Assistir ao projeto ${item.title}`}
        className="absolute right-3 top-3 z-20 grid size-10 place-items-center rounded-full border border-white/30 bg-white/90 text-black-950 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[transform,background] duration-300 ease-premium hover:scale-105 hover:bg-rose-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
      <Image
        src={src}
        alt={item.posterAlt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 62vw, 100vw"
        onError={() => {
          if (item.posterFallbackUrl && src !== item.posterFallbackUrl) {
            setSrc(item.posterFallbackUrl);
          }
        }}
        className="object-cover"
      />
      {item.tone === "horror" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(7,3,6,0.35),transparent_50%,rgba(48,5,18,0.24))]"
        />
      )}
    </div>
  );
}

export function Novidades() {
  // A exportação estática não sabe a data de acesso. Aguarde o navegador
  // conferir a janela de veiculação antes de exibir qualquer novidade.
  const [activeItems, setActiveItems] = useState<HomeNewsItem[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateActiveItems = () => setActiveItems((current) => {
      const next = getActiveHomeNews();
      return current.length === next.length &&
        current.every((item, index) => item.id === next[index].id)
        ? current
        : next;
    });
    const initialFrame = requestAnimationFrame(updateActiveItems);
    const timer = setInterval(updateActiveItems, 60000);
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
      section.querySelectorAll<HTMLElement>("[data-news-reveal]")
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
  }, [activeItems]);

  const item = activeItems[0];
  if (!item) return null;

  const tone = TONES[item.tone ?? "brand"];
  const titleLines = item.titleLines ?? [item.title];

  return (
    <section
      ref={sectionRef}
      id="novidades"
      aria-labelledby="home-news-heading"
      className="relative z-20 -mt-[clamp(3.5rem,8vw,6rem)] min-h-[calc(100svh-var(--site-header-height))] scroll-mt-[var(--site-header-height)]"
    >
      <div
        ref={panelRef}
        className="relative isolate flex min-h-[calc(100svh-var(--site-header-height))] origin-top items-center overflow-hidden rounded-t-[clamp(1.5rem,3vw,2.75rem)] border-t border-white/10 bg-black-900 shadow-[0_-28px_80px_rgba(0,0,0,0.48)] will-change-transform"
      >
        <div
          aria-hidden
          className={`absolute inset-0 -z-20 ${
            item.tone === "horror"
              ? "bg-[radial-gradient(circle_at_14%_20%,rgba(125,25,48,0.19),transparent_34%),radial-gradient(circle_at_88%_75%,rgba(55,13,29,0.25),transparent_38%)]"
              : "bg-[radial-gradient(circle_at_14%_20%,rgba(61,110,255,0.2),transparent_34%),radial-gradient(circle_at_88%_75%,rgba(0,68,189,0.18),transparent_38%)]"
          }`}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black-950/70 to-transparent"
        />
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${item.tone === "horror" ? "via-rose-300/70" : "via-blue-500/80"} to-transparent`}
        />

        <div className="relative mx-auto w-full max-w-container px-4 py-14 md:px-6 md:py-16 lg:py-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 xl:gap-16">
            <div className="relative z-10">
              <div
                data-news-reveal
                data-start="0.02"
                data-end="0.56"
                data-x="-34"
                data-y="92"
                data-rotate="-4"
                className="flex items-center gap-3 will-change-transform"
              >
                <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                <p className={`font-body text-[11px] font-semibold uppercase tracking-[0.2em] md:text-xs ${tone.accentText}`}>
                  {item.eyebrow}
                </p>
              </div>

              <h2
                id="home-news-heading"
                data-news-reveal
                data-start="0.1"
                data-end="0.68"
                data-x="26"
                data-y="118"
                data-rotate="3.5"
                data-scale="0.92"
                className="mt-4 max-w-[11ch] font-display text-[clamp(2.75rem,5.2vw,4.5rem)] font-black uppercase leading-[0.86] tracking-[-0.05em] text-foreground will-change-transform"
              >
                {titleLines.map((line, index) => (
                  <span key={`${item.id}-${index}`} className={`block ${index > 0 ? tone.title : ""}`}>
                    {line}
                  </span>
                ))}
              </h2>

              <p
                data-news-reveal
                data-start="0.16"
                data-end="0.76"
                data-x="-22"
                data-y="105"
                data-rotate="-2.4"
                className={`mt-5 max-w-[31ch] border-l-2 pl-4 font-display text-base font-bold uppercase leading-tight tracking-[-0.01em] text-foreground will-change-transform md:text-lg ${item.tone === "horror" ? "border-rose-400" : "border-blue-500"}`}
              >
                {item.description}
              </p>

              <div
                data-news-reveal
                data-start="0.22"
                data-end="0.84"
                data-x="34"
                data-y="96"
                data-rotate="2.8"
                className={`mt-6 flex max-w-md items-center justify-between gap-5 rounded-md border px-4 py-3 will-change-transform ${tone.details}`}
              >
                <div>
                  <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${tone.label}`}>
                    {item.category}
                  </p>
                  <p className="mt-0.5 font-display text-lg font-black uppercase tracking-[-0.02em] text-foreground">
                    {item.formatLabel}
                  </p>
                </div>
                <span className={`h-8 w-px ${tone.divider}`} aria-hidden />
                <p className={`font-display text-xl font-black uppercase tracking-[-0.02em] ${tone.label}`}>
                  Cria Frames
                </p>
              </div>

              <div
                data-news-reveal
                data-start="0.28"
                data-end="0.9"
                data-x="-26"
                data-y="78"
                data-rotate="-2"
                className="mt-5 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={item.href}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-pill px-7 text-sm font-semibold text-white transition-[transform,background,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200 ${tone.button}`}
                >
                  Assistir agora
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            <div
              data-news-reveal
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
                className={`absolute -inset-4 -z-10 rounded-lg blur-3xl ${tone.posterGlow}`}
              />
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-lg border ${tone.posterFrame}`}
              />
              <NewsPoster key={item.id} item={item} tone={tone.posterBorder} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
