export type StudioService = {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  deliverables: readonly string[];
  examples: readonly string[];
};

export const STUDIO_SERVICES: readonly StudioService[] = [
  {
    id: "video-com-ia",
    title: "Vídeo com IA",
    description:
      "Criamos narrativas audiovisuais do conceito à finalização. A IA amplia as possibilidades de produção; direção, ritmo e intenção continuam guiando cada escolha.",
    videoSrc: "/hero-teaser.mp4",
    deliverables: [
      "Conceito e roteiro",
      "Direção de IA",
      "Geração de imagem e vídeo",
      "Montagem e finalização",
    ],
    examples: ["Filme de marca", "Teaser", "Social film"],
  },
  {
    id: "motion-design",
    title: "Motion Design",
    description:
      "Transformamos identidade, informação e conceito em movimento. O projeto pode nascer como uma peça única ou como um sistema preparado para diferentes formatos.",
    videoSrc: "/hero-teaser.mp4",
    deliverables: [
      "Direção de arte",
      "Styleframes",
      "Animação 2D e 3D",
      "Sound design",
    ],
    examples: ["Brand film", "Abertura", "Peças para redes"],
  },
  {
    id: "campanha-completa",
    title: "Campanha completa",
    description:
      "Pensamos a campanha como um conjunto, não como uma soma de entregas. Conceito, produção e desdobramentos avançam juntos para manter consistência em todos os pontos de contato.",
    videoSrc: "/hero-teaser.mp4",
    deliverables: [
      "Conceito criativo",
      "Plano de peças",
      "Produção multiformato",
      "Desdobramentos",
    ],
    examples: ["Lançamento", "Campanha institucional", "Conteúdo always-on"],
  },
  {
    id: "consultoria-criativa",
    title: "Consultoria criativa",
    description:
      "Entramos antes da produção para organizar linguagem, ferramentas e fluxo. É uma forma direta de testar caminhos e tomar decisões com mais clareza.",
    videoSrc: "/hero-teaser.mp4",
    deliverables: [
      "Diagnóstico criativo",
      "Workshop com a equipe",
      "Prototipagem visual",
      "Plano de produção",
    ],
    examples: ["Sprint criativo", "Pesquisa de linguagem", "Fluxo com IA"],
  },
];
