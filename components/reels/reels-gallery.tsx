"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowDown, ArrowUp, ArrowUpRight, Play, Volume2, VolumeX, X } from "lucide-react";
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
        {(status === "loading" || status === "error") && <Image src={reel.cover} alt="" fill sizes="(max-width: 700px) 85vw, 400px" className={styles.loadingCover} />}
        <div className={styles.embed} ref={host} style={{ visibility: status === "loading" || status === "error" ? "hidden" : "visible" }} />
      </div>
      <div className={styles.status} role="status">
        {status === "loading" && "Preparando vídeo…"}
        {status === "ready" && "YouTube · use os controles do vídeo"}
        {status === "blocked" && <button onClick={() => player.current?.playVideo()}>Toque para reproduzir</button>}
        {status === "error" && <span>Não foi possível carregar. <button onClick={() => { setStatus("loading"); setAttempt((value) => value + 1); }}>Tentar novamente</button> · <a href={`https://www.youtube.com/watch?v=${reel.youtubeId}`} target="_blank" rel="noreferrer">Abrir no YouTube</a></span>}
      </div>
    </div>
  );
}

function ReelSession({ reels, initialIndex, positions }: { reels: Reel[]; initialIndex: number; positions: Map<string, number> }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialIndex);
  const [muted, setMuted] = useState(true);
  const [registry] = useState(() => new Map<string, YouTubePlayer>());
  const activeIndex = useRef(initialIndex);
  const selected = reels[active];

  useLayoutEffect(() => { activeIndex.current = active; }, [active]);

  useLayoutEffect(() => {
    const element = root.current!;
    const align = () => { element.scrollTop = element.clientHeight * initialIndex; };
    align();
  }, [initialIndex]);

  useEffect(() => {
    const element = root.current!;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.65)) return;
      // Observer entries may describe an earlier frame after a fast jump. Resolve
      // against the current scroll position rather than replaying stale entries.
      const index = Math.max(0, Math.min(reels.length - 1, Math.round(element.scrollTop / element.clientHeight)));
      registry.forEach((player, id) => { if (id !== reels[index].id) player.pauseVideo(); });
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
    element.scrollTo({ top: next * element.clientHeight, behavior: "instant" });
  };

  return (
    <>
      <header className={styles.viewerHeader}>
        <div><Dialog.Title className={styles.viewerTitle}>CRIA / EM MOVIMENTO</Dialog.Title><Dialog.Description className={styles.viewerDescription}>Role entre os vídeos ou use as setas.</Dialog.Description></div>
        <Dialog.Close className={styles.iconButton} aria-label="Fechar visualizador"><X size={22} /></Dialog.Close>
      </header>
      <div className={styles.viewerBody}>
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
        <aside className={styles.details}>
          <p className={styles.eyebrow}>{selected.category} / {selected.duration}</p>
          <h2 aria-live="polite">{selected.title}</h2>
          <p className={styles.description}>{selected.description}</p>
          <a className={styles.youtubeLink} href={`https://www.youtube.com/watch?v=${selected.youtubeId}`} target="_blank" rel="noreferrer">Assistir no YouTube <ArrowUpRight size={16} /></a>
        </aside>
      </div>
      <footer className={styles.viewerFooter}>
        <button className={styles.soundButton} onClick={() => setMuted((value) => !value)} aria-label={muted ? "Ativar som" : "Silenciar"}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}<span>{muted ? "Ativar som" : "Silenciar"}</span></button>
        <span className={styles.counter} aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}</span>
        <div className={styles.navigation}><button className={styles.iconButton} disabled={active === 0} onClick={() => navigate(active - 1)} aria-label="Vídeo anterior"><ArrowUp size={20} /></button><button className={styles.iconButton} disabled={active === reels.length - 1} onClick={() => navigate(active + 1)} aria-label="Próximo vídeo"><ArrowDown size={20} /></button></div>
      </footer>
    </>
  );
}

export function ReelsGallery({ reels }: { reels: Reel[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [positions] = useState(() => new Map<string, number>());
  const opener = useRef<HTMLButtonElement | null>(null);
  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}><span className={styles.dot} /> CRIA FRAMES / PLAY</p>
        <h1>Histórias que<br /><span>movem o olhar.</span></h1>
        <div className={styles.introBottom}><p>Um frame puxa o próximo.<br />Escolha um filme e explore o universo Cria.</p><span className={styles.previewBadge}>Prévia · vídeos do portfólio</span></div>
      </div>
      <div className={styles.grid}>
        {reels.map((reel, index) => <button key={reel.id} className={styles.card} aria-label={`Assistir ${reel.title}`} onClick={(event) => { opener.current = event.currentTarget; setSelected(index); }}>
          <Image src={reel.cover} alt="" fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" loading={index < 2 ? "eager" : "lazy"} />
          <div className={styles.cardShade} />
          <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span><span className={styles.cardDuration}>{reel.duration}</span>
          <span className={styles.cardPlay}><Play size={24} fill="currentColor" /></span>
          <span className={styles.cardInfo}><span>{reel.category}</span><strong>{reel.title}</strong><span className={styles.cardAction}>ASSISTIR <ArrowUpRight size={14} /></span></span>
        </button>)}
      </div>
      <p className={styles.endnote}>Direção, intenção e movimento. Por Cria Frames.</p>
      <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <Dialog.Portal><Dialog.Backdrop className={styles.backdrop} /><Dialog.Popup className={styles.viewer} finalFocus={opener}>
          {selected !== null && <ReelSession reels={reels} initialIndex={selected} positions={positions} />}
        </Dialog.Popup></Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
