export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  profile: string;
  specialties: string[];
  socials: Array<{
    label: string;
    href: string;
  }>;
  imageSrc: string;
  imagePosition: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "membro-01",
    name: "João Victor Duarte",
    role: "Direção criativa",
    bio: "Transforma briefings em conceitos fortes e conduz a linguagem criativa dos projetos do primeiro rascunho ao último frame.",
    profile:
      "João Victor Duarte atua na direção criativa da Cria Frames. Conecta estratégia, roteiro e linguagem visual para transformar cada briefing em uma ideia clara, acompanhando as decisões criativas do conceito ao acabamento final.",
    specialties: ["Conceito", "Direção", "Narrativa"],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/_duartez_edits/",
      },
    ],
    imageSrc: "/membros/foto_perfil_joao.jpg",
    imagePosition: "50% 48%",
  },
  {
    id: "membro-02",
    name: "Amanda Bueno Santos",
    role: "Direção criativa",
    bio: "Desenvolve conceitos e narrativas visuais, alinhando intenção, estética e consistência em cada etapa da produção.",
    profile:
      "Amanda Bueno Santos integra a direção criativa da Cria Frames. Atua na construção de conceitos, narrativas e referências visuais, garantindo que cada escolha responda ao objetivo do projeto e preserve sua identidade até a entrega.",
    specialties: ["Direção", "Linguagem visual", "Narrativa"],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/create.bueno/",
      },
    ],
    imageSrc: "/membros/foto_perfil_amanda.jpg",
    imagePosition: "50% 44%",
  },
  {
    id: "membro-03",
    name: "Luan Othávio",
    role: "Pré-produção",
    bio: "Prepara o terreno de cada produção, organizando pesquisa, referências e necessidades antes das câmeras e dos frames entrarem em cena.",
    profile:
      "Luan Othávio faz parte da pré-produção da Cria Frames. Organiza pesquisa, referências, materiais e necessidades de execução para que a equipe chegue à produção com decisões claras e um caminho viável.",
    specialties: ["Pesquisa", "Planejamento", "Pré-produção"],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/luanleal494/",
      },
    ],
    imageSrc: "/membros/foto_perfil_luan.jpg",
    imagePosition: "44% 48%",
  },
  {
    id: "membro-04",
    name: "Julia Pinheiro",
    role: "Pré-produção · Suporte e TI",
    bio: "Conecta pré-produção e tecnologia, organizando recursos, antecipando gargalos e dando suporte para o fluxo criativo avançar sem ruído.",
    profile:
      "Julia Pinheiro atua na pré-produção e também responde pelas frentes de suporte e TI da Cria Frames. Prepara recursos, organiza ferramentas e resolve os pontos técnicos que mantêm a equipe conectada e o processo funcionando com estabilidade.",
    specialties: ["Pré-produção", "Suporte", "TI"],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/opsjuli_/",
      },
      {
        label: "GitHub",
        href: "https://github.com/juliaPinheiroSantos",
      },
    ],
    imageSrc: "/membros/foto_perfil_julia.jpg",
    imagePosition: "50% 46%",
  },
  {
    id: "membro-05",
    name: "Gabriela Duarte",
    role: "Comercial e administração financeira",
    bio: "Conduz o relacionamento comercial e organiza a frente financeira, aproximando cada oportunidade da estrutura necessária para acontecer.",
    profile:
      "Gabriela Duarte é representante comercial e administradora financeira da Cria Frames. Faz a ponte entre clientes e equipe, acompanha oportunidades e cuida da organização financeira para que cada projeto avance com clareza, responsabilidade e boas condições de execução.",
    specialties: ["Comercial", "Relacionamento", "Financeiro"],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/ggabiluizaa/",
      },
    ],
    imageSrc: "/membros/foto_perfil_gabriela.jpg",
    imagePosition: "50% 48%",
  },
];
