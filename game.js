document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const gameArea = document.getElementById('gameArea');
    let score = 0;
    let gameInterval = setInterval(dropMoney, 2000);

    document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowLeft" && player.offsetLeft > 0) {
            player.style.left = player.offsetLeft - 10 + 'px';
        } else if (event.key === "ArrowRight" && player.offsetLeft < (gameArea.offsetWidth - player.offsetWidth)) {
            player.style.left = player.offsetLeft + 10 + 'px';
        }
    });

    function dropMoney() {
        const money = document.createElement('div');
        money.classList.add('money');
        money.style.left = Math.random() * (gameArea.offsetWidth - 20) + 'px';
        money.style.top = '-20px'; // Start above the game area
        gameArea.appendChild(money);
        moveMoney(money);
    }

    function moveMoney(money) {
        let position = parseInt(money.style.top);
        const interval = setInterval(function() {
            position += 10;
            money.style.top = position + 'px';

            if (position >= gameArea.offsetHeight) {
                if (money.parentNode) {
                    money.parentNode.removeChild(money);
                }
                clearInterval(interval);
            } else if (isCollision(player, money)) {
                updateScore(10);
                if (money.parentNode) {
                    money.parentNode.removeChild(money);
                }
                clearInterval(interval);
            }
        }, 50);
    }

    function isCollision(player, money) {
        const playerRect = player.getBoundingClientRect();
        const moneyRect = money.getBoundingClientRect();
        const collision = !(playerRect.right < moneyRect.left ||
                             playerRect.left > moneyRect.right ||
                             playerRect.bottom < moneyRect.top ||
                             playerRect.top > moneyRect.bottom);

        console.log("Collision Detected:", collision);
        return collision;
    }

    function updateScore(value) {
        score += value;
        document.getElementById('score').innerText = 'Score: ' + score;
        console.log("Score Updated:", score);
    }
});
