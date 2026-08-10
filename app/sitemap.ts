import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-projects";
import { TEAM_MEMBERS } from "@/lib/team-members";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/hero-poster.jpg"), absoluteUrl("/curta-poster.jpg")],
    },
    {
      url: absoluteUrl("/projetos"),
      changeFrequency: "weekly",
      priority: 0.9,
      images: PORTFOLIO_PROJECTS.map((project) =>
        absoluteUrl(project.coverSrc),
      ),
    },
    {
      url: absoluteUrl("/projetos/ronaldo-caiado"),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        absoluteUrl("/curta-poster.jpg"),
        ...Array.from({ length: 5 }, (_, index) =>
          absoluteUrl(
            `/projetos/ronaldo-caiado/galeria/${String(index + 1).padStart(2, "0")}.jpg`,
          ),
        ),
      ],
    },
    {
      url: absoluteUrl("/servicos"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/sobre"),
      changeFrequency: "monthly",
      priority: 0.8,
      images: TEAM_MEMBERS.map((member) => absoluteUrl(member.imageSrc)),
    },
    {
      url: absoluteUrl("/contato"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const teamPages: MetadataRoute.Sitemap = TEAM_MEMBERS.map((member) => ({
    url: absoluteUrl(`/sobre/equipe/${member.id}`),
    changeFrequency: "monthly",
    priority: 0.6,
    images: [absoluteUrl(member.imageSrc)],
  }));

  return [...mainPages, ...teamPages];
}
