import type { Metadata } from "next";

export const SITE_NAME = "Cria Frames";
export const SITE_URL = "https://criaframes.com.br";
export const SITE_TITLE = "Cria Frames — Estúdio audiovisual com IA";
export const SITE_DESCRIPTION =
  "Estúdio audiovisual de Goiânia especializado em filmes, campanhas, motion design e experiências criadas com inteligência artificial, direção e processo.";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/hero-poster.jpg",
  width: 1280,
  height: 720,
  alt: "Cria Frames — estúdio audiovisual com inteligência artificial",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} — ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: path,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}

export { DEFAULT_SOCIAL_IMAGE };
