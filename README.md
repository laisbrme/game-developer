![CHICKENS in a Dangerous Forest Cover](game/assets/img/GitHub%20Repo%20Card.png)

# 🐔 CHICKENS in a Dangerous Forest
CHICKENS in a Dangerous Forest é um jogo eletrônico para navegadores.

## Objetivo

O objetivo do projeto é criar um jogo onde o jogador possa guiar um personagem através de um cenário, evitando obstáculos, enquanto coleta itens especiais para aumentar a pontuação.

## Jogabilidade

CHICKENS in a Dangerous Forest é um jogo de plataforma para um jogador. O jogador controla um galo, utilizando as setas do teclado, e deve evitar colidir com os inimigos. Se o galo tocar em um inimigo, o jogo termina.

**Controles:**

*   `Seta para cima` ou `W`: Pular
*   `Seta para a esquerda` ou `A`: Mover para a esquerda
*   `Seta para a direita` ou `D`: Mover para a direita

**Pontuação:**

A pontuação é acumulada através da coleta de itens especiais:

*   Ovo: +1 ponto
*   Cesta de Ovos: +10 pontos
*   Resgate de Pintinhos: +100 pontos

## Estrutura Básica do Jogo

*   **Canvas:** Usado para renderizar todos os elementos do jogo (galo, inimigos, cenário, itens).

*   **Movimentação:** O jogador usa as setas do teclado ou as teclas "W", "A" e "D" para mover o galo para esquerda/direita e pular.

*   **Gravidade:** O galo está sujeito à gravidade e cai em direção ao chão.

*   **Inimigos:** Os inimigos surgem durante o jogo e se movem em direção ao jogador. Eles têm um padrão de movimento simples.

*   **Colisões:** A colisão é detectada quando o galo entra em contato com um inimigo. Ao ocorrer uma colisão, o jogo termina e uma tela de "Game Over" é exibida, mostrando a pontuação atual e a pontuação máxima.

*   **Pontuação:** A pontuação é acumulada ao coletar itens especiais.

## Tecnologias Utilizadas

*   HTML5 Canvas
*   JavaScript

## Como Executar

É possível executar o jogo de duas maneiras:

1.  Pelo GitHub:

    1.1 Clone o repositório.

    1.2 Abra o arquivo `index.html` no seu navegador.

2.  Pelo Link do Deploy:

    2.1 [CHICKENS]()

## Roadmap

*   `[ ]` Adicionar mais tipos de inimigos.
*   `[ ]` Implementar um sistema de vidas.
*   `[ ]` Adicionar diferentes níveis ou fases.
*   `[ ]` Adicionar efeitos sonoros e música.
*   `[ ]` Melhorar a animação dos personagens.

<!-- ## Apresentação

O vídeo apresenta o sistema de votação e demonstra o seu funcionamento, destacando suas principais funcionalidades e fluxo de uso.

[![Watch the video](https://img.youtube.com/vi/LFtSqPSo4L0/hqdefault.jpg)](https://youtu.be/LFtSqPSo4L0) -->

## Créditos

Assets Falcão, gambá e efeito de morte do inimigo por [Ansimuz](https://ansimuz.itch.io/sunny-land-pixel-game-art)

Arte de fundo por [Trixie](https://trixelized.itch.io/starstring-fields)


## Contato

**Laís Brum**

<div> 
  <a href = "mailto: eng.laisbm@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/lais-brum-menezes/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</div>


## Licença

O código deste projeto está licenciado sob a [Licença MIT](LICENSE.md).

As imagens e outros ativos criativos estão licenciados sob a [Licença Creative Commons Atribuição-NãoComercial 4.0 Internacional (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).
