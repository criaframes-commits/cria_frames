"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowDown, ArrowUp, ArrowUpRight, Heart, MessageCircle, Send, Volume2, VolumeX, X } from "lucide-react";
import { loadYouTubeAPI, type YouTubePlayer } from "@/lib/youtube-player";
import type { Reel } from "@/lib/reels";
import styles from "./reels.module.css";

type PlayerStatus = "loading" | "ready" | "blocked" | "error";

function ReelPlayer({ reel, active, muted, positions, registry }: {
  reel: Reel;
  active: boolean;
  muted: boolean;
  positions: Map<string, number>;
  registry: Map<string, YouTubePlayer>;
}) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);
  const activeRef = useRef(active);
  const mutedRef = useRef(muted);
  const [status, setStatus] = useState<PlayerStatus>("loading");
  const [attempt, setAttempt] = useState(0);

  useLayoutEffect(() => { activeRef.current = active; mutedRef.current = muted; }, [active, muted]);

  useLayoutEffect(() => {
    let disposed = false;
    let instance: YouTubePlayer | undefined;
    let ready = false;
    const container = host.current!;
    const mount = document.createElement("div");
    container.appendChild(mount);
    const timer = window.setTimeout(() => {
      if (!disposed && !ready) setStatus("error");
    }, 20000);

    loadYouTubeAPI().then((api) => {
      if (disposed) return;
      instance = new api.Player(mount, {
        host: "https://www.youtube-nocookie.com",
        videoId: reel.youtubeId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0, controls: 1, playsinline: 1, rel: 0,
          loop: 1, playlist: reel.youtubeId,
          origin: window.location.origin,
          start: Math.floor(positions.get(reel.id) ?? 0),
        },
        events: {
          onReady: ({ target }) => {
            if (disposed) return;
            ready = true;
            window.clearTimeout(timer);
            player.current = target;
            registry.set(reel.id, target);
            target.mute();
            setStatus("ready");
            if (activeRef.current && !document.hidden) {
              registry.forEach((other) => { if (other !== target) other.pauseVideo(); });
              if (!mutedRef.current) target.unMute();
              target.playVideo();
            }
          },
          onStateChange: ({ target, data }) => {
            if (disposed) return;
            if (data === 1) {
              if (!activeRef.current || document.hidden) target.pauseVideo();
              else {
                registry.forEach((other) => { if (other !== target) other.pauseVideo(); });
                if (mutedRef.current) target.mute();
                setStatus("ready");
              }
            }
            if (data === 2) positions.set(reel.id, target.getCurrentTime());
            if (data === 0) positions.set(reel.id, 0);
          },
          onAutoplayBlocked: () => { if (!disposed) setStatus("blocked"); },
          onError: () => {
            if (!disposed) { window.clearTimeout(timer); setStatus("error"); }
          },
        },
      });
      const iframe = container.querySelector("iframe");
      if (iframe) {
        iframe.title = `Assistir ${reel.title} no YouTube`;
        iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
      }
    }).catch(() => { if (!disposed) setStatus("error"); });

    const pause = () => {
      if (player.current) {
        positions.set(reel.id, player.current.getCurrentTime());
        player.current.pauseVideo();
      }
    };
    const visibility = () => { if (document.hidden) pause(); };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pagehide", pause);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pagehide", pause);
      pause();
      registry.delete(reel.id);
      player.current = null;
      instance?.destroy();
      container.replaceChildren();
    };
  }, [reel.id, reel.youtubeId, reel.title, positions, registry, attempt]);

  useEffect(() => {
    const current = player.current;
    if (!current) return;
    if (active && !document.hidden) {
      registry.forEach((other) => { if (other !== current) other.pauseVideo(); });
      current.playVideo();
    } else {
      positions.set(reel.id, current.getCurrentTime());
      current.pauseVideo();
    }
  }, [active, positions, registry, reel.id]);

  useEffect(() => {
    if (muted) player.current?.mute();
    else if (active) player.current?.unMute();
  }, [muted, active]);

  return (
    <div className={styles.playerGroup}>
      <div className={styles.player}>
        {(status === "loading" || status === "error") && <Image src={reel.cover} alt="" fill sizes="(max-width: 700px) 85vw, 400px" loading={active ? "eager" : "lazy"} className={styles.loadingCover} />}
        <div className={styles.embed} ref={host} style={{ visibility: status === "loading" || status === "error" ? "hidden" : "visible" }} />
      </div>
      <div className={styles.status} role="status">
        {status === "loading" && "Preparando vídeo…"}
        {status === "ready" && <span className={styles.srOnly}>Vídeo pronto · YouTube</span>}
        {status === "blocked" && <button onClick={() => player.current?.playVideo()}>Toque para reproduzir</button>}
        {status === "error" && <span>Não foi possível carregar. <button onClick={() => { setStatus("loading"); setAttempt((value) => value + 1); }}>Tentar novamente</button> · <a href={`https://www.youtube.com/watch?v=${reel.youtubeId}`} target="_blank" rel="noreferrer">Abrir no YouTube</a></span>}
      </div>
    </div>
  );
}

function ReelSession({ reels, initialIndex, positions, preview }: { reels: Reel[]; initialIndex: number; positions: Map<string, number>; preview: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialIndex);
  const [muted, setMuted] = useState(true);
  const [registry] = useState(() => new Map<string, YouTubePlayer>());
  const activeIndex = useRef(initialIndex);
  const lastWheelTime = useRef(0);
  const selected = reels[active];
  const [shareNotice, setShareNotice] = useState<{ id: string; message: string; fallback?: boolean } | null>(null);
  const currentUrl = `https://www.youtube.com/watch?v=${selected.youtubeId}`;

  useEffect(() => {
    if (!shareNotice || shareNotice.fallback) return;
    const timer = window.setTimeout(() => setShareNotice(null), 5000);
    return () => window.clearTimeout(timer);
  }, [shareNotice]);

  const share = async () => {
    const id = selected.id;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${selected.title} · Cria Frames`, url: currentUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(currentUrl);
      setShareNotice({ id, message: "Link do vídeo copiado." });
    } catch {
      setShareNotice({ id, message: "Copie o link para compartilhar:", fallback: true });
    }
  };

  useLayoutEffect(() => { activeIndex.current = active; }, [active]);

  useLayoutEffect(() => {
    const element = root.current!;
    const align = () => { element.scrollTop = element.clientHeight * initialIndex; };
    align();
  }, [initialIndex]);

  useEffect(() => {
    const element = root.current!;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.65)) {
        if (entries.some((entry) => Number((entry.target as HTMLElement).dataset.index) === activeIndex.current)) {
          registry.forEach((player) => player.pauseVideo());
        }
        return;
      }
      // Observer entries may describe an earlier frame after a fast jump. Resolve
      // against the current scroll position rather than replaying stale entries.
      const index = Math.max(0, Math.min(reels.length - 1, Math.round(element.scrollTop / element.clientHeight)));
      registry.forEach((player, id) => { if (id !== reels[index].id) player.pauseVideo(); });
      if (index === activeIndex.current && !document.hidden) registry.get(reels[index].id)?.playVideo();
      setActive(index);
    }, { root: element, threshold: [0.65] });
    Array.from(element.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [registry, reels]);

  useEffect(() => {
    const element = root.current!;
    let height = element.clientHeight;
    const resize = new ResizeObserver(() => {
      if (height === element.clientHeight) return;
      height = element.clientHeight;
      element.scrollTo({ top: activeIndex.current * height, behavior: "instant" });
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, []);

  const navigate = (index: number) => {
    const element = root.current;
    if (!element) return;
    const next = Math.max(0, Math.min(reels.length - 1, index));
    element.scrollTo({
      top: next * element.clientHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <>
      <header className={styles.viewerHeader}>
        <Link href="/" aria-label="Voltar à página principal" className={styles.brand}>
          <Image src="/cria-frames-logo-preta.svg" alt="Cria Frames" width={70} height={48} />
        </Link>
        <Dialog.Title className={styles.viewerTitle}>CRIA / VERTICAIS</Dialog.Title>
        <Dialog.Description className={styles.srOnly}>Explore os vídeos com a rolagem ou com as setas. A reprodução começa sem som. Curtidas e comentários abrem o YouTube.</Dialog.Description>
        <Dialog.Close className={`${styles.iconButton} ${styles.close}`} aria-label="Fechar e voltar ao início"><X size={22} /></Dialog.Close>
      </header>
      <div className={styles.viewerBody} onWheel={(event) => {
        if (root.current?.contains(event.target as Node)) return;
        if ((event.target as Element).closest("input, p")) return;
        if (Math.abs(event.deltaY) < 12 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        const now = Date.now();
        if (now - lastWheelTime.current < 450) return;
        lastWheelTime.current = now;
        navigate(activeIndex.current + Math.sign(event.deltaY));
      }}>
        <aside className={styles.details}>
          <a href="https://www.youtube.com/@CriaFrames" target="_blank" rel="noreferrer" className={styles.creator}>
            <span className={styles.avatar}><Image src="/cria-frames-logo-preta.svg" alt="" width={32} height={32} /></span>
            <strong>criaframes</strong><span>YouTube <ArrowUpRight size={12} /></span>
          </a>
          <h2 aria-live="polite">{selected.title}</h2>
          <p className={styles.description}>{selected.description}</p>
          <p className={styles.category}>{selected.category} · {selected.duration}</p>
          {preview && <p className={styles.sampleNote}>Prévia · seleção do portfólio</p>}
        </aside>
        <div className={styles.feed} ref={root} tabIndex={0} aria-label="Vídeos do Cria Frames" onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "PageDown") { event.preventDefault(); navigate(active + 1); }
          if (event.key === "ArrowUp" || event.key === "PageUp") { event.preventDefault(); navigate(active - 1); }
          if (event.key === "Home") { event.preventDefault(); navigate(0); }
          if (event.key === "End") { event.preventDefault(); navigate(reels.length - 1); }
        }}>
          {reels.map((reel, index) => (
            <section className={styles.slide} key={reel.id} data-index={index} aria-label={`${index + 1} de ${reels.length}: ${reel.title}`} inert={index !== active}>
              {Math.abs(index - active) <= 1 ? <ReelPlayer reel={reel} active={index === active} muted={muted} positions={positions} registry={registry} /> : <div className={styles.placeholder}><Image src={reel.cover} alt="" fill sizes="(max-width: 700px) 80vw, 400px" /></div>}
            </section>
          ))}
        </div>
        <div className={styles.actions} aria-label="Ações do vídeo">
          <a className={styles.socialAction} href={currentUrl} target="_blank" rel="noreferrer" aria-label="Curtir no YouTube (abre em outra aba)" title="Curtir no YouTube"><Heart size={27} strokeWidth={1.6} /><span>Curtir</span></a>
          <a className={styles.socialAction} href={`${currentUrl}#comments`} target="_blank" rel="noreferrer" aria-label="Comentar no YouTube (abre em outra aba)" title="Comentar no YouTube"><MessageCircle size={27} strokeWidth={1.6} /><span>Comentar</span></a>
          <button className={styles.socialAction} onClick={() => void share()} aria-label="Compartilhar vídeo" title="Compartilhar vídeo"><Send size={27} strokeWidth={1.6} /><span>Compartilhar</span></button>
          <button className={styles.socialAction} onClick={() => setMuted((value) => !value)} aria-label={muted ? "Ativar som" : "Silenciar"} title={muted ? "Ativar som" : "Silenciar"}>{muted ? <VolumeX size={23} strokeWidth={1.6} /> : <Volume2 size={23} strokeWidth={1.6} />}<span>{muted ? "Ativar som" : "Silenciar"}</span></button>
          {shareNotice?.id === selected.id && <div className={styles.shareNotice} role="status">
            {shareNotice.message}
            {shareNotice.fallback && <input aria-label="Link para compartilhar" readOnly value={currentUrl} onFocus={(event) => event.currentTarget.select()} />}
          </div>}
        </div>
      </div>
      <nav className={styles.navigation} aria-label="Navegar pelos vídeos">
        <button className={styles.iconButton} disabled={active === 0} onClick={() => navigate(active - 1)} aria-label="Vídeo anterior"><ArrowUp size={22} /></button>
        <button className={styles.iconButton} disabled={active === reels.length - 1} onClick={() => navigate(active + 1)} aria-label="Próximo vídeo"><ArrowDown size={22} /></button>
        <span className={styles.counter} aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}</span>
      </nav>
    </>
  );
}

export function ReelsViewer({ reels, preview = false }: { reels: Reel[]; preview?: boolean }) {
  const router = useRouter();
  const [positions] = useState(() => new Map<string, number>());
  return (
    <main className={styles.routeShell}>
      <h1 className={styles.srOnly}>Vídeos da Cria Frames</h1>
      <Dialog.Root open onOpenChange={(open) => { if (!open) router.push("/"); }}>
        <Dialog.Portal><Dialog.Backdrop className={styles.backdrop} /><Dialog.Popup className={`theme-light ${styles.viewer}`}>
          {reels.length > 0 ? <ReelSession reels={reels} initialIndex={0} positions={positions} preview={preview} /> : <div className={styles.empty}><Dialog.Title>Novos vídeos em breve.</Dialog.Title><Dialog.Description>Estamos preparando a próxima seleção.</Dialog.Description><Dialog.Close>Voltar ao início</Dialog.Close></div>}
        </Dialog.Popup></Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
