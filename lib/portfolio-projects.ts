export type PortfolioProject = {
  slug: string;
  title: string;
  client?: string;
  category: "Motion" | "Filme" | "Campanha" | "Especial";
  year: string;
  duration: string;
  coverSrc: string;
  youtubeId?: string;
  specialHref?: string;
  featured?: boolean;
  previewVideoSrc?: string;
  summary: string;
  context: string;
  memberIds: string[];
  teaser?: {
    youtubeId?: string;
    src?: string;
    label: "Teaser" | "Trailer";
    availableFrom?: string;
  };
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: "ronaldo-caiado",
    title: "Ronaldo Caiado",
    category: "Especial",
    year: "2026",
    duration: "01:23",
    coverSrc: "/curta-poster.jpg",
    specialHref: "/projetos/ronaldo-caiado",
    featured: true,
    summary:
      "Um curta sobre a trajetória de Ronaldo Caiado, construído inteiramente com inteligência artificial e direção cinematográfica.",
    context:
      "Um projeto especial sobre a trajetória pública de Ronaldo Caiado, ex-governador de Goiás e candidato à Presidência. O filme combina pesquisa, roteiro, direção de arte e geração com inteligência artificial em uma narrativa concebida frame a frame.",
    memberIds: [],
    teaser: {
      src: "/curta-trailer.mp4",
      label: "Trailer",
      availableFrom: "2026-08-09T12:00:00-03:00",
    },
  },
  {
    slug: "ai-when-its-directed",
    title: "AI WHEN IT'S DIRECTED",
    category: "Filme",
    year: "2026",
    duration: "01:28",
    coverSrc: "/projetos/ai-when-its-directed.jpg",
    youtubeId: "IIYZ9oxeLs0",
    summary:
      "Um manifesto visual sobre o que acontece quando a inteligência artificial deixa de operar no acaso e passa a responder a uma direção.",
    context:
      "Um manifesto visual sobre o que acontece quando a inteligência artificial deixa de operar no acaso e passa a responder a uma direção. Conceito, decupagem, enquadramento e ritmo conduzem cada cena para transformar geração em linguagem.",
    memberIds: ["membro-01", "membro-02"],
  },
  {
    slug: "showreel-cria-frames",
    title: "Showreel - CRIA FRAMES",
    category: "Motion",
    year: "2026",
    duration: "01:11",
    coverSrc: "/projetos/showreel-cria-frames.jpg",
    youtubeId: "e7cgHPI8wFo",
    summary:
      "Um recorte das narrativas, personagens e mundos que a Cria Frames construiu com IA, cinema e direção cena a cena.",
    context:
      "Esse é o primeiro estúdio audiovisual de inteligência artificial do Centro-Oeste brasileiro. Aqui você vê um recorte do que construímos até agora — narrativas, personagens e mundos criados inteiramente com IA, desde o roteiro até a finalização. Cada projeto nasce de um método próprio: pré-produção real, decupagem, referência visual e direção cena a cena — não geração aleatória. A CRIA existe para provar que cinema e publicidade de qualidade não precisam de milhões de reais nem de um estúdio de Hollywood para nascer. Precisam de método, visão e as ferramentas certas. De Goiânia para o mundo.",
    memberIds: [
      "membro-01",
      "membro-02",
      "membro-03",
      "membro-04",
      "membro-05",
    ],
  },
  {
    slug: "a-ultima-corrida",
    title: "A ÚLTIMA CORRIDA",
    category: "Filme",
    year: "2026",
    duration: "01:42",
    coverSrc: "/projetos/a-ultima-corrida.jpg",
    youtubeId: "02E2CBlujiI",
    summary:
      "Nosso primeiro curta construído do zero, realizado quando a Cria ainda estava em fase de desenvolvimento.",
    context:
      "Nosso primeiro curta construído do zero. O filme foi realizado quando a Cria ainda estava em fase de desenvolvimento e marca o começo do método que hoje orienta nossas produções.",
    memberIds: ["membro-01", "membro-02"],
    teaser: {
      youtubeId: "Vt6mhTzzRwM",
      label: "Teaser",
    },
  },
  {
    slug: "o-craque",
    title: "O CRAQUE",
    category: "Filme",
    year: "2026",
    duration: "01:22",
    coverSrc: "/projetos/o-craque.jpg",
    youtubeId: "jZ-FLlGrVq8",
    summary:
      "Um dos primeiros curtas que produzimos, ainda na fase de testes da Cria Frames.",
    context:
      "Um dos primeiros curtas que produzimos, ainda na fase de testes da Cria Frames. O projeto registra um momento de experimentação em que linguagem, ritmo e direção começaram a encontrar a forma do estúdio.",
    memberIds: ["membro-01"],
  },
];

export const MEMBER_PROFILE_PROJECTS: Record<string, PortfolioProject[]> = {
  "membro-04": [
    {
      slug: "site-cria-frames",
      title: "Site Cria Frames",
      category: "Especial",
      year: "2026",
      duration: "Web",
      coverSrc: "/hero-poster.jpg",
      previewVideoSrc: "/projetos/site-cria-frames/site-showreel.mp4",
      specialHref: "/",
      summary:
        "O site institucional da Cria Frames, criado para transformar o portfólio do estúdio em uma experiência digital cinematográfica.",
      context:
        "Projeto digital desenvolvido para apresentar a Cria Frames, seus serviços, projetos e equipe com clareza, acessibilidade e uma direção visual coerente com o estúdio. A experiência combina catálogo escalável, interações responsivas, movimento e narrativa visual.",
      memberIds: ["membro-04"],
    },
  ],
};

export const PROJECT_CATEGORIES = [
  "Todos",
  "Motion",
  "Filme",
  "Campanha",
  "Especial",
] as const;
