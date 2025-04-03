// * Configuração do Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// * Tamanho da janela canvas:
canvas.width = 1024;
canvas.height = 576;

// * Configuração da persona:
const persona = {
    attack1Position: {
        src: '../img/persona/Attack1.png',
        frameRate: 4,
        frameBuffer: 3,
    },
    attack2Position: {
        src: '../img/persona/Attack2.png',
        frameRate: 4,
        frameBuffer: 3,
    },
    attack3Position: {
        src: '../img/persona/Attack3.png',
        frameRate: 4,
        frameBuffer: 3,
    },
    deathPosition: {
        src: '../img/persona/Death.png',
        frameRate: 6,
        frameBuffer: 3,
    },
    fallPosition: {
        src: '../img/persona/Fall.png',
        frameRate: 2,
        frameBuffer: 3,
    },
    fallLeftPosition: {
        src: '../img/persona/FallLeft.png',
        frameRate: 2,
        frameBuffer: 3,
    },
    idlePosition: {
        src: '../img/persona/Idle.png',
        frameRate: 8,
        frameBuffer: 3,
    },
    idleLeftPosition: {
        src: '../img/persona/IdleLeft.png',
        frameRate: 8,
        frameBuffer: 3,
    },
    jumpPosition: {
        src: '../img/persona/Jump.png',
        frameRate: 2,
        frameBuffer: 3,
    },
    jumpLeftPosition: {
        src: '../img/persona/JumpLeft.png',
        frameRate: 2,
        frameBuffer: 3,
    },
    runPosition: {
        src: '../img/persona/Run.png',
        frameRate: 8,
        frameBuffer: 5,
    },
    runLeftPosition: {
        src: '../img/persona/RunLeft.png',
        frameRate: 8,
        frameBuffer: 5,
    },
    takeHitPosition: {
        src: '../img/persona/Take Hit.png',
        frameRate: 4,
        frameBuffer: 3,
    },
    takeHitWhitePosition: {
        src: '../img/persona/Take Hit - white silhouette.png',
        frameRate: 4,
        frameBuffer: 3,
    },
}

const scaledCanvas = {
    width: canvas.width / 4, // Largura do canvas escalado
    height: canvas.height / 4 // Altura do canvas escalado
}

// * Criação de um array para armazenar as colisões do chão:
const floorCollisions2D = [] // Cria um array vazio para armazenar as colisões do chão
for (let i = 0; i < floorCollisions.length; i += 36) { // Loop para percorrer as colisões do chão
    floorCollisions2D.push(floorCollisions.slice(i, i + 36)); // Adiciona as colisões do chão ao array
}

const collisionBlocks = [] // Cria um array vazio para armazenar os blocos de colisão

floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) { // Verifica se o símbolo é igual a 202 (representa uma colisão do chão)
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

// * Criação de um array para armazenar as colisões das plataformas:
const platformCollisions2D = [] // Cria um array vazio para armazenar as colisões das plataformas
for (let i = 0; i < platformCollisions.length; i += 36) { // Loop para percorrer as colisões das plataformas
    platformCollisions2D.push(platformCollisions.slice(i, i + 36)); // Adiciona as colisões das plataformas ao array
}

const platformCollisionBlocks = [] // Cria um array vazio para armazenar os blocos de colisão

platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) { // Verifica se o símbolo é igual a 202 (representa uma colisão do chão)
            platformCollisionBlocks.push(
                new CollisionBlock({ // Adiciona um novo bloco de colisão ao array
                    position: {
                        x: x * 16, // Posição eixo horizontal
                        y: y * 16, // Posição eixo vertical
                    },
                    height: 4, // Altura do bloco de colisão
                })
            )
        }
    })
})

const gravity = 0.1 // Definição da gravidade (constante que afeta a velocidade do jogador)

// * Cria uma nova instância do jogador:
const player = new Player({
    position: {
        x: 100, // Posição eixo horizontal
        y: 300, // Posição eixo vertical
    },
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    imageSrc: persona.idlePosition.src, // Fonte da imagem do jogador
    frameRate: persona.idlePosition.frameRate, // Taxa de quadros do jogador
    animations: { // Animações do jogador
        Idle: {
            imageSrc: persona.idlePosition.src, // Fonte da imagem do jogador
            frameRate: persona.idlePosition.frameRate, // Taxa de quadros do jogador
            frameBuffer: persona.idlePosition.frameRate, // Buffer de quadros do jogador
        },
        IdleLeft: {
            imageSrc: persona.idleLeftPosition.src, // Fonte da imagem do jogador
            frameRate: persona.idleLeftPosition.frameRate, // Taxa de quadros do jogador
            frameBuffer: persona.idleLeftPosition.frameBuffer, // Buffer de quadros do jogador
        },
        Run: {
            imageSrc: persona.runPosition.src, // Fonte da imagem do jogador
            frameRate: persona.runPosition.frameRate, // Taxa de quadros do jogador
            frameBuffer: persona.runPosition.frameBuffer, // Buffer de quadros do jogador
        },
        RunLeft: {
            imageSrc: persona.runLeftPosition.src, // Fonte da imagem do jogador
            frameRate: persona.runLeftPosition.frameRate, // Taxa de quadros do jogador
            frameBuffer: persona.runLeftPosition.frameBuffer, // Buffer de quadros do jogador
        },
        Jump: {
            imageSrc: persona.jumpPosition.src, // Fonte da imagem do jogador
            frameRate: persona.jumpPosition.frameRate, // Taxa de quadros do jogador
            frameBuffer: persona.jumpPosition.frameBuffer, // Buffer de quadros do jogador
        },
        JumpLeft: {
            imageSrc: persona.jumpLeftPosition.src, // Fonte da imagem do jogador
            frameRate: persona.jumpLeftPosition.frameRate, // Taxa de quadros do jogador
            frameBuffer: persona.jumpLeftPosition.frameBuffer, // Buffer de quadros do jogador
        },
        Fall: {
            imageSrc: persona.fallPosition.src, // Fonte da imagem do jogador
            frameRate: persona.fallPosition.frameRate, // Taxa de quadros do jogador
            frameBuffer: persona.fallPosition.frameBuffer, // Buffer de quadros do jogador
        },
        FallLeft: {
            imageSrc: persona.fallLeftPosition.src, // Fonte da imagem do jogador
            frameRate: persona.fallLeftPosition.frameRate, // Taxa de quadros do jogador
            frameBuffer: persona.fallLeftPosition.frameBuffer, // Buffer de quadros do jogador
        },
    }
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

const backgroundImageHeight = 432;

const camera = {
    position: { // Posição da câmera (objeto com propriedades x e y)
        x: 0, 
        y: -backgroundImageHeight + scaledCanvas.height, 
    }, 
}

// * Função definida para executar a animação no canvas: 
function animate() {
    window.requestAnimationFrame(animate); // Chama a função animate novamente para criar um loop de animação
    // Estilo da janela canvas:
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Configuração do canvas escalado:
    ctx.save(); // Salva o estado atual do canvas
    ctx.scale(4, 4) // Escala o canvas para aumentar a resolução
    ctx.translate(camera.position.x, camera.position.y) // Translada o canvas para cima
    background.update(); // Atualiza o fundo 

    // Desenha os blocos de colisão do canvas
    // collisionBlocks.forEach((collisionBlock) => { // Loop para percorrer os blocos de colisão
    //     collisionBlock.update(); // Atualiza cada bloco de colisão
    // })

    // platformCollisionBlocks.forEach((block) => { // Loop para percorrer os blocos de colisão
    //     block.update(); // Atualiza cada bloco de colisão
    // })

    player.checkForHorizontalCanvasCollision() // Verifica colisão horizontal do jogador com o canvas
    player.update(); // Atualiza a posição do jogador

    player.velocity.x = 0; // Zera a velocidade horizontal do jogador
    if (keys.d.pressed || keys.ArrowRight.pressed) { 
        player.switchSprite('Run'); // Muda a animação do jogador para "Run"
        player.velocity.x = 2; // Move o jogador para a direita
        player.lastDirection = 'right'; // Define a última direção do jogador como direita
        player.shouldPanCameraToTheLeft({ canvas, camera }); // Verifica se a câmera deve se mover para a esquerda
    }
    else if (keys.a.pressed || keys.ArrowLeft.pressed) {
        player.switchSprite('RunLeft'); // Muda a animação do jogador para "RunLeft"
        player.velocity.x = -2; // Move o jogador para a esquerda
        player.lastDirection = 'left'
        player.shouldPanCameraToTheRight({ canvas, camera }); // Verifica se a câmera deve se mover para a direita
    }
    else if (player.velocity.y === 0) { // Se o jogador não estiver se movendo verticalmente
        if (player.lastDirection === 'right') { // Se a última direção do jogador foi para a direita
            player.switchSprite('Idle'); // Muda a animação do jogador para "Idle"
        }
        else player.switchSprite('IdleLeft'); // Se a última direção do jogador foi para a esquerda, muda a animação do jogador para "IdleLeft"
    }

    if (player.velocity.y < 0) { // Se o jogador estiver se movendo para cima
        player.shouldPanCameraToDown({ camera, canvas }) // 
        if (player.lastDirection === 'right') { // Se a última direção do jogador foi para a direita
            player.switchSprite('Jump'); // Muda a animação do jogador para "Jump"
        }
        else player.switchSprite('JumpLeft'); // Se a última direção do jogador foi para a esquerda, muda a animação do jogador para "JumpLeft"
    } 
    else if (player.velocity.y > 0) { // Se o jogador estiver se movendo para baixo
        player.shouldPanCameraToUp({ camera, canvas }) // Verifica se a câmera deve se mover para cima
        if (player.lastDirection === 'right') { // Se a última direção do jogador foi para a esquerda
            player.switchSprite('Fall'); // Muda a animação do jogador para "Fall"
        } 
        else player.switchSprite('FallLeft'); // Se a última direção do jogador foi para a direita, muda a animação do jogador para "FallLeft"
    }

    ctx.restore(); // Restaura o estado do canvas
}

// * Inicia a animação
animate()

// * Adiciona um evento de teclado para mover o jogador:
window.addEventListener('keydown', (event) => {
    switch (event.key) { // Verifica qual tecla foi pressionada
        case 'a': // Tecla 'a' pressionada
            keys.a.pressed = true; // Define a tecla 'a' como pressionada
            break;
        case 'd': // Tecla 'd' pressionada
            keys.d.pressed = true; // Define a tecla 'd' como pressionada
            break;
        case 'w': // Tecla 'w' pressionada
            player.velocity.y = -4; // Define a velocidade para pular para cima
            break;
        case 'ArrowLeft': // Tecla 'ArrowLeft' pressionada
            keys.ArrowLeft.pressed = true; // Define a tecla 'ArrowLeft' como pressionada
            break;
        case 'ArrowRight': // Tecla 'ArrowRight' pressionada
            keys.ArrowRight.pressed = true; // Define a tecla 'ArrowRight' como pressionada
            break;
        case 'ArrowUp': // Tecla 'ArrowUp' pressionada
            player.velocity.y = -4; // Define a velocidade para pular para cima
            break;
    }

});

// * Adiciona um evento de teclado para parar o jogador:
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