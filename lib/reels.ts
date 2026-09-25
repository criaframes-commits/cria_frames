import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-projects";

export type Reel = {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  description: string;
  cover: string;
  duration: string;
};

// The studio has not published Shorts yet. Both routes clearly label this sample
// selection. Once Shorts are available, replace REELS with the curated entries
// (and 9:16 covers), then set REELS_ARE_PREVIEW to false.
export const REELS_ARE_PREVIEW = true;

export const REELS: Reel[] = PORTFOLIO_PROJECTS.flatMap((project) =>
  project.youtubeId ? [{
    id: project.slug,
    youtubeId: project.youtubeId,
    title: project.title,
    category: project.category,
    description: project.summary,
    cover: project.coverSrc,
    duration: project.duration,
  }] : []
);
