export const CAIADO_FEATURE_END_DATE = new Date(
  "2026-09-10T12:00:00-03:00"
);

// Link do curta completo exibido na sessão cinematográfica do projeto.
export const CAIADO_FULL_FILM_YOUTUBE_URL = "https://youtu.be/0MMWWu1OuDI";

// Trailer oficial hospedado no YouTube para evitar servir o arquivo pesado pelo site.
export const CAIADO_TRAILER_YOUTUBE_ID = "9T2EJB8HLIU";

export const CAIADO_ASSETS = {
  poster: "/curta-poster.jpg",
  trailerYoutubeId: CAIADO_TRAILER_YOUTUBE_ID,
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
