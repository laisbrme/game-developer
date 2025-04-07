// * Configuração do Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// * Tamanho da janela canvas:
canvas.width = 1024;
canvas.height = 576;

let isGameOver = false;  // Variável de controle para verificar se o jogo terminou

const gravity = 0.1 // Definição da gravidade (constante que afeta a velocidade do jogador)


// * Configuração da falcon:
const falcon = {
    idlePosition: {
        src: '../img/falcon.png',
        frameRate: 4,
        frameBuffer: 3,
    },
    idleLeftPosition: {
        src: '../img/falconLeft.png',
        frameRate: 4,
        frameBuffer: 3,
    },
    deathPosition: {
        src: '../img/effects/enemy-death.png',
        frameRate: 6,
        frameBuffer: 3,
    },
}

// * Configuração da maria:
const maria = {
    idlePosition: {
        src: '../img/maria.png',
        frameRate: 1,
        frameBuffer: 1,
    },
    rescuePosition: {
        src: '../img/effects/pt-50.png',
        frameRate: 6,
        frameBuffer: 1,
    },
}

// * Configuração da persona:
const persona = {
    deathPosition: {
        src: '../img/persona/Death.png',
        frameRate: 1,
        frameBuffer: 1,
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
        frameRate: 1,
        frameBuffer: 1,
    },
    idleLeftPosition: {
        src: '../img/persona/IdleLeft.png',
        frameRate: 1,
        frameBuffer: 1,
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
        frameRate: 3,
        frameBuffer: 5,
    },
    runLeftPosition: {
        src: '../img/persona/RunLeft.png',
        frameRate: 3,
        frameBuffer: 5,
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

// * Lista de inimigos
const enemies = [];

// * Cria uma nova instância do inimigo:
enemies.push(new Enemy({
    position: {
        x: 25, // Posição eixo horizontal
        y: 110, // Posição eixo vertical
    },
    imageSrc: falcon.idlePosition.src, // Fonte da imagem do jogador
    frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: falcon.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        IdleLeft: {
            imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idleLeftPosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Death: {
            imageSrc: falcon.deathPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.deathPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.deathPosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));

enemies.push(new Enemy({
    position: {
        x: 160, // Posição eixo horizontal
        y: 177, // Posição eixo vertical
    },
    imageSrc: falcon.idlePosition.src, // Fonte da imagem do jogador
    frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: falcon.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        IdleLeft: {
            imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idleLeftPosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Death: {
            imageSrc: falcon.deathPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.deathPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.deathPosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));

enemies.push(new Enemy({
    position: {
        x: 260, // Posição eixo horizontal
        y: 124, // Posição eixo vertical
    },
    imageSrc: falcon.idlePosition.src, // Fonte da imagem do jogador
    frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: falcon.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        IdleLeft: {
            imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idleLeftPosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Death: {
            imageSrc: falcon.deathPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.deathPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.deathPosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));

enemies.push(new Enemy({
    position: {
        x: 248, // Posição eixo horizontal
        y: 246, // Posição eixo vertical
    },
    imageSrc: falcon.idlePosition.src, // Fonte da imagem do jogador
    frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: falcon.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        IdleLeft: {
            imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idleLeftPosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Death: {
            imageSrc: falcon.deathPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.deathPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.deathPosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));

enemies.push(new Enemy({
    position: {
        x: 224, // Posição eixo horizontal
        y: 310, // Posição eixo vertical
    },
    imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do jogador
    frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: falcon.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        IdleLeft: {
            imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idleLeftPosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Death: {
            imageSrc: falcon.deathPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.deathPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.deathPosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));

enemies.push(new Enemy({
    position: {
        x: 356, // Posição eixo horizontal
        y: 198, // Posição eixo vertical
    },
    imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do jogador
    frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: falcon.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        IdleLeft: {
            imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idleLeftPosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Death: {
            imageSrc: falcon.deathPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.deathPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.deathPosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));

enemies.push(new Enemy({
    position: {
        x: 448, // Posição eixo horizontal
        y: 92, // Posição eixo vertical
    },
    imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do jogador
    frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: falcon.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        IdleLeft: {
            imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idleLeftPosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Death: {
            imageSrc: falcon.deathPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.deathPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.deathPosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));

enemies.push(new Enemy({
    position: {
        x: 528, // Posição eixo horizontal
        y: 222, // Posição eixo vertical
    },
    imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do jogador
    frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: falcon.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        IdleLeft: {
            imageSrc: falcon.idleLeftPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.idleLeftPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.idleLeftPosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Death: {
            imageSrc: falcon.deathPosition.src, // Fonte da imagem do inimigo
            frameRate: falcon.deathPosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: falcon.deathPosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));



const chick = [];

// * Cria uma nova instância do pintinho:
chick.push(new Chick({
    position: {
        x: 0, // Posição eixo horizontal
        y: 89, // Posição eixo vertical
    },
    imageSrc: maria.idlePosition.src, // Fonte da imagem do jogador
    frameRate: maria.idlePosition.frameRate, // Taxa de quadros do jogador
    collisionBlocks, // é o mesmo que escrever >> collisionBlocks: collisionBlocks, // Blocos de colisão do chão
    platformCollisionBlocks, // Blocos de colisão das plataformas
    animations: {
        Idle: {
            imageSrc: maria.idlePosition.src, // Fonte da imagem do inimigo
            frameRate: maria.idlePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: maria.idlePosition.frameBuffer, // Buffer de quadros do inimigo
        },
        Rescue: {
            imageSrc: maria.rescuePosition.src, // Fonte da imagem do inimigo
            frameRate: maria.rescuePosition.frameRate, // Taxa de quadros do inimigo
            frameBuffer: maria.rescuePosition.frameBuffer, // Buffer de quadros do inimigo
        },
    }
}));

// * Cria uma nova instância do jogador:
const player = new Player({
    position: {
        x: 0, // Posição eixo horizontal
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
    ArrowLeft : { pressed: false }, // Tecla 'ArrowLeft' pressionada
    ArrowRight : { pressed: false }, // Tecla 'ArrowRight' pressionada
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
    if (isGameOver) return; // Interrompe o loop de animação se o jogo terminou

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

    // Atualiza a posição do inimigo
    enemies.forEach((enemy) => {
        enemy.update();
    });

    // Atualiza a posição do pintinho
    chick.forEach((chick) => {
        chick.update();
    });

    player.checkForHorizontalCanvasCollision() // Verifica colisão horizontal do jogador com o canvas
    player.update(); // Atualiza a posição do jogador
    player.checkForEnemyCollision(enemies);
    player.checkForChickCollision(chick);

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

// * Função para definir o fim do jogo
function gameOver() {
    isGameOver = true; // Define o estado do jogo como terminado
    const imgGameOver = new Image(); // Cria uma nova imagem para o game over
    const imgWidth = 512; // Largura da imagem
    const imgHeight = 300; // Altura da imagem
    imgGameOver.src = '../img/game-over.jpg'; // Define a fonte da imagem do game over

    imgGameOver.onload = () => {
        // Quando a imagem for carregada, desenha no centro do canvas
        ctx.fillStyle = 'black'; // Preenche o fundo com preto
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Preenche o canvas com a cor preta

        
        const x = (canvas.width - imgWidth) / 2; // Calcula a posição X para centralizar
        const y = (canvas.height - imgHeight) / 2; // Calcula a posição Y para centralizar

        ctx.drawImage(imgGameOver, x, y, imgWidth, imgHeight); // Desenha a imagem no canvas
    };
}

// * Função para rejogar após o game over:
function restartGame() {
    window.location.reload(); // Reinicia o jogo recarregando a página
}

// * Função para voltar ao menu principal: 
function backToMenu() {
    window.location.href = '/game/index.html'; // Redireciona para a página inicial
}

// * Inicia a animação
animate()

