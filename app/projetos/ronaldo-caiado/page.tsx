import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  CaiadoFilmPlayer,
  CaiadoGallery,
  CaiadoHeroWatchLink,
  CaiadoProcessVideo,
} from "@/components/projects/caiado-media";
import { ProjectShareButton } from "@/components/projects/project-share-button";
import { CAIADO_ASSETS } from "@/lib/caiado-project";

export const metadata: Metadata = {
  title: "Ronaldo Caiado — Projeto especial | Cria Frames",
  description:
    "Um curta sobre a trajetória de Ronaldo Caiado, criado inteiramente com inteligência artificial pela Cria Frames.",
};

const PROCESS = [
  {
    marker: "01",
    title: "Pesquisa e roteiro",
    description:
      "A trajetória pública orientou uma narrativa construída para condensar tempo, memória e identidade em uma história de linguagem cinematográfica.",
    videoSrc: CAIADO_ASSETS.processVideos[0],
    objectPosition: "48% 42%",
  },
  {
    marker: "02",
    title: "Direção de arte",
    description:
      "Texturas, luz e composição transformam referências históricas em um universo visual coeso, com escala de cinema e identidade própria.",
    videoSrc: CAIADO_ASSETS.processVideos[1],
    objectPosition: "68% 48%",
  },
  {
    marker: "03",
    title: "Cinema com IA",
    description:
      "Cada imagem foi dirigida cena a cena. A inteligência artificial amplia a produção; roteiro, intenção, montagem e acabamento continuam conduzindo o filme.",
    videoSrc: CAIADO_ASSETS.processVideos[2],
    objectPosition: "30% 58%",
  },
] as const;

export default function RonaldoCaiadoProjectPage() {
  return (
    <main className="bg-black-950 text-white">
      <section className="relative isolate flex min-h-[calc(100svh-var(--site-header-height))] items-end overflow-hidden border-b border-white/10">
        <Image
          src="/curta-poster.jpg"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          className="-z-30 object-cover object-center brightness-[0.46] saturate-75"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(6,6,6,0.28)_0%,rgba(6,6,6,0.5)_44%,rgba(6,6,6,0.98)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_30%,rgba(61,110,255,0.22),transparent_34%)]"
        />

        <div className="mx-auto w-full max-w-container px-4 pb-12 pt-24 md:px-6 md:pb-16">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/58 transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar aos projetos
          </Link>

          <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.5fr)] md:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                Projeto especial · 2026
              </p>
              <h1 className="mt-5 max-w-[9ch] font-display text-[clamp(3.25rem,8vw,5rem)] font-black uppercase leading-[0.84] tracking-[-0.055em]">
                Ronaldo <span className="block text-blue-300">Caiado</span>
              </h1>
            </div>
            <div className="border-l border-white/18 pl-5 md:pl-6">
              <p className="max-w-[36ch] text-sm leading-relaxed text-white/72 md:text-base">
                Uma trajetória transformada em cinema. Um curta inteiramente
                criado com inteligência artificial, direção e processo.
              </p>
              <CaiadoHeroWatchLink />
            </div>
          </div>
        </div>
      </section>

      <section className="theme-light bg-background text-foreground">
        <div className="mx-auto grid max-w-container gap-12 px-4 py-20 md:grid-cols-[minmax(0,0.78fr)_minmax(20rem,1.22fr)] md:px-6 md:py-28">
          <div className="self-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-text">
              Sinopse
            </p>
            <h2 className="mt-5 max-w-[11ch] font-display text-h2 font-black uppercase leading-[0.93] tracking-[-0.04em]">
              Uma história de Goiás para o Brasil.
            </h2>
            <p className="mt-7 max-w-[48ch] text-sm leading-relaxed text-muted-foreground md:text-base">
              O filme percorre a história de Ronaldo Caiado, ex-governador de
              Goiás e candidato à Presidência, por uma narrativa que combina
              memória, território e transformação. Uma produção concebida do
              roteiro ao último frame com inteligência artificial.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-black shadow-[0_28px_80px_rgba(6,6,6,0.18)]">
            <Image
              src="/curta-poster.jpg"
              alt="Pôster do projeto Ronaldo Caiado"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section
        id="assistir"
        aria-labelledby="watch-caiado-heading"
        className="scroll-mt-[var(--site-header-height)] border-y border-white/10 bg-black-900"
      >
        <CaiadoFilmPlayer />
      </section>

      <section className="bg-black-950">
        <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
            O processo criativo
          </p>
          <h2 className="mt-5 max-w-[12ch] font-display text-h2 font-black uppercase leading-[0.93] tracking-[-0.04em]">
            Direção antes da geração.
          </h2>

          <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
            {PROCESS.map((item, index) => (
              <article
                key={item.marker}
                className="grid gap-8 md:grid-cols-2 md:items-center md:gap-14"
              >
                <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                  <p className="font-display text-sm font-black tracking-[0.16em] text-blue-300">
                    {item.marker}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(1.75rem,1.35rem+1.2vw,2.7rem)] font-black uppercase leading-[0.94] tracking-[-0.035em]">
                    {item.title}
                  </h3>
                  <p className="mt-6 max-w-[44ch] text-sm leading-relaxed text-white/62 md:text-base">
                    {item.description}
                  </p>
                </div>
                <div
                  className={`relative aspect-[16/10] overflow-hidden rounded-lg border border-white/12 bg-black ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <CaiadoProcessVideo
                    src={item.videoSrc}
                    objectPosition={item.objectPosition}
                  />
                  <span className="absolute inset-0 bg-gradient-to-tr from-black/48 via-transparent to-blue-500/16" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black-900">
        <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
            Imagens do projeto
          </p>
          <CaiadoGallery />
        </div>
      </section>

      <section className="bg-black-950">
        <div className="mx-auto max-w-container px-4 py-20 md:px-6 md:py-24">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
            Ficha técnica
          </p>
          <dl className="mt-8 grid border-l border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Formato", "Curta-metragem"],
              ["Lançamento", "9 de agosto de 2026"],
              ["Produção", "Cria Frames"],
              ["Tecnologia", "Inteligência artificial"],
            ].map(([term, description]) => (
              <div
                key={term}
                className="border-b border-r border-white/12 p-6 md:p-8"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  {term}
                </dt>
                <dd className="mt-3 font-display text-lg font-black uppercase tracking-[-0.02em]">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-white/10 bg-blue-900">
        <div className="mx-auto flex max-w-container flex-col gap-8 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-6 md:py-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-100/70">
              Próximo projeto
            </p>
            <h2 className="mt-4 max-w-[15ch] font-display text-h2 font-black uppercase leading-[0.93] tracking-[-0.04em]">
              Uma história assim também pode ser sua.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ProjectShareButton />
            <Link
              href="/contato"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill bg-white px-6 text-sm font-semibold text-blue-900 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Falar com o estúdio
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
