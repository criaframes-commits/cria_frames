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

// Temporary sample selection for /reels-teste. Replace with the curated vertical
// videos (including their own 9:16 covers) here, without changing the portfolio.
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
