"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import Link from "next/link";
import { X } from "lucide-react";

export function Hero() {
  const [cursorActive, setCursorActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Fonte única de verdade: a última posição conhecida do mouse é comparada
  // com o retângulo atual da seção. Chamada tanto no mousemove quanto no
  // scroll — por isso rolar sem mexer o mouse também desativa o cursor.
  const sync = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const r = section.getBoundingClientRect();
    const { x, y } = pointer.current;
    setCursorActive(x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      const cursor = cursorRef.current;
      if (cursor) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        });
      }
      sync();
    };
    const onLeaveWindow = () => setCursorActive(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      cancelAnimationFrame(frame);
    };
  }, [sync]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          void video.play().catch(() => undefined);
          return;
        }
        video.pause();
      },
      { threshold: [0, 0.4] }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <DialogPrimitive.Root>
      <section
        ref={sectionRef}
        className="relative min-h-[92vh] overflow-hidden [@media(pointer:fine)]:cursor-none"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero-teaser.mp4" type="video/mp4" />
        </video>

        {/* Um único gradiente amplo, com stops intermediários para dissolver
            devagar. Sem camadas duras e sem text-shadow — o escurecimento é
            do bloco inteiro, não um contorno em volta das letras. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(6_6_6/0.96)_0%,rgb(6_6_6/0.92)_18%,rgb(6_6_6/0.8)_34%,rgb(6_6_6/0.6)_50%,rgb(6_6_6/0.42)_66%,rgb(6_6_6/0.3)_100%)]"
        />

        <DialogPrimitive.Trigger
          aria-label="Assistir ao reel completo"
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent-text [@media(pointer:fine)]:cursor-none"
        />

        <div className="pointer-events-none relative z-20 flex min-h-[92vh] items-end">
          <div className="mx-auto w-full max-w-container px-4 pb-16 md:px-6 md:pb-20">
            <div className="pointer-events-auto max-w-2xl [@media(pointer:fine)]:cursor-none">
              <span className="hero-fade hero-fade-1 inline-flex items-center gap-2 font-body text-caption font-medium uppercase tracking-[0.25em] text-accent-text before:content-['—'] after:content-['—'] before:opacity-50 after:opacity-50">
                Estúdio de criação com IA
              </span>

              <h1 className="mt-5">
                <span className="hero-fade hero-fade-2 block font-display text-[clamp(2.25rem,1.8rem+2.4vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-white">
                  Criamos o impossível
                </span>
                <span className="hero-fade hero-fade-3 mt-2 block font-body text-[clamp(0.95rem,0.85rem+0.5vw,1.25rem)] font-light uppercase tracking-[0.3em] text-white/80">
                  com IA, cinema e processo
                </span>
              </h1>

              <div className="hero-fade hero-fade-4 mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="#cases"
                  className="inline-flex min-h-11 items-center rounded-pill bg-primary px-7 text-sm font-semibold text-primary-foreground transition-[transform,background] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-blue-300 hover:text-black-950"
                >
                  Ver portfólio
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex min-h-11 items-center rounded-pill border border-white/30 px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                >
                  Falar com o estúdio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* cursor WATCH — preto sólido, some ao sair da seção (inclusive no scroll) */}
      <div
        ref={cursorRef}
        aria-hidden
        className={`pointer-events-none fixed z-40 hidden h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#060606] [@media(pointer:fine)]:flex ${
          cursorActive ? "watch-cursor-in opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-white">
          Watch
        </span>
      </div>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-[90] bg-black/90 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 md:p-6"
        >
          <DialogPrimitive.Title className="sr-only">
            Reel completo da Cria Frames
          </DialogPrimitive.Title>
          <DialogPrimitive.Close
            aria-label="Fechar vídeo"
            className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/80 text-white transition-colors hover:bg-white/15"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
          <iframe
            src="https://www.youtube-nocookie.com/embed/e7cgHPI8wFo?autoplay=1&rel=0&playsinline=1"
            title="Reel completo da Cria Frames"
            className="aspect-video max-h-[95vh] w-full max-w-[95vw] rounded-md border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          >
          </iframe>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
