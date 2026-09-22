# Vitrine vertical — rota de teste

Endereço: `/reels-teste/`. A página está fora do menu e tem `noindex`.

## Conteúdo

`lib/reels.ts` centraliza a seleção. A versão inicial usa os vídeos existentes do
portfólio como amostra; isso não significa que todos sejam produções verticais.
Para a curadoria definitiva, substitua `REELS` por uma lista de objetos `Reel`,
informando o ID do YouTube, título, categoria, descrição, duração e capa local
preferencialmente em 9:16. O player preserva a imagem original, sem recorte.

## Reprodução

- Nenhum iframe ou script do YouTube é carregado antes da abertura.
- Scroll snap alinha os slides. Um observer seleciona o vídeo visível.
- No máximo três players: anterior, atual e próximo. Só o atual reproduz.
- A posição fica em memória durante a visita; players destruídos são recriados
  com o segundo salvo. Não há garantia de retomada no mesmo quadro.
- Fechar, sair da página ou ocultar a aba pausa a reprodução. O retorno à aba
  não inicia som automaticamente; os controles do player continuam disponíveis.
- Bloqueio de autoplay e falhas de rede têm ações manuais de recuperação.
- Botões e atalhos no feed (setas, PageUp/PageDown, Home/End) complementam o
  scroll, pois o iframe pode consumir gestos sobre o próprio vídeo.

## Verificação

1. Abrir a página: zero iframes; abrir um card intermediário: até três.
2. Avançar e voltar: apenas o atual toca. Saltar ao fim e voltar verifica a
   recriação dos players e a posição salva.
3. Fechar: zero iframes e foco no card que abriu o visualizador.
4. Testar resize, teclado, som, aba oculta, autoplay bloqueado e falha de rede.
5. Rodar `npm run lint` e `npm run build` antes de publicar.

A publicação existente é feita pelo Workers Builds ligado à branch `main` do
repositório. O login local do Wrangler pode pertencer a outra conta; não crie um
Worker duplicado para contornar essa diferença.
