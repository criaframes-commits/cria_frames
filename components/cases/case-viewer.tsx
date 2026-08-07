"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ChevronDown, X } from "lucide-react";
import type { PortfolioCase } from "@/lib/portfolio-cases";

type CaseViewerProps = {
  caseItem: PortfolioCase | null;
  onClose: () => void;
};

export function CaseViewer({ caseItem, onClose }: CaseViewerProps) {
  return (
    <DialogPrimitive.Root
      open={caseItem !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup className="fixed inset-0 z-[100] overflow-y-auto p-3 transition-[opacity,transform] duration-300 data-ending-style:scale-[0.985] data-ending-style:opacity-0 data-starting-style:scale-[0.985] data-starting-style:opacity-0 md:p-6">
          {caseItem && (
            <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col justify-center">
              <header className="mb-4 flex items-center justify-between gap-6 text-white md:mb-5">
                <div className="min-w-0">
                  <DialogPrimitive.Title className="truncate font-display text-lg font-black uppercase tracking-[-0.02em] md:text-2xl">
                    {caseItem.title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">
                    {caseItem.category} · {caseItem.year} · {caseItem.duration}
                  </DialogPrimitive.Description>
                </div>
                <DialogPrimitive.Close
                  aria-label="Fechar case"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </DialogPrimitive.Close>
              </header>

              <div className="overflow-hidden rounded-md border border-white/10 bg-black shadow-2xl">
                <video
                  key={caseItem.slug}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={caseItem.coverSrc}
                  className="aspect-video max-h-[76vh] w-full bg-black object-contain"
                >
                  <source src={caseItem.videoSrc} type="video/mp4" />
                  Seu navegador não oferece suporte à reprodução de vídeo.
                </video>
              </div>

              <details className="group/context mt-4 rounded-md border border-white/10 bg-black/70 text-white open:bg-black md:mt-5">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white md:px-6 [&::-webkit-details-marker]:hidden">
                  Por trás do projeto
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-open/context:rotate-180"
                  />
                </summary>
                <div className="border-t border-white/10 px-5 py-5 md:px-6 md:py-6">
                  <p className="max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
                    {caseItem.context}
                  </p>
                </div>
              </details>
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

