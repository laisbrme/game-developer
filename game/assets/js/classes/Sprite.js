// Definição de sprites (imagens) para o jogo:
class Sprite {
    constructor({position, imageSrc}) { // Embrulho os argumentos com {} em um objeto para facilitar a leitura e a manutenção do código.
        this.position = position; // Posição do sprite (objeto com propriedades x e y)
        this.image = new Image(); // Cria uma nova imagem
        this.image.src = imageSrc; // Define a fonte da imagem
    }

    draw() { // Método para desenhar o sprite no canvas
        if (!this.image) return; // Se a imagem não estiver carregada, não desenha nada
        ctx.drawImage(this.image, this.position.x, this.position.y); // Desenha a imagem no canvas
    }

    update() { // Método para atualizar o sprite
        this.draw(); // Chama o método draw para desenhar o sprite
    }
}