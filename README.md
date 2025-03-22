# 🐔 CHICKENS in a Dangerous Jungle
CHICKENS in a Dangerous Jungle é um jogo eletrônico para navegadores.

## Objetivo

Crie um jogo onde o jogador possa guiar um objeto qualquer entre os obstáculos utilizando as setas do seu teclado.

## Jogabilidade

CHICKENS in a Dangerous Jungle é um jogo de plataforma para 1 jogador. Ganhe o maior número possível de pontos, controlando um galo, utilizando as setas do teclado, sem deixá-lo colidir nos obstáculos. Se o galo tocar em algum obstáculo, o jogo termina.

## Estrutura Básica do Jogo

- **Canvas:** Será usado para renderizar os elementos do jogo (galinha, obstáculos, cenário).

- **Movimentação:** O jogador usará as setas do teclado para mover a galinha para esquerda/direita e talvez para cima/baixo.

- **Obstáculos:** Eles surgirão de diferentes posições e se moverão em direção ao jogador, aumentando a dificuldade com o tempo.

- **Colisões:** Se a galinha tocar um obstáculo, irá exibir uma tela de "Game Over", com a exibição da pontuação atual e a pontuação máxima.

- **Pontuação:** Se dará de duas maneiras:
    
    - Tempo de Sobrevivência: Um contador pode aumentar a pontuação a cada segundo sobrevivido.

    - Coleta de Itens Especiais:

        - O Ovo: adiciona +10 pontos.

        - A Cesta de Ovos: adiciona +100 pontos.