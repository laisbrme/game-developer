// Definição de sprites (imagens) para o jogo:
class Sprite {
    constructor({ 
        position, 
        imageSrc, 
        frameRate = 1, 
        frameBuffer = 3, 
        scale = 1
    }) { // Embrulho os argumentos com {} em um objeto para facilitar a leitura e a manutenção do código.
        this.position = position; // Posição do sprite (objeto com propriedades x e y)
        this.scale = scale; // Define a escala do sprite (padrão é 1)
        this.loaded = false; // Inicializa a variável loaded como falsa (imagem não carregada)
        this.image = new Image(); // Cria uma nova imagem
        this.image.onload = () => { // Define o que acontece quando a imagem é carregada
            this.width = (this.image.width / this.frameRate) * this.scale; // Define a largura do sprite como a largura da imagem
            this.height = this.image.height * this.scale; // Define a altura do sprite como a altura da imagem
            this.loaded = true; // Define a variável loaded como verdadeira (imagem carregada)
        }
        this.image.src = imageSrc; // Define a fonte da imagem
        this.frameRate = frameRate; // Define a taxa de quadros do sprite (padrão é 1)
        this.currentFrame = 0; // Inicializa o quadro atual como 0
        this.frameBuffer = frameBuffer; // Inicializa o buffer de quadros como 3
        this.elapsedFrames = 0; // Inicializa os quadros gastos como 0
    }

    draw() { // Método para desenhar o sprite no canvas
        if (!this.image) return; // Se a imagem não estiver carregada, não desenha nada

        const cropbox = { // Objeto que define a área da imagem a ser desenhada
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate), // Calcula a posição x do cropbox com base no quadro atual
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }

        ctx.drawImage(
            this.image, 
            cropbox.position.x, 
            cropbox.position.y,
            cropbox.width, 
            cropbox.height,
            this.position.x, 
            this.position.y,
            this.width, // Divide a largura do sprite pela taxa de quadros
            this.height
        ); // Desenha a imagem no canvas
    }

    update() { // Método para atualizar o sprite
        this.draw(); // Chama o método draw para desenhar o sprite
        this.updateFrames(); // Chama o método updateFrames para animar os quadros do sprite
    }

    updateFrames() { // Método para animar os quadros do sprite
        this.elapsedFrames++; // Aumenta os quadros gastos

        if (this.elapsedFrames % this.frameBuffer === 0) { // Se os quadros gastos forem múltiplos do buffer de quadros
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++; // Aumenta o quadro atual se não for o último quadro
            else this.currentFrame = 0; // Se for o último quadro, volta para o primeiro
        }
    }
}