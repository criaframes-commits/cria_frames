export type PortfolioCase = {
  slug: string;
  title: string;
  client: string;
  category: "Motion" | "Filme" | "Campanha";
  year: string;
  duration: string;
  coverSrc: string;
  videoSrc: string;
  context: string;
};

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    slug: "aurora",
    title: "Aurora",
    client: "Cliente A",
    category: "Motion",
    year: "2026",
    duration: "00:38",
    coverSrc: "/hero-poster.jpg",
    videoSrc: "/hero-teaser.mp4",
    context:
      "Uma série de motion criada para apresentar uma nova linguagem de marca nas redes sociais. O projeto combinou direção de arte, geração de imagens e acabamento cinematográfico em um fluxo de produção inteiramente interno.",
  },
  {
    slug: "sinal",
    title: "Sinal",
    client: "Cliente B",
    category: "Filme",
    year: "2026",
    duration: "00:20",
    coverSrc: "/curta-poster.jpg",
    videoSrc: "/curta-trailer.mp4",
    context:
      "Um filme de linguagem documental que explora memória, presença e transformação. A construção passou por roteiro, pesquisa visual, direção de personagens sintéticos e desenho de som original.",
  },
  {
    slug: "origem",
    title: "Origem",
    client: "Cliente C",
    category: "Campanha",
    year: "2026",
    duration: "00:45",
    coverSrc: "/hero-poster.jpg",
    videoSrc: "/hero-teaser.mp4",
    context:
      "Uma campanha integrada desenvolvida do conceito à entrega final. A mesma ideia central foi desdobrada em filme principal, cortes verticais e peças de motion sem perder unidade visual.",
  },
  {
    slug: "pulso",
    title: "Pulso",
    client: "Cliente D",
    category: "Motion",
    year: "2026",
    duration: "00:20",
    coverSrc: "/curta-poster.jpg",
    videoSrc: "/curta-trailer.mp4",
    context:
      "Um lançamento de produto construído em ritmo acelerado, com apenas 48 horas entre briefing e entrega. A peça usa montagem, luz e movimento para transformar velocidade de produção em linguagem criativa.",
  },
];

export const CASE_CATEGORIES = ["Todos", "Motion", "Filme", "Campanha"] as const;

