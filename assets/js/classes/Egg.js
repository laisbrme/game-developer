// * Definições do ovo:
class Egg extends Sprite { // O ovo é uma extensão da classe Sprite, que é uma classe base para objetos que podem ser desenhados no canvas.
    constructor({ // O construtor da classe Enemy recebe um objeto com as propriedades necessárias para inicializar o ovo.
        position, 
        collisionBlocks, 
        platformCollisionBlocks, 
        imageSrc, 
        frameRate, 
        scale = 0.2,
        animations,
    }) {
        // Propriedades do ovo individual terá dentro de si:
        super({ imageSrc, frameRate, scale }) // Chama o construtor da classe pai (Sprite) para inicializar a imagem do ovo
        this.position = position // Posição do ovo (objeto com propriedades x e y)
        this.velocity = { // Velocidade do ovo (objeto com propriedades x e y)
            x: 0, // Velocidade eixo horizontal
            y: 1, // Velocidade eixo vertical
        }

        this.collisionBlocks = collisionBlocks; // Blocos de colisão do chão (passados como argumento)
        this.platformCollisionBlocks = platformCollisionBlocks; // Blocos de colisão do chão (passados como argumento)
        this.hitbox = {
            position: {
                x: this.position.x, // Posição horizontal referente ao do ovo
                y: this.position.y, // Posição vertical referente ao do ovo
            },
            width: 10, // Largura do hitbox
            height: 10, // Altura do hitbox
        }

        this.animations = animations // Animações do ovo (passadas como argumento)
        this.lastDirection = 'right'; // Define a última direção do ovo como direita (padrão)

        for(let key in this.animations) { // Para cada animação do ovo
            const image = new Image(); // Cria uma nova imagem
            image.src = this.animations[key].imageSrc; // Define a fonte da imagem

            this.animations[key].image = image; // Atribui a imagem à animação correspondente
        }

        this.camerabox = { // Caixa da câmera do ovo (para limitar a área de visão)
            position: {
                x: this.position.x, // Posição horizontal referente ao do ovo
                y: this.position.y, // Posição vertical referente ao do ovo
            },
            width: 200, // Largura da caixa da câmera
            height: 80, // Altura da caixa da câmera
        }
    } 

    // * Método para alternar entre as animações do ovo:
    switchSprite(key) { 
        if (this.image === this.animations[key].image || !this.loaded) return; // Se a imagem atual do ovo for a mesma da animação correspondente, não faz nada
        
        this.currentFrame = 0; // Reseta o quadro atual para 0 (início da animação)
        this.image = this.animations[key].image; // Define a imagem atual do ovo como a imagem da animação correspondente
        this.frameBuffer = this.animations[key].frameBuffer; // Define o buffer de quadros da animação correspondente
        this.frameRate = this.animations[key].frameRate; 
    }

    // * Método para atualizar a posição da caixa da câmera do ovo:
    updateCamerabox() { 
        this.camerabox = { // Caixa da câmera do ovo (para limitar a área de visão)
            position: {
                x: this.position.x - 50, // Posição horizontal referente ao do ovo
                y: this.position.y, // Posição vertical referente ao do ovo
            },
            width: 200, // Largura da caixa da câmera
            height: 80, // Altura da caixa da câmera
        }
    }

    // * Método para verificar colisões horizontais com o canvas:
    checkForHorizontalCanvasCollision() { 
        if(
            this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
            this.hitbox.position.x + this.velocity.x <= 0
        ) { // Verifica se o hitbox do ovo colide com as bordas do canvas
            this.velocity.x = 0; // Para a velocidade horizontal do ovo
        }
    }

    // * Método para verificar se a câmera deve se mover para a esquerda:
    shouldPanCameraToTheLeft({ canvas, camera }) { 
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width; // Posição esquerda da caixa da câmera
        const scaledDownCanvasWidth = canvas.width / 4; // Largura do canvas reduzida

        if (cameraboxRightSide >= 576) return // Se a posição esquerda da caixa da câmera for maior ou igual a 576, não faz nada

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

    // * Método para atualizar a posição do ovo:
    update() {
        this.updateFrames(); // Atualiza os quadros do ovo
        this.updateHitbox(); // Atualiza a caixa de colisão do ovo
        this.updateCamerabox(); // Atualiza a caixa da câmera do ovo

        // Desenha a camerabox do ovo:
        // ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
        // ctx.fillRect(
        //   this.camerabox.position.x,
        //   this.camerabox.position.y,
        //   this.camerabox.width,
        //   this.camerabox.height
        // );

        // ! Desenha a imagem de fundo do ovo:
        // ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'
        // ctx.fillRect(
        //     this.position.x, 
        //     this.position.y, 
        //     this.width, 
        //     this.height
        // )

        // ! Desenha o hitbox do ovo:
        // ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
        // ctx.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height
        // )
        
        this.draw(); // Chama o método draw para desenhar o ovo
        
        this.position.x += this.velocity.x; // Move o ovo para baixo
        this.updateHitbox();
        this.checkForHorizontalCollision(); // Verifica colisões horizontal
        this.applyGravity(); // Aplica a gravidade ao ovo
        this.updateHitbox();
        this.checkForVerticalCollision(); // Verifica colisões vertical
    }

    // * Método para atualizar a caixa de colisão do ovo
    updateHitbox() { 
        this.hitbox = {
            position: {
                x: this.position.x + 0, // Posição horizontal referente ao do ovo
                y: this.position.y + 0, // Posição vertical referente ao do ovo
            },
            width: 8, // ! Largura do hitbox
            height: 8, // ! Altura do hitbox
        }
    }

    // * Método para verificar colisões horizontais:
    checkForHorizontalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]; // Pega o bloco de colisão atual

            if (
                collision({
                    object1: this.hitbox, // O hitbox do ovo
                    object2: collisionBlock // O bloco de colisão
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0; // Para a velocidade horizontal do ovo

                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width; // Calcula o deslocamento do hitbox em relação à posição do ovo

                    this.position.x = collisionBlock.position.x - offset - 0.01; // Move o ovo para cima do bloco de colisão 
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0; // Para a velocidade horizontal do ovo

                    const offset = this.hitbox.position.x - this.position.x; // Calcula o deslocamento do hitbox em relação à posição do ovo

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01; // Move o ovo para cima do bloco de colisão
                    break;
                }
            }
        }
    }

    // * Método para aplicar a gravidade ao ovo:
    applyGravity() { 
        this.velocity.y += gravity; // Aumenta a velocidade do ovo com a gravidade
        this.position.y += this.velocity.y; // Move o ovo para baixo
    }

    // * Método para verificar colisões verticais:
    checkForVerticalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]; // Pega o bloco de colisão atual

            if (
                collision({
                    object1: this.hitbox, // O hitbox do ovo
                    object2: collisionBlock // O bloco de colisão
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0; // Para a velocidade vertical do ovo

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height; // Calcula o deslocamento do hitbox em relação à posição do ovo

                    this.position.y = collisionBlock.position.y - offset - 0.01; // Move o ovo para cima do bloco de colisão
                    break
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0; // Para a velocidade vertical do ovo

                    const offset = this.hitbox.position.y - this.position.y; // Calcula o deslocamento do hitbox em relação à posição do ovo

                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01; // Move o ovo para cima do bloco de colisão
                    break
                }
            }
        }

        // Verifica colisões com plataformas:
        for(let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i]; // Pega o bloco de colisão atual

            if (
                plataformCollision({
                    object1: this.hitbox, // O hitbox do ovo
                    object2: platformCollisionBlock // O bloco de colisão da plataforma
                })
            ) {
                if (this.velocity.y > 0) { // Verifica se o ovo está caindo
                    this.velocity.y = 0; // Para a velocidade vertical do ovo

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height; // Calcula o deslocamento do hitbox em relação à posição do ovo

                    this.position.y = platformCollisionBlock.position.y - offset - 0.01; // Move o ovo para cima do bloco de colisão da plataforma
                    break
                }

                
            }
        }
    }

    destroy(eggs, index) {
        // Muda a sprite do ovo para "pt-1.png"
        this.switchSprite('Rescue'); 
        // Remove o ovo após um pequeno atraso
        setTimeout(() => {
            eggs.splice(index, 1); // Remove o ovo da lista de ovos
        }, 100); // 100ms de atraso para exibir a animação de morte
    }
}