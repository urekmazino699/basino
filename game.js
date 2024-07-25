document.addEventListener('DOMContentLoaded', () => {
    const basecaracter = document.getElementById('basecaracter');
    const obstacle = document.getElementById('obstacle');
    let isJumping = false;
    let gravity = 0.9;
    let gameOver = false;

    function jump() {
        if (isJumping) return;
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
            isJumping = true;
            position += 30;
            position = position * gravity;
            basecaracter.style.bottom = position + 'px';
        }, 20);
    }

    function generateObstacle() {
        let obstaclePosition = 800;
        let randomTime = Math.random() * 4000;

        if (gameOver) return;

        obstacle.style.left = obstaclePosition + 'px';

        let timerId = setInterval(() => {
            if (obstaclePosition > 0 && obstaclePosition < 50 && parseInt(basecaracter.style.bottom) < 50) {
                clearInterval(timerId);
                alert('Game Over');
                gameOver = true;
            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }, 20);

        setTimeout(generateObstacle, randomTime);
    }

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) {
            jump();
        }
    });

    generateObstacle();
});
