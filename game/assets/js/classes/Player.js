// Definições do jogador:
class Player extends Sprite { // O jogador é uma extensão da classe Sprite, que é uma classe base para objetos que podem ser desenhados no canvas.
    constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 0.5 }) { // Com este argumento, podemos passar a posição do jogador como um objeto com propriedades x e y.
        // Propriedades do jogador individual terá dentro de si:
        super({ imageSrc, frameRate, scale }) // Chama o construtor da classe pai (Sprite) para inicializar a imagem do jogador
        this.position = position // Posição do jogador (objeto com propriedades x e y)
        this.velocity = { // Velocidade do jogador (objeto com propriedades x e y)
            x: 0, // Velocidade eixo horizontal
            y: 1 // Velocidade eixo vertical
        }
        this.collisionBlocks = collisionBlocks; // Blocos de colisão do chão (passados como argumento)
    } 

    // Método para desenhar o jogador (quadrado) no canvas:
    // draw() {
    //     ctx.fillStyle = 'red'; // Cor do jogador
    //     ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Desenha o retângulo do jogador
    // }

    // Método para atualizar a posição do jogador:
    update() {
        this.updateFrames()
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'
        ctx.fillRect(this.position.x, this.positiony, this.width, this.height); // Desenha o retângulo do jogador
        this.draw(); // Chama o método draw para desenhar o jogador

        this.position.x += this.velocity.x; // Move o jogador para baixo
        this.checkForHorizontalCollision(); // Verifica colisões horizontal
        this.applyGravity(); // Aplica a gravidade ao jogador
        this.checkForVerticalCollision(); // Verifica colisões vertical
    }

    // Método para verificar colisões horizontais:
    checkForHorizontalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]; // Pega o bloco de colisão atual

            if (
                collision({
                    object1: this, // O jogador
                    object2: collisionBlock // O bloco de colisão
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0; // Para a velocidade horizontal do jogador
                    this.position.x = collisionBlock.position.x - this.width - 0.01; // Move o jogador para cima do bloco de colisão 
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0; // Para a velocidade horizontal do jogador
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01; // Move o jogador para cima do bloco de colisão
                }
            }
        }
    }

    // Método para aplicar a gravidade ao jogador:
    applyGravity() { 
        this.position.y += this.velocity.y; // Move o jogador para baixo
        this.velocity.y += gravity; // Aumenta a velocidade do jogador com a gravidade
    }

    // Método para verificar colisões verticais:
    checkForVerticalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]; // Pega o bloco de colisão atual

            if (
                collision({
                    object1: this, // O jogador
                    object2: collisionBlock // O bloco de colisão
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0; // Para a velocidade vertical do jogador
                    this.position.y = collisionBlock.position.y - this.height - 0.01; // Move o jogador para cima do bloco de colisão
                    break
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0; // Para a velocidade vertical do jogador
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01; // Move o jogador para cima do bloco de colisão
                    break
                }
            }
        }
    }
}