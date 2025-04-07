// * Adiciona um evento de teclado para mover o jogador:
window.addEventListener('keydown', (event) => {
    switch (event.key) { // Verifica qual tecla foi pressionada
        case 'a': // Tecla 'a' pressionada
        case 'A': // Tecla 'A' pressionada
        case 'ArrowLeft': // Tecla 'ArrowLeft' pressionada
            keys.ArrowLeft.pressed = true; // Define a tecla 'ArrowLeft' como pressionada
            break;
        case 'd': // Tecla 'd' pressionada
        case 'D': // Tecla 'D' pressionada
        case 'ArrowRight': // Tecla 'ArrowRight' pressionada
            keys.ArrowRight.pressed = true; // Define a tecla 'ArrowRight' como pressionada
            break;
        case 'w': // Tecla 'w' pressionada
        case 'W': // Tecla 'W' pressionada
        case 'ArrowUp': // Tecla 'ArrowUp' pressionada
            player.velocity.y = -4; // Define a velocidade para pular para cima
            break;
  }
});

// * Adiciona um evento de teclado para parar o jogador:
window.addEventListener('keyup', (event) => {
    switch (event.key) { // Verifica qual tecla não foi pressionada
        case 'a': // Tecla 'a' solta
        case 'A': // Tecla 'A' solta
        case 'ArrowLeft': // Tecla 'ArrowLeft' solta
            keys.ArrowLeft.pressed = false; // Define a tecla 'ArrowLeft' como não pressionada
            break;
        case 'd': // Tecla 'd' solta
        case 'D': // Tecla 'D' solta
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
        }if (event.key === 'm' || event.key === 'M') {

            backToMenu();
        }
    }
});

window.addEventListener('keydown', (event) => {
    if (!isGameOver) {
        if (event.key === 'p' || event.key === 'P') {

            console.log(`Posição do jogador: ${player.position.x + 23}, ${player.position.y}`	);
        }
    }
});

window.addEventListener('keydown', (event) => {
    console.log(`Tecla pressionada: ${event.key}`);
});