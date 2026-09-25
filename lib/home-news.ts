export type HomeNewsItem = {
  id: string;
  eyebrow: string;
  title: string;
  titleLines?: string[];
  description: string;
  formatLabel: string;
  category: string;
  videoUrl: string;
  posterUrl: string;
  posterFallbackUrl?: string;
  posterAlt: string;
  publishedAt: string;
  /** Data final opcional. Sem ela, a novidade fica no ar por um mês-calendário. */
  expiresAt?: string;
  tone?: "brand" | "horror";
};

export const HOME_NEWS: HomeNewsItem[] = [
  {
    id: "dont-open-the-door",
    eyebrow: "Novidade · Já disponível",
    title: "DON'T OPEN THE DOOR",
    titleLines: ["DON'T OPEN", "THE DOOR"],
    description: "Um short movie de terror criado pela Cria Frames.",
    formatLabel: "Short movie",
    category: "Terror",
    videoUrl: "https://youtu.be/oMoXCRytkAs",
    posterUrl: "https://img.youtube.com/vi/oMoXCRytkAs/maxresdefault.jpg",
    posterFallbackUrl: "https://img.youtube.com/vi/oMoXCRytkAs/hqdefault.jpg",
    posterAlt: "Cena do short movie de terror DON'T OPEN THE DOOR",
    publishedAt: "2026-09-25T00:00:00-03:00",
    tone: "horror",
  },
];

function addCalendarMonth(date: Date) {
  const next = new Date(date);
  const day = next.getUTCDate();
  next.setUTCDate(1);
  next.setUTCMonth(next.getUTCMonth() + 1);
  const lastDay = new Date(
    Date.UTC(next.getUTCFullYear(), next.getUTCMonth() + 1, 0)
  ).getUTCDate();
  next.setUTCDate(Math.min(day, lastDay));
  return next;
}

export function getHomeNewsExpiry(item: HomeNewsItem) {
  return item.expiresAt ? new Date(item.expiresAt) : addCalendarMonth(new Date(item.publishedAt));
}

export function getActiveHomeNews(now = new Date()) {
  return HOME_NEWS.filter((item) => {
    const publishedAt = new Date(item.publishedAt);
    const expiresAt = getHomeNewsExpiry(item);
    return now >= publishedAt && now < expiresAt;
  }).sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime()
  );
}
