import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type CaiadoAuthorshipNoticeProps = {
  compact?: boolean;
  className?: string;
};

const COPYRIGHT_LAW_URL =
  "https://www.planalto.gov.br/ccivil_03/leis/l9610.htm";

export function CaiadoAuthorshipNotice({
  compact = false,
  className,
}: CaiadoAuthorshipNoticeProps) {
  const brandLink = (
    <Link
      href="/sobre#equipe"
      aria-label="Cria Frames — ver nossa equipe"
      className="group/author-logo relative inline-flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
    >
      <span
        className={cn(
          "relative block overflow-hidden",
          compact ? "w-9" : "w-11"
        )}
      >
        <Image
          src="/cria-frames-logo-branca.svg"
          alt="Cria Frames"
          width={1018}
          height={796}
          className="h-auto w-full"
        />
        <span
          aria-hidden="true"
          className="absolute inset-y-[-15%] left-0 w-1/2 -translate-x-[170%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-premium group-hover/author-logo:translate-x-[310%] group-hover/author-logo:opacity-100 group-focus-visible/author-logo:translate-x-[310%] group-focus-visible/author-logo:opacity-100 motion-reduce:hidden"
        />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.45rem)] z-30 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-pill border border-white/15 bg-black-950/95 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-xl transition-[opacity,transform] duration-200 group-hover/author-logo:translate-y-0 group-hover/author-logo:opacity-100 group-focus-visible/author-logo:translate-y-0 group-focus-visible/author-logo:opacity-100">
        Ver nossa equipe
      </span>
    </Link>
  );

  if (compact) {
    return (
      <aside
        aria-label="Aviso de autoria do curta"
        className={cn(
          "relative inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-white/12 bg-white/[0.035] px-3 py-2 text-white/72 backdrop-blur-sm",
          className
        )}
      >
        <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-blue-300">
          Obra original
        </span>
        <span aria-hidden="true" className="h-3 w-px bg-white/15" />
        <span className="text-[10px] font-semibold">Autoria exclusiva da</span>
        {brandLink}
        <a
          href={COPYRIGHT_LAW_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[8px] font-semibold text-white/38 underline decoration-white/15 underline-offset-2 transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
        >
          Lei nº 9.610/98
        </a>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Aviso de autoria do curta"
      className={cn(
        "relative max-w-sm rounded-md border border-blue-300/20 bg-blue-950/35 px-3 py-3 text-white shadow-[0_14px_38px_rgba(0,0,0,0.16)] backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full border border-blue-300/30 bg-blue-500/10 text-blue-300"
        >
          <ShieldCheck className="size-3.5" />
        </span>

        <div className="min-w-0">
          <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-blue-300">
            Obra original
          </p>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold leading-none text-white/82">
            <span>Autoria exclusiva da</span>
            {brandLink}
          </div>
        </div>
      </div>

      <p className="mt-2 border-t border-white/10 pt-2 text-[9px] leading-relaxed text-white/45">
        Veiculação exige autorização e crédito.{" "}
        <a
          href={COPYRIGHT_LAW_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-300/80 underline decoration-blue-300/30 underline-offset-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
        >
          Lei nº 9.610/98 · arts. 24 e 29
        </a>
        .
      </p>
    </aside>
  );
}
