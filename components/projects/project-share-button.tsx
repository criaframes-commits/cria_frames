"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export function ProjectShareButton() {
  const [copied, setCopied] = useState(false);

  const shareProject = async () => {
    const shareData = {
      title: "Ronaldo Caiado — Cria Frames",
      text: "Conheça o projeto especial Ronaldo Caiado, da Cria Frames.",
      url: window.location.href,
    };

    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // O usuário pode fechar a caixa de compartilhamento sem concluir.
    }
  };

  return (
    <button
      type="button"
      onClick={shareProject}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-white/18 px-6 text-sm font-semibold text-white transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-blue-300/60 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
    >
      {copied ? (
        <Check className="h-4 w-4 text-blue-300" aria-hidden />
      ) : (
        <Share2 className="h-4 w-4 text-blue-300" aria-hidden />
      )}
      {copied ? "Link copiado" : "Compartilhar o projeto"}
    </button>
  );
}
