# Design System — Cria Frames AI Studio
### Base v1.0 · Definição de direção de arte, tokens e padrões de interação

---

## 0. Como este documento foi construído

Autópsia de 3 fontes antes de qualquer decisão visual:

1. **A marca** — a v1.0 deste documento havia extraído programaticamente os pixels da logo (`criaframeslogo.jpeg`) para aproximar o azul da Cria Frames (`#0044BD`), na ausência de um manual oficial. **Esta revisão substitui essa aproximação pelos valores exatos do Manual de Marca Cria Frames** (páginas 01–02, fonte da verdade definitiva): `#0D47FF` (Azul Cria) e a paleta de neutros oficial — ver Seção 4.1.
2. **As 4 referências** — usei os relatórios `.txt` (leitura de gosto + specs técnicas de layout/tipografia/cor/motion) que vocês já tinham produzido para `wonderstudios.com`, `351studio.com`, `x.ai` e `utopaistudios.com`.
3. **O objetivo comercial** — estúdio de produção com IA, venda B2B/B2C, precisa converter, precisa ser fácil, precisa parecer caro.

A regra que guiou toda curadoria: **nenhum elemento entra no sistema só porque existe em uma referência.** Cada peça abaixo tem uma justificativa amarrada à marca ou à conversão. O que não passou nesse teste foi cortado (Seção 3 mostra o que foi descartado e por quê).

---

## 1. Etapa 1 — Auditoria da marca (fonte da verdade)

A logo não é só um símbolo pra header. Ela já contém a tese do site inteiro:

| Elemento da logo | Leitura | O que isso vira no site |
|---|---|---|
| Refletor de estúdio (spot light) | O produto é literalmente "iluminar" conteúdo/ideias | Padrão de interação assinatura: um item em destaque, o resto apagado — ver Seção 4.6 |
| Feixe de luz azul saindo do refletor | Luz cortando o escuro | Tema escuro como base, azul como única cor que "acende" |
| "CRIA" em caixa alta, condensada, peso pesado, borda irregular (spray) | Energia crua, feito à mão, cinematográfico | Tipografia display bold/condensada para títulos de impacto |
| "— F R A M E S —" com hífen-travessão de cada lado, tracking largo, peso leve | Contraponto refinado ao peso do "CRIA" | Padrão de "etiqueta"/eyebrow reutilizado em todo o site (rótulos de seção, badges, nav) |
| Fundo branco puro | A marca também respira em ambiente claro | Seções claras alternadas para conteúdo comercial (Seção 4.1) |

### Cores oficiais (Manual de Marca Cria Frames, pág. 01 — fonte da verdade)

```
Azul Cria ............... #0D47FF   RGB 13, 71, 255    CMYK 90, 70, 0, 0
Preto Profundo .......... #0A0A0A   RGB 10, 10, 10     CMYK 0, 0, 0, 100
Cinza Grafite ............ #1A1A1A   RGB 26, 26, 26     CMYK 0, 0, 0, 90
Cinza Claro .............. #EDEDED   RGB 237, 237, 237  CMYK 0, 0, 0, 10
Branco ................... #FFFFFF   RGB 255, 255, 255  CMYK 0, 0, 0, 0
```

Esses 5 valores são o *primitivo oficial* de onde toda a paleta deriva (Seção 4.1). Qualquer tom adicional da escala (tints/shades para hover, canvas, texto secundário etc.) é **derivado matematicamente** destes 5 — nunca inventado — e está marcado como "estendido" na Seção 4.1 para deixar claro o que é manual e o que é extensão de UI.

---

## 2. Etapa 2 — Auditoria das 4 referências

Resumo do que cada site contribui de mais forte, extraído dos relatórios anexados:

| Site | Força principal | Por que interessa à Cria Frames |
|---|---|---|
| **Wonder Studios** | Hero em vídeo full-screen, cursor customizado, cards de vídeo que só tocam quando visíveis, alternância preto/branco por seção | Estúdio de IA vende qualidade de imagem/vídeo — o hero precisa *provar* isso em 2 segundos, não descrever |
| **351 Studio** | Título condensado bold com contorno (igual à logo!), máscara circular que segue o cursor, laranja sobre preto de alto contraste | É o parente tipográfico mais próximo da nossa própria logo — mesma família de peso/condensação |
| **x.ai** | Disciplina: whitespace generoso, microinterações curtas, contador numérico, uma única cor de destaque usada cirurgicamente | É a prova de que "clean" e "grandioso" cabem no mesmo layout — modelo de restrição comercial |
| **Utopai Studios** | Scroll-driven spotlight: um card aceso por vez, os outros escurecidos, texto lateral sincronizado | Mecânica de UI que é *literalmente* a logo da Cria Frames em movimento |

### Decisão de curadoria (o que entra, o que não entra)

| Elemento avaliado | Origem | Entra no v1? | Motivo |
|---|---|---|---|
| Hero em vídeo full-bleed, autoplay/mute | Wonder | ✅ Sim | Prova a qualidade do trabalho antes de qualquer texto — melhor gancho comercial possível |
| Card de vídeo que só reproduz quando visível | Wonder | ✅ Sim | Performance + elegância, zero custo de complexidade |
| Alternância de seções escuro/claro | Wonder | ✅ Sim | Resolve a tensão "grandioso vs. fácil de ler" do briefing |
| Scroll horizontal dentro do vertical (scroll-jacking) | Wonder | ⚠️ Adaptado | Trocado por carrossel nativo com `scroll-snap` — mesmo efeito visual, sem sequestrar o scroll do usuário (acessibilidade e mobile) |
| Tipografia condensada bold/uppercase | 351 Studio | ✅ Sim | É o parente direto da própria logo |
| Máscara circular seguindo o cursor no título | 351 Studio | ⚠️ Opcional, só desktop | Bonito, mas não pode ser a única forma de "ler" o título — mantido como enhancement progressivo, nunca essencial |
| Card flutuante que persegue o cursor (magnetic) | 351 Studio | ❌ Fora do v1 | Risco de parecer "gimmick" e não tem equivalente direto em touch — o briefing pede clareza, não truque |
| Assistente de IA embutido no site | 351 Studio | 🔜 Fase 2 | Estrategicamente perfeito pra marca ("somos uma equipe de criação com IA"), mas é decisão de produto, não de design system v1 |
| Espaço em branco generoso + 1 cor de destaque cirúrgica | x.ai | ✅ Sim | Base do princípio "grandioso sem confuso" |
| Contador numérico (métricas subindo no scroll) | x.ai | ✅ Sim | Prova social direta = conversão |
| Hover com "sheen" diagonal nos cards | x.ai | ✅ Sim | Custo baixíssimo, efeito de "acabamento premium" |
| Dropdown com fade + slide | x.ai | ✅ Sim | Padrão de nav testado e sóbrio |
| Card em destaque via scroll, resto escurecido | Utopai | ✅ Sim — **elemento assinatura** | Reencena a logo (refletor aceso) como mecânica de interface real |
| Tipografia serifada editorial | Utopai | ❌ Fora | Contradiz a família tipográfica da própria logo (sans condensada). Manter só uma linguagem de tipo evita a marca parecer "duas empresas diferentes" |
| Scroll suavizado (Lenis) | Utopai / todas | ✅ Sim | Convergência das 4 referências — validação forte que é o padrão certo |

---

## 3. Etapa 3 — Tese de direção de arte

> **"A luz encontra o trabalho certo."**
> O site é majoritariamente escuro — um palco — e a única cor que acende é o azul da Cria Frames. Cada momento de destaque (um card de portfólio, uma métrica, um CTA) literalmente *ganha luz* enquanto o resto recua. Seções de conversão (processo, planos, contato) trocam para um branco de estúdio — claro, direto, sem fricção — porque decisão de compra não deve competir com atmosfera.

Isso não é o "fundo preto + 1 accent" genérico de design gerado por IA por padrão — é derivado matematicamente do pixel real da logo e da metáfora literal do objeto que ela representa (um refletor). O sistema teria ficado diferente se a logo fosse outra coisa.

**Dois modos, um sistema:**
- **Modo Cinema** (escuro) → hero, portfólio/reels, storytelling de marca, cases
- **Modo Estúdio** (claro) → como funciona, planos/preços, formulário de contato, FAQ, prova social densa

---

## 4. Etapa 4 — Arquitetura de tokens (Primitivo → Semântico → Componente)

### 4.1 Cor

**Primitivos** (valores brutos — nunca usados direto em componentes). Os marcados 🔒 são exatamente os 5 valores do Manual de Marca; os marcados ⚙️ são extensões de UI derivadas deles (tints/shades matemáticos, não cores novas):

```css
/* Neutros */
--black-950: #060606;  /* ⚙️ shade de Preto Profundo — canvas do Modo Cinema, mais fundo que texto */
--black-900: #0A0A0A;  /* 🔒 PRETO PROFUNDO (manual) */
--black-800: #141414;  /* ⚙️ intermediário entre Preto Profundo e Cinza Grafite */
--black-700: #1A1A1A;  /* 🔒 CINZA GRAFITE (manual) */
--white-000: #FFFFFF;  /* 🔒 BRANCO (manual) */
--white-050: #F7F7F5;  /* ⚙️ tint quente de Branco — superfícies do Modo Estúdio */
--gray-600:  #6B7280;  /* ⚙️ extensão — texto secundário sobre Cinza Claro, cobre o "meio-tom" que o manual não define */
--gray-400:  #9AA3AF;  /* ⚙️ extensão — bordas/ícones inativos */
--gray-200:  #EDEDED;  /* 🔒 CINZA CLARO (manual) */

/* Azul de marca — valor exato do manual, escala derivada matematicamente dele */
--blue-900: #092FA8;  /* ⚙️ shade (mix 34% preto) — hover/pressed em fundo claro */
--blue-700: #0D47FF;  /* 🔒 AZUL CRIA (manual) — valor oficial, não aproximado */
--blue-500: #3D6CFF;  /* ⚙️ tint (mix 20% branco) — "elétrico", interativo em fundo escuro */
--blue-300: #6E91FF;  /* ⚙️ tint (mix 40% branco) — "céu", texto/ícone acessível em fundo escuro */
--blue-100: #E2E9FF;  /* ⚙️ tint (mix 88% branco) — hover/badge em fundo claro */
```

**Semânticos** (o que cada cor *significa*):

```css
/* Modo Cinema (escuro) */
--bg-canvas:        var(--black-950);
--bg-surface:        var(--black-900);
--bg-elevated:       var(--black-800);
--text-primary:      var(--white-000);
--text-secondary:    rgba(255,255,255,.65);
--border-subtle:     rgba(255,255,255,.08);
--accent-interactive: var(--blue-500);   /* CTAs, links, focus em fundo escuro */
--accent-text:        var(--blue-300);   /* texto/ícone azul em fundo escuro */

/* Modo Estúdio (claro) */
--bg-canvas-light:     var(--white-000);
--bg-surface-light:    var(--white-050);
--text-primary-light:  var(--black-950);
--text-secondary-light: var(--gray-600);
--border-light:         var(--gray-200);
--accent-primary:       var(--blue-700); /* CTAs, links, ícones em fundo claro */
--accent-tint:          var(--blue-100); /* hover/backgrounds sutis */
```

> ⚠️ **Regra de contraste (validada, não estética — recalculada para o Azul Cria oficial `#0D47FF`):** `--blue-700` tem contraste de **6.3:1** sobre branco — passa AA confortavelmente — mas apenas **3.2:1** sobre `--black-950` — reprovado (WCAG exige 4.5:1 para texto normal). **Nunca use `--blue-700` como cor de texto em fundo escuro.** Para isso existe `--blue-500` (4.6:1, ok para texto grande/UI) e `--blue-300` (6.9:1, ok para texto normal) — ambos derivados do Azul Cria oficial, recalibrados nesta revisão para manter exatamente os mesmos patamares de acessibilidade da v1.0. Isso vale para todo o time: front-end não escolhe azul "no olho", escolhe pelo token semântico certo.

**Componente** (exemplo — botão primário):

```css
--button-primary-bg:          var(--accent-interactive); /* contexto escuro */
--button-primary-bg-light-ctx: var(--accent-primary);     /* contexto claro */
--button-primary-text:        var(--white-000);
--button-primary-bg-hover:    var(--blue-300);
--button-primary-radius:      var(--radius-pill);
```

### 4.2 Tipografia

**Atualização de conformidade parcial:** o Manual de Marca (pág. 01) define duas famílias oficiais — **Antiga** (principal: pesada, condensada, impactante, cinematográfica) e **Montserrat** (secundária: moderna, limpa, legível, para textos de apoio e comunicação institucional). A v1.0 deste sistema já usava duas famílias com exatamente essa mesma lógica de contraste de peso (Archivo bold/condensado vs. Inter leve). Nesta revisão, **a maioria do sistema é mantida** — só a secundária muda, por ser a troca de maior conformidade com menor risco:

| Papel | Fonte (v1.0) | Fonte (atualizada) | Peso | Uso |
|---|---|---|---|---|
| **Display** | Archivo (Black/ExtraBold) | **Archivo — mantido** | 800–900 | H1, hero, números de métrica, headlines de seção — a "voz CRIA" |
| **Corpo/UI** | Inter | **Montserrat** | 400–600 | Parágrafos, botões, navegação, formulários |
| **Label/Eyebrow** | Inter | **Montserrat** | 500–600, uppercase, tracking +0.1em | Rótulos de seção — **reaproveita o padrão "— FRAMES —" da logo**: ex. `— SERVIÇOS —`, `— COMO FUNCIONA —` |

**Por que o Display não vira Antiga:** Archivo já cobre o mesmo caráter descrito no manual para a tipografia principal (pesada/condensada/impactante/cinematográfica) e é a peça com maior superfície de uso no site — headlines, hero, métricas. Trocá-la significaria hospedar uma fonte de exibição sem variable font comprovada, sem garantia dos mesmos pesos/idiomas já usados no site, por um ganho de conformidade que já é atendido no espírito. Antiga permanece a referência oficial para peças estáticas de marca (a própria logo, materiais impressos, thumbnails) — não é substituída, é reservada ao seu uso original.

**Por que Corpo/UI e Label viram Montserrat:** o manual nomeia Montserrat explicitamente para exatamente esses usos ("textos de apoio, informações e comunicação institucional"). É uma troca de baixo risco — Montserrat e Inter são ambas grotescas humanistas de x-height alta, mesma faixa de pesos (400–600), disponível como variable font — e fecha 100% a lacuna de conformidade tipográfica sem alterar a "voz" de impacto do site, que mora no Display.

**Escala fluida (mobile → desktop):**

```css
--text-display:  clamp(2.75rem, 2rem + 4vw, 5.5rem);   /* H1 / hero */
--text-h2:        clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
--text-h3:        clamp(1.375rem, 1.2rem + 1vw, 2rem);
--text-lede:       clamp(1.125rem, 1rem + 0.4vw, 1.375rem); /* subheadline */
--text-body:       1rem;      /* 16px base — nunca menor em texto de leitura */
--text-caption:    0.8125rem; /* 13px — só para labels/meta, nunca corpo de texto */
--text-metric:     clamp(2.5rem, 2rem + 3vw, 4.5rem); /* contadores */

--leading-tight: 1.05;  /* display */
--leading-base:  1.6;   /* corpo */
--tracking-label: 0.1em;
--tracking-display: -0.01em;
```

### 4.3 Espaçamento & grid

Grid de 12 colunas, container máximo **1320px** (ponto de convergência entre Utopai e Wonder), base 8px.

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 24px;  --space-6: 32px;  --space-8: 48px;  --space-10: 64px;
--space-14: 96px; --space-20: 140px; /* respiro entre seções, escuro→claro */

--container-max: 1320px;
--gutter-desktop: 24px;
--gutter-mobile: 16px;
```

**Breakpoints (mobile-first):**
```
sm: 480px   md: 768px   lg: 1024px   xl: 1280px   2xl: 1440px
```

### 4.4 Raio & elevação

```css
--radius-sm: 8px;      /* inputs, chips pequenos */
--radius-md: 14px;     /* cards */
--radius-lg: 20px;     /* blocos grandes, modais */
--radius-pill: 999px;  /* botões CTA, badges — eco do feixe cônico da logo */

--shadow-soft: 0 20px 40px rgba(0,0,0,.06); /* só em Modo Estúdio (claro) */
/* Modo Cinema NUNCA usa sombra pesada — profundidade vem de brilho/opacidade, não de shadow (achado consistente nas 4 referências) */
```

### 4.5 Motion

```css
--duration-instant: 120ms;   /* hover, tap feedback */
--duration-fast: 200ms;      /* dropdown, toggle */
--duration-base: 320ms;      /* troca de estado de card, reveal */
--duration-slow: 600ms;      /* entrada de seção (fade-up) */
--duration-cinematic: 1000ms; /* sequência de abertura do hero */

--ease-out: cubic-bezier(0.22, 1, 0.36, 1);   /* padrão para 90% das transições */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);  /* crossfades */
```

Regra geral: **sem overshoot, sem bounce.** As 4 referências convergem em easings desacelerados — isso é o que lê como "premium" em vez de "gamificado". Toda animação respeita `prefers-reduced-motion` (troca para crossfade simples de 150ms, sem parallax/scroll-jacking).

### 4.6 Elemento assinatura — "Scroll Holofote"

A peça central do sistema. Vem direto da Utopai, mas ganha significado extra por ser literalmente a logo em ação:

- Lista vertical de cards (portfólio/reels).
- Conforme o scroll, **um card por vez** recebe `opacity: 1` + `brightness: 1`; os demais vão para `opacity: 0.3` + `brightness: 0.55`.
- Texto lateral (nome do case, cliente, resultado) faz crossfade sincronizado com o card ativo — nunca dois textos visíveis ao mesmo tempo.
- Implementação: `IntersectionObserver` (zero dependência) ou `GSAP ScrollTrigger` se o time já usar GSAP em outro lugar do site.
- Transição: `var(--duration-base)` com `var(--ease-out)`.

Esse é o momento "grandioso" do site. Justamente por isso, ele **não se repete** em outras seções — usar o mesmo truque duas vezes destrói o impacto.

---

## 5. Etapa 5 — Componentes base (specs)

| Componente | Default | Hover | Active/Foco | Notas |
|---|---|---|---|---|
| **Botão primário** | bg `accent`, texto branco, radius pill, padding 14×28px | `translateY(-1px)` + bg `blue-300`, 180ms | outline 2px `accent-text`, offset 2px | alvo de toque mín. 44×44px |
| **Botão secundário** | borda 1px `border-subtle/border-light`, texto `text-primary` | bg sutil `accent-tint` (5–8% opacidade) | mesmo outline do primário | — |
| **Card de vídeo/portfólio** | thumbnail estática, radius `md` | `translateY(-6px)` + sheen diagonal 500ms | estado "aceso" do Scroll Holofote (Seção 4.6) | vídeo só carrega/toca quando 40%+ visível |
| **Badge/Eyebrow** | uppercase, `text-caption`, tracking `+0.1em`, flanqueado por `—` | — | — | replica o padrão "— FRAMES —" da logo |
| **Nav / Dropdown** | fundo `bg-elevated` com blur leve | entrada fade + `translateY(8px)`, 240ms, itens com stagger de 40ms | — | não usar `backdrop-filter` pesado (blur > 16px) |
| **Contador de métrica** | `text-metric`, tabular-nums | ativa ao entrar 40% no viewport | — | `easeOutCubic`, 1.2–2s |
| **Formulário (contato/orçamento)** | label sempre visível (nunca só placeholder), erro inline abaixo do campo | — | outline `accent-text` | usar primitivas shadcn/ui + Radix para acessibilidade de teclado/screen reader "de fábrica" |

---

## 6. Etapa 6 — Acessibilidade & performance (não negociável)

1. Contraste mínimo 4.5:1 em texto normal, 3:1 em texto grande/UI — usar sempre os tokens semânticos da Seção 4.1, nunca hex solto.
2. Alvo de toque mínimo 44×44px, espaçamento mínimo 8px entre alvos interativos.
3. `prefers-reduced-motion`: desliga Scroll Holofote, parallax e scroll suavizado → substitui por fade simples.
4. Cursor customizado (se usado no hero) é **progressive enhancement**: só desktop, com `pointer: fine`; nunca some o cursor nativo em touch.
5. Vídeo: `autoplay muted loop playsinline`, poster obrigatório, carregamento via `preload="metadata"` + `IntersectionObserver`, nunca autoplay com som.
6. Fontes via `next/font` (self-hosted, `font-display: swap`), subset latin, sem carregar pesos não usados.
7. Sem CLS: todo card/imagem/vídeo reserva proporção via `aspect-ratio` antes de carregar.

---

## 7. Etapa 7 — Stack de implementação recomendada

As 4 análises de referência convergiram, de forma independente, praticamente na mesma stack — isso é sinal forte de que é o caminho certo, não só preferência:

```
Framework:      Next.js (React) + TypeScript
Estilo:         Tailwind CSS, tokens deste documento como @theme / CSS variables
Componentes:    shadcn/ui (Radix) — acessibilidade de formulário/modal/nav de fábrica
Motion (UI):    Framer Motion — hovers, dropdowns, transições de estado
Motion (scroll): GSAP + ScrollTrigger — Scroll Holofote, reveals de seção
Scroll suave:   Lenis
Ícones:         Lucide (SVG, não emoji)
```

Regras de performance de código (Vercel React best practices, aplicadas):
- GSAP/Lenis carregados via `next/dynamic` (import só quando o componente entra em viewport) — não vai no bundle inicial.
- Vídeos e fontes tratados como I/O estático hoisted, nunca recarregados por render.
- Nenhum componente pesado de animação renderiza no server; usar `"use client"` só onde motion realmente acontece.

---

## 8. Etapa 8 — Próximos passos

1. **Validar esta base com o time** — travar paleta, tipografia e o Scroll Holofote antes de qualquer wireframe (evita retrabalho).
2. **Wireframe de baixa fidelidade** das páginas-chave: Home (hero vídeo → Scroll Holofote de cases → prova social → CTA), Serviços, Planos/Preços, Contato.
3. **Protótipo de alta fidelidade** de 2 telas críticas (Home + 1 página de conversão) para testar o sistema em contexto real antes de generalizar para o site inteiro.
4. **Gerar `tokens.css`** a partir das tabelas da Seção 4 (posso gerar isso agora, se quiser, já como arquivo pronto pra importar no Tailwind).
5. **Protótipo funcional do Scroll Holofote isolado** — validar performance/UX antes de plugar no site real.

---

*Documento vivo — esta é a base v1.0. Ajustes de paleta/tipografia devem ser feitos aqui primeiro, nunca direto no código, para o sistema não divergir da fonte da verdade.*
