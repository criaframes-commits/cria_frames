/** Minimal public surface of the official YouTube IFrame API. */
export type YouTubePlayer = {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  getCurrentTime(): number;
  destroy(): void;
};

type PlayerEvent = { target: YouTubePlayer };
export type YouTubeAPI = {
  Player: new (element: HTMLElement, options: {
    host: string;
    videoId: string;
    width: string;
    height: string;
    playerVars: Record<string, string | number>;
    events: {
      onReady(event: PlayerEvent): void;
      onStateChange(event: PlayerEvent & { data: number }): void;
      onAutoplayBlocked(event: PlayerEvent): void;
      onError(event: PlayerEvent & { data: number }): void;
    };
  }) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeAPI> | undefined;

// No script or YouTube connection until the visitor opens the viewer.
export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    const script = document.createElement("script");
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      if (window.onYouTubeIframeAPIReady === ready) {
        window.onYouTubeIframeAPIReady = previous;
      }
      if (error) {
        script.remove();
        apiPromise = undefined;
        reject(error);
      } else {
        resolve(window.YT!);
      }
    };
    const ready = () => {
      if (window.YT?.Player) finish();
      previous?.();
    };
    const timeout = window.setTimeout(() => finish(new Error("YouTube timeout")), 15000);
    window.onYouTubeIframeAPIReady = ready;
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => finish(new Error("YouTube unavailable"));
    document.head.appendChild(script);
  });
  return apiPromise;
}
