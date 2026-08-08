"use client";

import { useEffect, useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Play,
  X,
} from "lucide-react";
import {
  CAIADO_ASSETS,
  CAIADO_FULL_FILM_YOUTUBE_URL,
  CAIADO_PREMIERE_DATE,
  getYouTubeId,
} from "@/lib/caiado-project";

const GALLERY_POSITIONS = [
  "20% 45%",
  "46% 38%",
  "72% 52%",
  "88% 44%",
  "52% 50%",
] as const;

function useCaiadoReleased() {
  const [released, setReleased] = useState(false);

  useEffect(() => {
    const updateReleaseState = () => {
      setReleased(Date.now() >= CAIADO_PREMIERE_DATE.getTime());
    };
    const frame = window.requestAnimationFrame(updateReleaseState);
    const timer = window.setInterval(updateReleaseState, 1000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  return released;
}

type CaiadoProcessVideoProps = {
  src: string;
  objectPosition: string;
};

export function CaiadoProcessVideo({
  src,
  objectPosition,
}: CaiadoProcessVideoProps) {
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) {
    return (
      <Image
        src={CAIADO_ASSETS.poster}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        style={{ objectPosition }}
        className="scale-[1.2] object-cover brightness-[0.62]"
      />
    );
  }

  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={CAIADO_ASSETS.poster}
      aria-label="Vídeo do processo criativo"
      onError={() => setUnavailable(true)}
      style={{ objectPosition }}
      className="absolute inset-0 h-full w-full object-cover brightness-[0.72]"
    />
  );
}

type CaiadoGalleryImageProps = {
  src: string;
  objectPosition: string;
  expanded?: boolean;
};

function CaiadoGalleryImage({
  src,
  objectPosition,
  expanded = false,
}: CaiadoGalleryImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt="Imagem do projeto Ronaldo Caiado"
      fill
      sizes={expanded ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
      onError={() => setImageSrc(CAIADO_ASSETS.poster)}
      style={{ objectPosition: expanded ? "center" : objectPosition }}
      className={
        expanded
          ? "object-contain"
          : "scale-[1.08] object-cover brightness-[0.68] transition-[transform,filter] duration-700 group-hover/gallery:scale-[1.14] group-hover/gallery:brightness-100"
      }
    />
  );
}

export function CaiadoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedSrc =
    selectedIndex === null ? null : CAIADO_ASSETS.galleryImages[selectedIndex];

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current - 1 + CAIADO_ASSETS.galleryImages.length) %
          CAIADO_ASSETS.galleryImages.length
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current + 1) % CAIADO_ASSETS.galleryImages.length
    );
  };

  return (
    <>
      <div className="mt-8 grid auto-rows-[12rem] grid-cols-2 gap-2 md:auto-rows-[18rem] md:grid-cols-4">
        {CAIADO_ASSETS.galleryImages.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Ampliar imagem ${index + 1} do projeto`}
            className={`group/gallery relative overflow-hidden rounded-md border border-white/10 bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 ${
              index === 0 || index >= 3 ? "col-span-2" : ""
            }`}
          >
            <CaiadoGalleryImage
              src={src}
              objectPosition={GALLERY_POSITIONS[index]}
            />
            <span className="pointer-events-none absolute inset-0 bg-blue-500/0 transition-colors duration-500 group-hover/gallery:bg-blue-500/[0.08]" />
            <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur-md transition-[opacity,transform] duration-300 group-hover/gallery:scale-105 group-hover/gallery:opacity-100 group-focus-visible/gallery:opacity-100">
              <span className="text-lg leading-none">+</span>
            </span>
          </button>
        ))}
      </div>

      <DialogPrimitive.Root
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <DialogPrimitive.Popup className="fixed inset-0 z-[120] flex min-h-dvh items-center justify-center overflow-hidden p-3 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 md:p-8">
            <DialogPrimitive.Title className="sr-only">
              Imagem ampliada do projeto Ronaldo Caiado
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Galeria em tela cheia. Use os botões para navegar entre as imagens.
            </DialogPrimitive.Description>

            <DialogPrimitive.Close
              aria-label="Fechar imagem"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-7 md:top-7"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </DialogPrimitive.Close>

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:left-7"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>

            {selectedSrc && (
              <div className="relative h-[82svh] w-[calc(100vw-5.5rem)] max-w-[1500px] md:w-[calc(100vw-10rem)]">
                <CaiadoGalleryImage
                  key={selectedSrc}
                  src={selectedSrc}
                  objectPosition="center"
                  expanded
                />
              </div>
            )}

            <button
              type="button"
              onClick={showNext}
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-7"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold tabular-nums tracking-[0.18em] text-white/55 md:bottom-7">
              {selectedIndex === null
                ? ""
                : `${String(selectedIndex + 1).padStart(2, "0")} / ${String(
                    CAIADO_ASSETS.galleryImages.length
                  ).padStart(2, "0")}`}
            </p>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}

export function CaiadoHeroWatchLink() {
  const released = useCaiadoReleased();

  return (
    <a
      href="#assistir"
      className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-pill bg-blue-500 px-6 text-sm font-semibold text-white transition-[background,transform] duration-300 hover:-translate-y-0.5 hover:bg-blue-300 hover:text-black-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
    >
      <Play className="h-4 w-4 fill-current" aria-hidden />
      {released ? "Assistir ao curta" : "Assistir ao trailer"}
    </a>
  );
}

export function CaiadoFilmPlayer() {
  const released = useCaiadoReleased();
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const youtubeId = getYouTubeId(CAIADO_FULL_FILM_YOUTUBE_URL);

  if (!released) {
    return (
      <div className="mx-auto max-w-[1500px] px-4 py-20 md:px-6 md:py-28">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
              Assista
            </p>
            <h2
              id="watch-caiado-heading"
              className="mt-4 font-display text-h2 font-black uppercase leading-none tracking-[-0.04em]"
            >
              Trailer oficial.
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/45">
            Curta-metragem · 01:23
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/14 bg-black shadow-[0_32px_100px_rgba(0,0,0,0.52)]">
          <video
            controls
            playsInline
            preload="metadata"
            poster={CAIADO_ASSETS.poster}
            className="aspect-video max-h-[82svh] w-full bg-black object-contain"
          >
            <source src={CAIADO_ASSETS.trailer} type="video/mp4" />
            Seu navegador não suporta a reprodução deste vídeo.
          </video>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-20 md:px-6 md:py-28">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
            Sessão especial
          </p>
          <h2
            id="watch-caiado-heading"
            className="mt-4 font-display text-h2 font-black uppercase leading-none tracking-[-0.04em]"
          >
            Assista ao curta.
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.15em] text-white/45">
          Cria Frames apresenta · Ronaldo Caiado
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          if (youtubeId) setCinemaOpen(true);
        }}
        disabled={!youtubeId}
        className="group/cinema relative block aspect-video w-full overflow-hidden rounded-lg border border-blue-500/30 bg-black text-left shadow-[0_32px_110px_rgba(0,0,0,0.58)] transition-[border-color,box-shadow] duration-700 enabled:hover:border-blue-300/65 enabled:hover:shadow-[0_38px_130px_rgba(32,73,190,0.22)] disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
      >
        <Image
          src={CAIADO_ASSETS.poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover brightness-[0.38] transition-[transform,filter] duration-1000 group-enabled/cinema:group-hover/cinema:scale-[1.025] group-enabled/cinema:group-hover/cinema:brightness-[0.5]"
        />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_68%,rgba(0,0,0,0.9)_100%)]" />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-5 text-center text-white">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/28 bg-white/90 text-black shadow-[0_0_60px_rgba(61,110,255,0.38)] transition-transform duration-500 group-enabled/cinema:group-hover/cinema:scale-110 md:h-20 md:w-20">
            {youtubeId ? (
              <Play className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7" aria-hidden />
            ) : (
              <Clapperboard className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
            )}
          </span>
          <span className="font-display text-xl font-black uppercase tracking-[-0.025em] md:text-3xl">
            {youtubeId ? "Entrar na sessão" : "Link do curta pendente"}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
            {youtubeId ? "Use fones de ouvido · aumente o volume" : "Adicione o link do YouTube no arquivo indicado"}
          </span>
        </span>
      </button>

      <DialogPrimitive.Root open={cinemaOpen} onOpenChange={setCinemaOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-[130] bg-black/98 backdrop-blur-2xl transition-opacity duration-500 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <DialogPrimitive.Popup className="fixed inset-0 z-[140] flex min-h-dvh flex-col overflow-y-auto bg-black text-white transition-opacity duration-500 data-ending-style:opacity-0 data-starting-style:opacity-0">
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,66,155,0.2)_0%,rgba(0,0,0,0.92)_66%)]" />
            <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 h-28 bg-gradient-to-b from-blue-950/35 to-transparent" />

            <header className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-4 py-4 md:px-8 md:py-6">
              <div>
                <DialogPrimitive.Title className="font-display text-sm font-black uppercase tracking-[0.12em] md:text-base">
                  Ronaldo Caiado
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/42 md:text-[10px]">
                  Uma produção Cria Frames · Sessão especial
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close
                aria-label="Sair da sessão"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/18 bg-black/50 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </DialogPrimitive.Close>
            </header>

            <div className="relative z-10 flex flex-1 items-center justify-center px-2 pb-5 md:px-8 md:pb-8">
              <div className="relative aspect-video w-full max-w-[1500px] overflow-hidden rounded-sm border border-white/12 bg-black shadow-[0_0_120px_rgba(40,77,185,0.22),0_40px_120px_rgba(0,0,0,0.8)]">
                {youtubeId && (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1&color=white`}
                    title="Curta Ronaldo Caiado"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                )}
              </div>
            </div>

            <p className="relative z-10 pb-5 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-white/32 md:pb-7 md:text-[10px]">
              Luzes apagadas · Som ligado · Boa sessão
            </p>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
