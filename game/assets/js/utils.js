function collision({
    object1, // O primeiro objeto a verificar a colisão
    object2 // O segundo objeto a verificar a colisão
}) {
    return (
        object1.position.y + object1.height >= object2.position.y && // Verifica se um objeto está acima do bloco de colisão
        object1.position.y <= object2.position.y + object2.height && // Verifica se um objeto está abaixo do bloco de colisão
        object1.position.x <= object2.position.x + object2.width && // Verifica se um objeto está à esquerda do bloco de colisão
        object1.position.x + object1.width >= object2.position.x // Verifica se um objeto está à direita do bloco de colisão
    )
}

function plataformCollision({
    object1, // O primeiro objeto a verificar a colisão
    object2 // O segundo objeto a verificar a colisão
}) {
    return (
        object1.position.y + object1.height >= object2.position.y && // Verifica se um objeto está acima do bloco de colisão
        object1.position.y + object1.height <= object2.position.y + object2.height && // Verifica se um objeto está abaixo do bloco de colisão
        object1.position.x <= object2.position.x + object2.width && // Verifica se um objeto está à esquerda do bloco de colisão
        object1.position.x + object1.width >= object2.position.x // Verifica se um objeto está à direita do bloco de colisão
    )
}