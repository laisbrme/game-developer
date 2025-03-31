/* Configuração do Canvas */

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Tamanho da janela canvas:
canvas.width = 1024;
canvas.height = 576;

// Definições do jogador:
class Player {
    constructor() {
        // Propriedades do jogador individual terá dentro de si:
        this.width = 50; // Largura do jogador
        this.height = 50; // Altura do jogador
        this.position = {
            x: 0, // Posição eixo horizontal
            y: 0, // Posição eixo vertical
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
        this.position.y++; // Move o jogador para baixo
    }
}

const player = new Player(); // Cria uma nova instância do jogador

// Função definida para executar a animação no canvas: 
function animate() {
    window.requestAnimationFrame(animate); // Chama a função animate novamente para criar um loop de animação
    // Estilo da janela canvas:
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Atualiza a posição do jogador:
    player.draw(); // Desenha o jogador
    player.update(); // Atualiza a posição do jogador
}

animate()