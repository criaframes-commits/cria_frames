# Visualizador vertical

A home tem um acesso direto em **Vídeos verticais** para `/reels/`. A rota
`/reels-teste/` abre o mesmo visualizador e continua com `noindex`.
Não há catálogo intermediário.

## Seleção e publicação dos Shorts

O estúdio confirmou que os Shorts serão publicados posteriormente. Até lá,
`REELS_ARE_PREVIEW = true` em `lib/reels.ts` identifica os vídeos do portfólio
como amostra. Para atualizar:

1. Substitua `REELS` por objetos `Reel` com os IDs dos Shorts publicados,
   título, categoria, descrição, duração e capas locais preferencialmente 9:16.
2. Altere `REELS_ARE_PREVIEW` para `false`.
3. Rode lint/build e confira a reprodução antes de publicar.

A seleção é manual; o site não consulta automaticamente o canal nem exige
uma chave de API. Vídeos horizontais da amostra não são convertidos em Shorts.

## Experiência

- Desktop: player centralizado, informações à esquerda na parte inferior,
  coração/comentários/compartilhar/som empilhados à direita e setas na lateral.
- Layout claro baseado na referência enviada, com o tema Estúdio do site.
- Entrada direta com autoplay sem som. Som ativado pelo visitante.
- No máximo três players (anterior, atual, próximo), apenas o atual reproduz.
- CSS scroll snap e observer; sem biblioteca de carrossel.
- Players distantes são destruídos; posição guardada durante a sessão.
- Fechar retorna à home. Navegar para outra página e ocultar a aba pausam o vídeo.
- O retorno à aba não inicia a reprodução sozinho; o player oferece controle manual.
- O YouTube mantém seus controles e marca. Nenhum elemento cobre o iframe.
- Curtir e comentar abrem o vídeo no YouTube para concluir a ação, com rótulos
  acessíveis que avisam sobre a nova aba. Não há curtidas locais nem contagens falsas.
- Compartilhar usa o menu nativo quando disponível, copia o link como alternativa
  e oferece um campo selecionável se o navegador impedir acesso à área de transferência.
- Falhas e bloqueio de autoplay têm alternativas manuais.

## Verificações

1. Home: clicar em Vídeos verticais abre diretamente a reprodução.
2. Desktop: centro do vídeo coincide com o centro horizontal da janela.
3. Navegação: botões, rolagem e teclado (no feed) avançam; anterior pausa.
4. Nunca mais de três iframes; sair da rota destrói os players.
5. Conferir celular, tablet, landscape, ícones, compartilhamento e voltar ao início.
6. Rodar `npm run lint` e `npm run build`.

A publicação existente usa Workers Builds ligado à branch `main` do repositório.
O login local do Wrangler pertence a outra conta; não criar um Worker duplicado.
