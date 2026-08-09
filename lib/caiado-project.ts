export const CAIADO_PREMIERE_DATE = new Date(
  "2026-08-10T12:00:00-03:00"
);

export const CAIADO_FEATURE_END_DATE = new Date(
  "2026-09-10T12:00:00-03:00"
);

// Cole entre as aspas o link completo do curta publicado no YouTube.
export const CAIADO_FULL_FILM_YOUTUBE_URL = "https://youtu.be/0MMWWu1OuDI";

export const CAIADO_ASSETS = {
  poster: "/curta-poster.jpg",
  trailer: "/curta-trailer.mp4",
  processVideos: [
    "/projetos/ronaldo-caiado/processo/01-pesquisa-e-roteiro.mp4",
    "/projetos/ronaldo-caiado/processo/02-direcao-de-arte.mp4",
    "/projetos/ronaldo-caiado/processo/03-cinema-com-ia.mp4",
  ],
  galleryImages: [
    "/projetos/ronaldo-caiado/galeria/01.jpg",
    "/projetos/ronaldo-caiado/galeria/02.jpg",
    "/projetos/ronaldo-caiado/galeria/03.jpg",
    "/projetos/ronaldo-caiado/galeria/04.jpg",
    "/projetos/ronaldo-caiado/galeria/05.jpg",
  ],
} as const;

export function getYouTubeId(url: string) {
  if (!url.trim()) return null;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (parsedUrl.hostname.endsWith("youtube.com")) {
      return (
        parsedUrl.searchParams.get("v") ??
        parsedUrl.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1] ??
        null
      );
    }
  } catch {
    return null;
  }

  return null;
}
