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