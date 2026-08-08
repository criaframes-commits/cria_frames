# Cria Frames AI Studio — instruções de projeto

Este projeto já tem design system, tokens e wireframes travados. Este arquivo existe
pra você (Claude Code) não redesenhar nada por conta própria — só implementar o que
já foi decidido em `/docs`.

## Antes de gerar qualquer componente novo

1. Leia `/docs/design-system.md` (fonte da verdade: cor, tipografia, motion, specs de
   componente, regras de acessibilidade — Seções 4 a 6).
2. Confira `/docs/wireframes.html` pra estrutura/hierarquia da página em questão.
3. Confira `/docs/style-tile.html` pra ver os tokens já aplicados visualmente.
4. Se o que você precisa construir não está em nenhum dos três, pare e pergunte —
   não invente token, componente ou padrão de motion novo sem validar antes.

## Regras não-negociáveis

- **Nunca hex cru em componente.** Sempre `var(--token-semântico)` de `/styles/tokens.css`.
  Se o token que você precisa não existe, adicione em `tokens.css` primeiro, com
  justificativa em comentário — não em `className`/inline style.
- **Duas famílias tipográficas só.** Archivo (display) e Inter (corpo/UI/label). Não
  adicionar uma terceira fonte por conveniência.
- **Contraste**: nunca `--blue-700` como cor de texto em fundo escuro (2.4:1, reprova
  AA). Em fundo escuro use `--accent-interactive` (--blue-500) ou `--accent-text`
  (--blue-300). Validar com `theme-light`/`theme-dark` corretos por seção.
- **Scroll Holofote é único.** O padrão da Seção 4.6 (1 card iluminado por vez, resto
  escurecido) aparece uma vez no site — na Home. A única exceção documentada é a
  página do projeto do curta (evento único, fora da navegação permanente). Não reusar
  esse padrão em nenhuma outra listagem.
- **Motion**: durações e easings sempre de `tokens.css` (`--duration-*`, `--ease-out`).
  Sem overshoot/bounce. Todo efeito scroll-linked precisa de fallback em
  `prefers-reduced-motion` (crossfade 150ms, sem parallax).
- **Toque/acessibilidade**: alvo mínimo 44×44px, aria-label em ícone sem texto,
  foco visível (`outline` com `--accent-text`), formulário com label sempre visível.
- **Vídeo**: `autoplay muted loop playsinline`, poster obrigatório, play real só
  via `IntersectionObserver` (≥40% visível), nunca autoplay com som.

## Ordem de construção (não pular etapas)

1. `styles/tokens.css` + `tailwind.config.ts` (já entregues — só ajustar se o design
   system mudar, e mudar lá primeiro).
2. Componentes de layout compartilhados: `Header/Nav`, `Footer` — usados em todas as
   páginas, construir uma vez.
3. Scroll Holofote **isolado** (rota de teste tipo `/dev/holofote`), validar
   performance/UX antes de plugar na Home de verdade.
4. Home completa, seguindo a ordem do wireframe: Hero → (seção temporária do curta,
   se estiver no período de pré-estreia) → Scroll Holofote → prova social → CTA.
5. Serviços, Sobre, Contato.
6. Página do projeto do curta, com o roteamento condicionado à data de estreia (ver
   nota abaixo).
7. QA de acessibilidade + performance antes de qualquer deploy pra produção.

## Roteamento condicionado à data (projeto do curta)

A rota do projeto só deve renderizar o conteúdo completo quando `hoje >= dataEstreia`.
Antes disso: a rota redireciona pra âncora da seção de contagem regressiva na Home
(`/#pre-estreia`), e o item some do array de links do nav. Depois da estreia, a
seção de contagem regressiva e o link "🔒" saem do código — não fica órfão no ar.
Fazer essa checagem no servidor (não só esconder no client), pra não vazar o
conteúdo antes da hora por quem acessa a URL direto.

## Antes de considerar uma página "pronta"

- Compara lado a lado com `/docs/wireframes.html` (estrutura) e
  `/docs/style-tile.html` (tokens aplicados) — bateu?
- Roda o checklist da Seção 6 do design-system.md (contraste, toque, motion,
  vídeo, fontes, CLS).
- Testa em pelo menos 3 breakpoints: 375px, 768px, 1440px.
- Testa com `prefers-reduced-motion: reduce` ativado no SO.

## Mudança de plano

Qualquer ajuste de paleta, tipografia, espaçamento ou de um padrão de motion entra
primeiro em `/docs/design-system.md` (com a justificativa), depois em
`tokens.css`, só depois no componente. Nessa ordem — nunca ao contrário.
