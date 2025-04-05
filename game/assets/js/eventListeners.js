// * Adiciona um evento de teclado para mover o jogador:
window.addEventListener('keydown', (event) => {
  switch (event.key) { // Verifica qual tecla foi pressionada
      case 'a': // Tecla 'a' pressionada
          keys.a.pressed = true; // Define a tecla 'a' como pressionada
          break;
      case 'd': // Tecla 'd' pressionada
          keys.d.pressed = true; // Define a tecla 'd' como pressionada
          break;
      case 'w': // Tecla 'w' pressionada
          player.velocity.y = -4; // Define a velocidade para pular para cima
          break;
      case 'ArrowLeft': // Tecla 'ArrowLeft' pressionada
          keys.ArrowLeft.pressed = true; // Define a tecla 'ArrowLeft' como pressionada
          break;
      case 'ArrowRight': // Tecla 'ArrowRight' pressionada
          keys.ArrowRight.pressed = true; // Define a tecla 'ArrowRight' como pressionada
          break;
      case 'ArrowUp': // Tecla 'ArrowUp' pressionada
          player.velocity.y = -4; // Define a velocidade para pular para cima
          break;
  }

});

// * Adiciona um evento de teclado para parar o jogador:
window.addEventListener('keyup', (event) => {
  switch (event.key) { // Verifica qual tecla não foi pressionada
      case 'a': // Tecla 'a' solta
          keys.a.pressed = false; // Define a tecla 'a' como não pressionada
          break;
      case 'd': // Tecla 'd' solta
          keys.d.pressed = false; // Define a tecla 'd' como não pressionada
          break;
      case 'ArrowLeft': // Tecla 'ArrowLeft' solta
          keys.ArrowLeft.pressed = false; // Define a tecla 'ArrowLeft' como não pressionada
          break;
      case 'ArrowRight': // Tecla 'ArrowRight' solta
          keys.ArrowRight.pressed = false; // Define a tecla 'ArrowRight' como não pressionada
          break;
  }

});

// * Adiciona um evento de teclado para reiniciar o jogo:
window.addEventListener('keydown', (event) => {
    if (isGameOver) {
        if (event.key === 'r' || event.key === 'R') {

            restartGame();
        }
    }
});
