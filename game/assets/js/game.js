/* Configuração do Canvas */

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Tamanho da janela canvas:
canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4, // Largura do canvas escalado
    height: canvas.height / 4 // Altura do canvas escalado
}

// Criação de um array para armazenar as colisões do chão:
console.log(floorCollisions) // Verifica se a variável floorCollisions está definida corretamente

const floorCollisions2D = [] // Cria um array vazio para armazenar as colisões do chão
for (let i = 0; i < floorCollisions.length; i += 36) { // Loop para percorrer as colisões do chão
    floorCollisions2D.push(floorCollisions.slice(i, i + 36)); // Adiciona as colisões do chão ao array
}

console.log(floorCollisions2D) // Verifica se o array de colisões do chão está definido corretamente

const collisionBlocks = [] // Cria um array vazio para armazenar os blocos de colisão

floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        console.log(symbol) // Verifica se cada símbolo de colisão do chão está definido corretamente

        if (symbol === 202) { // Verifica se o símbolo é igual a 202 (representa uma colisão do chão)
            console.log("Desenhe um bloco aqui!")
            collisionBlocks.push(
                new CollisionBlock({ // Adiciona um novo bloco de colisão ao array
                    position: {
                        x: x * 16, // Posição eixo horizontal
                        y: y * 16, // Posição eixo vertical
                    },
                })
            )
        }
    })
})

// Criação de um array para armazenar as colisões das plataformas:
const platformCollisions2D = [] // Cria um array vazio para armazenar as colisões das plataformas
for (let i = 0; i < platformCollisions.length; i += 36) { // Loop para percorrer as colisões das plataformas
    platformCollisions2D.push(platformCollisions.slice(i, i + 36)); // Adiciona as colisões das plataformas ao array
}

const platformCollisionBlocks = [] // Cria um array vazio para armazenar os blocos de colisão

platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        console.log(symbol) // Verifica se cada símbolo de colisão do chão está definido corretamente

        if (symbol === 202) { // Verifica se o símbolo é igual a 202 (representa uma colisão do chão)
            console.log("Desenhe um bloco aqui!")
            platformCollisionBlocks.push(
                new CollisionBlock({ // Adiciona um novo bloco de colisão ao array
                    position: {
                        x: x * 16, // Posição eixo horizontal
                        y: y * 16, // Posição eixo vertical
                    },
                })
            )
        }
    })
})

const gravity = 0.5; // Definição da gravidade (constante que afeta a velocidade do jogador)

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

const background = new Sprite({ // Cria uma nova instância do fundo do jogo
    position: { // Posição do fundo (objeto com propriedades x e y)
        x: 0, 
        y: 0 
    }, 
    imageSrc: '../img/background.png' // Fonte da imagem do fundo
})

// Função definida para executar a animação no canvas: 
function animate() {
    window.requestAnimationFrame(animate); // Chama a função animate novamente para criar um loop de animação
    // Estilo da janela canvas:
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Configuração do canvas escalado:
    ctx.save(); // Salva o estado atual do canvas
    ctx.scale(4, 4) // Escala o canvas para aumentar a resolução
    ctx.translate(0, -background.image.height + scaledCanvas.height) // Translada o canvas para a posição (0, ?)
    background.update(); // Atualiza o fundo
    collisionBlocks.forEach((collisionBlock) => { // Loop para percorrer os blocos de colisão
        collisionBlock.update(); // Atualiza cada bloco de colisão
    })

    platformCollisionBlocks.forEach((block) => { // Loop para percorrer os blocos de colisão
        block.update(); // Atualiza cada bloco de colisão
    })
    ctx.restore(); // Restaura o estado do canvas

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
            player.velocity.y = -10; // Move o jogador para cima
            break;
        case 'ArrowLeft': // Tecla 'ArrowLeft' pressionada
            keys.ArrowLeft.pressed = true; // Define a tecla 'ArrowLeft' como pressionada
            break;
        case 'ArrowRight': // Tecla 'ArrowRight' pressionada
            keys.ArrowRight.pressed = true; // Define a tecla 'ArrowRight' como pressionada
            break;
        case 'ArrowUp': // Tecla 'ArrowUp' pressionada
            player.velocity.y = -10; // Move o jogador para cima
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