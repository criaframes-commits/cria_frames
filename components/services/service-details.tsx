"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import type { StudioService } from "@/lib/studio-services";

type ServiceDetailsProps = {
  services: readonly StudioService[];
};

const VIDEO_STYLES = [
  "object-center scale-105",
  "object-[68%_center] scale-[1.14] hue-rotate-[10deg]",
  "object-[32%_center] scale-110 saturate-75",
  "object-[78%_center] scale-[1.18] hue-rotate-[-10deg]",
] as const;

export function ServiceDetails({ services }: ServiceDetailsProps) {
  const serviceRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (finePointer.matches) return;

    let frame = 0;
    const updateActiveService = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight * 0.54;
        let closestId: string | null = null;
        let closestDistance = Number.POSITIVE_INFINITY;

        Object.entries(serviceRefs.current).forEach(([id, element]) => {
          if (!element) return;
          const bounds = element.getBoundingClientRect();
          if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

          const distance = Math.abs(
            bounds.top + bounds.height / 2 - viewportCenter
          );
          if (distance < closestDistance) {
            closestDistance = distance;
            closestId = id;
          }
        });

        setActiveService((current) =>
          current === closestId ? current : closestId
        );
      });
    };

    updateActiveService();
    window.addEventListener("scroll", updateActiveService, { passive: true });
    window.addEventListener("resize", updateActiveService);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveService);
      window.removeEventListener("resize", updateActiveService);
    };
  }, []);

  const updateSpotlight = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--service-pointer-x",
      `${event.clientX - bounds.left}px`
    );
    event.currentTarget.style.setProperty(
      "--service-pointer-y",
      `${event.clientY - bounds.top}px`
    );
  };

  return (
    <section
      aria-label="Serviços em detalhe"
      className="border-b border-border bg-black-900"
    >
      <div>
        {services.map((service, index) => (
          <article
            id={service.id}
            key={service.id}
            ref={(element) => {
              serviceRefs.current[service.id] = element;
            }}
            data-active={activeService === service.id ? "true" : "false"}
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse") setActiveService(service.id);
              updateSpotlight(event);
            }}
            onPointerMove={updateSpotlight}
            className="group/service relative isolate scroll-mt-[var(--site-header-height)] overflow-hidden border-b border-white/12 last:border-b-0"
          >
            <video
              aria-hidden="true"
              tabIndex={-1}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              poster="/hero-poster.jpg"
              className={cn(
                "pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover opacity-38 brightness-[0.28] transition-[filter,opacity,transform] duration-700 ease-premium group-hover/service:opacity-55 group-hover/service:brightness-[0.42] group-hover/service:saturate-100 group-data-[active=true]/service:opacity-55 group-data-[active=true]/service:brightness-[0.42] group-data-[active=true]/service:saturate-100",
                VIDEO_STYLES[index % VIDEO_STYLES.length]
              )}
            >
              <source src={service.videoSrc} type="video/mp4" />
            </video>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,3,3,0.94)_0%,rgba(3,3,3,0.76)_50%,rgba(3,3,3,0.88)_100%)] transition-opacity duration-500 group-hover/service:opacity-88 group-data-[active=true]/service:opacity-88"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover/service:opacity-100 group-data-[active=true]/service:opacity-100"
              style={{
                background:
                  "radial-gradient(480px circle at var(--service-pointer-x, 50%) var(--service-pointer-y, 50%), rgba(61, 110, 255, 0.24), transparent 62%)",
              }}
            />

            <div className="mx-auto grid min-h-[64svh] max-w-container content-center gap-10 px-4 py-14 md:grid-cols-[minmax(15rem,0.68fr)_minmax(0,1.32fr)] md:px-6 md:py-16 lg:gap-20">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                  Serviço
                </p>
                <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(1.9rem,1.4rem+1.35vw,2.8rem)] font-black uppercase leading-[0.94] tracking-[-0.035em] text-white transition-[filter,text-shadow] duration-500 group-hover/service:[text-shadow:0_0_32px_rgba(255,255,255,0.18)] group-data-[active=true]/service:[text-shadow:0_0_32px_rgba(255,255,255,0.18)]">
                  {service.title}
                </h2>
                <p className="mt-5 max-w-[43ch] text-sm leading-relaxed text-white/68 transition-colors duration-500 group-hover/service:text-white/82 group-data-[active=true]/service:text-white/82 md:text-base">
                  {service.description}
                </p>
              </div>

              <div className="grid gap-px self-center border border-white/14 bg-white/14 shadow-[0_24px_80px_rgba(0,0,0,0.26)] transition-[border-color,box-shadow] duration-500 group-hover/service:border-blue-300/28 group-hover/service:shadow-[0_24px_90px_rgba(13,71,255,0.16)] group-data-[active=true]/service:border-blue-300/28 group-data-[active=true]/service:shadow-[0_24px_90px_rgba(13,71,255,0.16)] sm:grid-cols-2">
                <div className="bg-black/58 p-6 backdrop-blur-sm transition-colors duration-500 group-hover/service:bg-black/48 group-data-[active=true]/service:bg-black/48 md:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                    Entregas possíveis
                  </p>
                  <ul className="mt-6 divide-y divide-white/12">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-center gap-3 py-3 text-sm text-white/78 transition-colors duration-500 first:pt-0 last:pb-0 group-hover/service:text-white group-data-[active=true]/service:text-white"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300"
                        />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/72 p-6 backdrop-blur-sm transition-colors duration-500 group-hover/service:bg-black/58 group-data-[active=true]/service:bg-black/58 md:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                    Pode virar
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.examples.map((example) => (
                      <li
                        key={example}
                        className="rounded-pill border border-white/14 px-3 py-2 text-xs text-white/72"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
