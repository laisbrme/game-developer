/* Configuração do Canvas */

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Tamanho da janela canvas:
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5; // Definição da gravidade (constante que afeta a velocidade do jogador)

// Definições do jogador:
class Player {
    constructor(position) { // Com este argumento, podemos passar a posição do jogador como um objeto com propriedades x e y.
        // Propriedades do jogador individual terá dentro de si:
        this.width = 50; // Largura do jogador
        this.height = 50; // Altura do jogador
        this.position = position // Posição do jogador (objeto com propriedades x e y)
        this.velocity = { // Velocidade do jogador (objeto com propriedades x e y)
            x: 0, // Velocidade eixo horizontal
            y: 1 // Velocidade eixo vertical
        }
    } 

    // Método para desenhar o jogador no canvas:
    draw() {
        ctx.fillStyle = 'red'; // Cor do jogador
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Desenha o retângulo do jogador
    }

    // Método para atualizar a posição do jogador:
    update() {
        this.draw(); // Chama o método draw para desenhar o jogador

        this.position.x += this.velocity.x; // Move o jogador para baixo
        this.position.y += this.velocity.y; // Move o jogador para baixo

        // Criando colisão entre o jogador e o chão para que o jogador não caia infinitamente:
        if (this.position.y + this.height + this.velocity.y < canvas.height) 
            this.velocity.y += gravity; // Aumenta a velocidade do jogador para baixo (simulando gravidade)
        else this.velocity.y = 0; // Se o jogador atingir o chão, a velocidade vertical é zerada
    }
}

// Cria uma nova instância do jogador:
const player = new Player({
    x: 0, // Posição eixo horizontal
    y: 0, // Posição eixo vertical
}); 

const keys = {
    a : { pressed: false }, // Tecla 'a' pressionada
    d : { pressed: false }, // Tecla 'd' pressionada
    // w : { pressed: false }, // Tecla 'w' pressionada
    // s : { pressed: false }, // Tecla 's' pressionada
    ArrowLeft : { pressed: false }, // Tecla 'ArrowLeft' pressionada
    ArrowRight : { pressed: false }, // Tecla 'ArrowRight' pressionada
    // ArrowUp : { pressed: false }, // Tecla 'ArrowUp' pressionada
    // ArrowDown : { pressed: false }, // Tecla 'ArrowDown' pressionada
}

// Função definida para executar a animação no canvas: 
function animate() {
    window.requestAnimationFrame(animate); // Chama a função animate novamente para criar um loop de animação
    // Estilo da janela canvas:
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Atualiza a posição do jogador:
    player.update(); // Atualiza a posição do jogador

    player.velocity.x = 0; // Zera a velocidade horizontal do jogador
    if (keys.d.pressed || keys.ArrowRight.pressed) player.velocity.x = 1; // Move o jogador para a esquerda
    else if (keys.a.pressed || keys.ArrowLeft.pressed) player.velocity.x = -1; // Move o jogador para a direita
}

// Inicia a animação
animate()

// Adiciona um evento de teclado para mover o jogador:
window.addEventListener('keydown', (event) => {
    switch (event.key) { // Verifica qual tecla foi pressionada
        case 'a': // Tecla 'a' pressionada
            keys.a.pressed = true; // Define a tecla 'a' como pressionada
            break;
        case 'd': // Tecla 'd' pressionada
            keys.d.pressed = true; // Define a tecla 'd' como pressionada
            break;
        case 'w': // Tecla 'w' pressionada
            player.velocity.y = -20; // Move o jogador para cima
            break;
        case 'ArrowLeft': // Tecla 'ArrowLeft' pressionada
            keys.ArrowLeft.pressed = true; // Define a tecla 'ArrowLeft' como pressionada
            break;
        case 'ArrowRight': // Tecla 'ArrowRight' pressionada
            keys.ArrowRight.pressed = true; // Define a tecla 'ArrowRight' como pressionada
            break;
        case 'ArrowUp': // Tecla 'ArrowUp' pressionada
            player.velocity.y = -20; // Move o jogador para cima
            break;
    }

});

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