document.addEventListener('DOMContentLoaded', () => {
    const basecaracter = document.getElementById('basecaracter');
    const gameContainer = document.getElementById('game-container');
    let isJumping = false;
    let gravity = 0.9;
    let gameOver = false;

    function jump() {
        if (isJumping) return;
        isJumping = true;
        let position = 0;
        let timerId = setInterval(() => {
            // Jump up
            if (position >= 150) {
                clearInterval(timerId);
                let downTimerId = setInterval(() => {
                    // Fall down
                    if (position <= 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    position = position * gravity;
                    basecaracter.style.bottom = position + 'px';
                }, 20);
            }
            // Move up
            position += 30;
            position = position * gravity;
            basecaracter.style.bottom = position + 'px';
        }, 20);
    }

    function generateObstacle() {
        if (gameOver) return;

        let obstaclePosition = 800;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.backgroundImage = 'url(images/obstacle1.png)'; // Ajout de l'image de l'obstacle
        obstacle.style.left = obstaclePosition + 'px';
        gameContainer.appendChild(obstacle);

        let timerId = setInterval(() => {
            if (obstaclePosition > 0 && obstaclePosition < 50 && parseInt(basecaracter.style.bottom) < 50) {
                clearInterval(timerId);
                alert('Game Over');
                gameOver = true;
                while (gameContainer.firstChild) {
                    gameContainer.removeChild(gameContainer.lastChild);
                }
            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }, 20);

        if (!gameOver) setTimeout(generateObstacle, Math.random() * 4000);
    }

    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            jump();
        }
    });

    generateObstacle();
});
