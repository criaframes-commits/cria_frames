import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/metadata";
import { STUDIO_SERVICES } from "@/lib/studio-services";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const GLOBAL_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: "CRIA Frames",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: "cria@criaframes.com.br",
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/cria-frames-logo-preta.svg`,
        contentUrl: `${SITE_URL}/cria-frames-logo-preta.svg`,
        caption: SITE_NAME,
      },
      image: `${SITE_URL}${DEFAULT_SOCIAL_IMAGE.url}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Goiânia",
        addressRegion: "GO",
        addressCountry: "BR",
      },
      sameAs: [
        "https://www.instagram.com/cria_frames/",
        "https://www.tiktok.com/@criaframes",
        "https://www.youtube.com/@CriaFrames",
      ],
      knowsAbout: [
        "Produção audiovisual com inteligência artificial",
        "Direção criativa",
        "Motion design",
        "Campanhas publicitárias",
        "Filmes de marca",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços audiovisuais",
        itemListElement: STUDIO_SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: `${SITE_URL}/servicos#${service.id}`,
            provider: { "@id": ORGANIZATION_ID },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "pt-BR",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
