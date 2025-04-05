// * Definições do jogador:
class Player extends Sprite { // O jogador é uma extensão da classe Sprite, que é uma classe base para objetos que podem ser desenhados no canvas.
    constructor({ // O construtor da classe Player recebe um objeto com as propriedades necessárias para inicializar o jogador.
        position, 
        collisionBlocks, 
        platformCollisionBlocks, 
        imageSrc, 
        frameRate, 
        scale = 0.5,
        animations,
    }) {
        // Propriedades do jogador individual terá dentro de si:
        super({ imageSrc, frameRate, scale }) // Chama o construtor da classe pai (Sprite) para inicializar a imagem do jogador
        this.position = position // Posição do jogador (objeto com propriedades x e y)
        this.velocity = { // Velocidade do jogador (objeto com propriedades x e y)
            x: 0, // Velocidade eixo horizontal
            y: 1, // Velocidade eixo vertical
        }

        this.collisionBlocks = collisionBlocks; // Blocos de colisão do chão (passados como argumento)
        this.platformCollisionBlocks = platformCollisionBlocks; // Blocos de colisão doa plataforma (passados como argumento)
        this.hitbox = {
            position: {
                x: this.position.x, // Posição horizontal referente ao do jogador
                y: this.position.y, // Posição vertical referente ao do jogador
            },
            width: 10, // Largura do hitbox
            height: 10, // Altura do hitbox
        }

        this.animations = animations // Animações do jogador (passadas como argumento)
        this.lastDirection = 'right'; // Define a última direção do jogador como direita (padrão)

        for(let key in this.animations) { // Para cada animação do jogador
            const image = new Image(); // Cria uma nova imagem
            image.src = this.animations[key].imageSrc; // Define a fonte da imagem

            this.animations[key].image = image; // Atribui a imagem à animação correspondente
        }

        this.camerabox = { // Caixa da câmera do jogador (para limitar a área de visão)
            position: {
                x: this.position.x, // Posição horizontal referente ao do jogador
                y: this.position.y, // Posição vertical referente ao do jogador
            },
            width: 200, // Largura da caixa da câmera
            height: 80, // Altura da caixa da câmera
        }
    } 

    // * Método para alternar entre as animações do jogador:
    switchSprite(key) { 
        if (this.image === this.animations[key].image || !this.loaded) return; // Se a imagem atual do jogador for a mesma da animação correspondente, não faz nada
        
        this.currentFrame = 0; // Reseta o quadro atual para 0 (início da animação)
        this.image = this.animations[key].image; // Define a imagem atual do jogador como a imagem da animação correspondente
        this.frameBuffer = this.animations[key].frameBuffer; // Define o buffer de quadros da animação correspondente
        this.frameRate = this.animations[key].frameRate; 
    }

    // * Método para atualizar a posição da caixa da câmera do jogador:
    updateCamerabox() { 
        this.camerabox = { // Caixa da câmera do jogador (para limitar a área de visão)
            position: {
                x: this.position.x - 50, // Posição horizontal referente ao do jogador
                y: this.position.y, // Posição vertical referente ao do jogador
            },
            width: 200, // Largura da caixa da câmera
            height: 80, // Altura da caixa da câmera
        }
    }

    // * Método para verificar colisões horizontais com o canvas:
    checkForHorizontalCanvasCollision() { 
        if(
            this.hitbox.position.x + this.hitbox.width + this.velocity.x >= canvas.height ||
            this.hitbox.position.x + this.velocity.x <= 0
        ) { // Verifica se o hitbox do jogador colide com as bordas do canvas
            this.velocity.x = 0; // Para a velocidade horizontal do jogador
        }
    }

    // * Método para verificar se a câmera deve se mover para a esquerda:
    shouldPanCameraToTheLeft({ canvas, camera }) { 
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width; // Posição esquerda da caixa da câmera
        const scaledDownCanvasWidth = canvas.width / 4; // Largura do canvas reduzida

        if (cameraboxRightSide >= canvas.height) return // Se a posição esquerda da caixa da câmera for maior ou igual a 576, não faz nada

        if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) { // Se a posição esquerda da caixa da câmera for maior ou igual à largura do canvas
            camera.position.x -= this.velocity.x; // Move a câmera para a esquerda
        }
    }

    // * Método para verificar se a câmera deve se mover para a direita:
    shouldPanCameraToTheRight({ canvas, camera }) { 
        if (this.camerabox.position.x <= 0) return; // Se a posição direita da caixa da câmera for menor ou igual a 0, não faz nada

        if (this.camerabox.position.x <= Math.abs(camera.position.x)) { // Se a posição direita da caixa da câmera for menor ou igual à posição da câmera
            camera.position.x -= this.velocity.x; // Move a câmera para a direita
        }
    }

    // * Método para verificar se a câmera deve se mover para baixo:
    shouldPanCameraToDown({ canvas, camera }) { 
        if (this.camerabox.position.y + this.velocity.y <= 0) return; // Verifica se a câmera atingir o limite superior e não estiver movendo-se para baixo, a função é interrompida

        if (this.camerabox.position.y <= Math.abs(camera.position.y)) { // Verifica se a posição y da camerabox é menor ou igual ao valor absoluto da posição y da câmera.
            camera.position.y -= this.velocity.y;
        }
    }

    shouldPanCameraToUp({ canvas, camera }) { 
        if (
            this.camerabox.position.y + 
            this.camerabox.height + 
            this.velocity.y >= 432
        ) return; // Verifica se a câmera atingir o limite superior e não estiver movendo-se para baixo, a função é interrompida

        const scaledCanvasHeight = canvas.height / 4
        
        if (
            this.camerabox.position.y + this.camerabox.height >= 
            Math.abs(camera.position.y) + scaledCanvasHeight
        ) { 
            camera.position.y -= this.velocity.y;
        }
    }    

    // * Método para atualizar a posição do jogador:
    update() {
        this.updateFrames(); // Atualiza os quadros do jogador
        this.updateHitbox(); // Atualiza a caixa de colisão do jogador
        this.updateCamerabox(); // Atualiza a caixa da câmera do jogador

        // Desenha a camerabox do jogador:
        // ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
        // ctx.fillRect(
        //   this.camerabox.position.x,
        //   this.camerabox.position.y,
        //   this.camerabox.width,
        //   this.camerabox.height
        // );

        // Desenha a imagem de fundo do jogador:
        // ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'
        // ctx.fillRect(
        //     this.position.x, 
        //     this.position.y, 
        //     this.width, 
        //     this.height
        // )

        // Desenha o hitbox do jogador:
        // ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
        // ctx.fillRect(
        //   this.hitbox.position.x,
        //   this.hitbox.position.y,
        //   this.hitbox.width,
        //   this.hitbox.height
        // )
        
        this.draw(); // Chama o método draw para desenhar o jogador

        this.position.x += this.velocity.x; // Move o jogador para baixo
        this.updateHitbox();
        this.checkForHorizontalCollision(); // Verifica colisões horizontal
        this.applyGravity(); // Aplica a gravidade ao jogador
        this.updateHitbox();
        this.checkForVerticalCollision(); // Verifica colisões vertical
    }

    // * Método para atualizar a caixa de colisão do jogador
    updateHitbox() { 
        this.hitbox = {
            position: {
                x: this.position.x + 32, // Posição horizontal referente ao do jogador
                y: this.position.y + 30, // Posição vertical referente ao do jogador
            },
            width: 15, // Largura do hitbox
            height: 25, // Altura do hitbox
        }
    }

    // * Método para verificar colisões horizontais:
    checkForHorizontalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]; // Pega o bloco de colisão atual

            if (
                collision({
                    object1: this.hitbox, // O hitbox do jogador
                    object2: collisionBlock // O bloco de colisão
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0; // Para a velocidade horizontal do jogador

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width; // Calcula o deslocamento do hitbox em relação à posição do jogador

                    this.position.x = collisionBlock.position.x - offset - 0.01; // Move o jogador para cima do bloco de colisão 
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0; // Para a velocidade horizontal do jogador

                    const offset = this.hitbox.position.x - this.position.x; // Calcula o deslocamento do hitbox em relação à posição do jogador

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01; // Move o jogador para cima do bloco de colisão
                    break;
                }
            }
        }
    }

    // * Método para aplicar a gravidade ao jogador:
    applyGravity() { 
        this.velocity.y += gravity; // Aumenta a velocidade do jogador com a gravidade
        this.position.y += this.velocity.y; // Move o jogador para baixo
    }

    // * Método para verificar colisões verticais:
    checkForVerticalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]; // Pega o bloco de colisão atual

            if (
                collision({
                    object1: this.hitbox, // O hitbox do jogador
                    object2: collisionBlock // O bloco de colisão
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0; // Para a velocidade vertical do jogador

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height; // Calcula o deslocamento do hitbox em relação à posição do jogador

                    this.position.y = collisionBlock.position.y - offset - 0.01; // Move o jogador para cima do bloco de colisão
                    break
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0; // Para a velocidade vertical do jogador

                    const offset = this.hitbox.position.y - this.position.y; // Calcula o deslocamento do hitbox em relação à posição do jogador

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01; // Move o jogador para cima do bloco de colisão
                    break
                }
            }
        }

        // Verifica colisões com plataformas:
        for(let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i]; // Pega o bloco de colisão atual

            if (
                plataformCollision({
                    object1: this.hitbox, // O hitbox do jogador
                    object2: platformCollisionBlock // O bloco de colisão da plataforma
                })
            ) {
                if (this.velocity.y > 0) { // Verifica se o jogador está caindo
                    this.velocity.y = 0; // Para a velocidade vertical do jogador

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height; // Calcula o deslocamento do hitbox em relação à posição do jogador

                    this.position.y = platformCollisionBlock.position.y - offset - 0.01; // Move o jogador para cima do bloco de colisão da plataforma
                    break
                }

                
            }
        }
    }

    // * Método para verificar colisões com o inimigo:
    checkForEnemyCollision(enemies) {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
    
            if (
                collision({
                    object1: this.hitbox, // O hitbox do jogador
                    object2: enemy.hitbox // O hitbox do inimigo
                })
            ) {
                if (this.velocity.y > 0 && // Colisão de cima para baixo
                    this.position.y + this.hitbox.height <= enemy.hitbox.position.y + enemy.hitbox.height / 2) {
                    this.velocity.y = -4; // Rebote do jogador
                    enemy.destroy(enemies, i) // Executa o método destroy do inimigo
                    break;
                } else { // Colisão horizontal ou de baixo para cima
                    gameOver(); // Executa a função gameOver
                    break;
                }
            }
        }
    }
}