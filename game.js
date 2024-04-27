const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
let score = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowLeft" && player.offsetLeft > 0) {
        player.style.left = player.offsetLeft - 10 + 'px';
    } else if (event.key === "ArrowRight" && player.offsetLeft < (gameArea.offsetWidth - player.offsetWidth)) {
        player.style.left = player.offsetLeft + 10 + 'px';
    }
});

setInterval(function() {
    const money = createMoney();
    gameArea.appendChild(money);
    moveMoney(money);
}, 2000);

function createMoney() {
    const money = document.createElement('div');
    money.classList.add('money');
    money.style.left = Math.random() * (gameArea.offsetWidth - 20) + 'px';
    return money;
}

function moveMoney(money) {
    let position = 0;
    const interval = setInterval(function() {
        if (position >= 500) {
            if (money.parentNode) {
                money.parentNode.removeChild(money);
            }
            clearInterval(interval);
        } else {
            position += 5;
            money.style.top = position + 'px';
            if (isCollision(player, money)) {
                updateScore(10);
                money.parentNode.removeChild(money);
                clearInterval(interval);
            }
        }
    }, 50);
}

function isCollision(player, money) {
    const playerRect = player.getBoundingClientRect();
    const moneyRect = money.getBoundingClientRect();
    return !(
        playerRect.top > moneyRect.bottom ||
        playerRect.right < moneyRect.left ||
        playerRect.left > moneyRect.right ||
        playerRect.bottom < moneyRect.top
    );
}

function updateScore(value) {
    score += value;
    document.getElementById('score').innerText = 'Score: ' + score;
}
