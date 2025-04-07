// Definição de blocos de colisão (imagens) para o jogo:
class CollisionBlock {
    constructor({ position, height = 16 }) { // Construtor da classe CollisionBlock
        this.position = position; // Posição do sprite (objeto com propriedades x e y)
        this.width = 16; // Largura do bloco de colisão
        this.height = height; // Altura do bloco de colisão
    }

    draw() { // Método para desenhar o bloco de colisão no canvas
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Cor do bloco de colisão (transparente)
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Desenha o retângulo do bloco de colisão
    }

    update() { // Método para atualizar o sprite
        this.draw(); // Chama o método draw para desenhar o sprite
    }
}