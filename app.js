let canvas = document.getElementById('gameSurface');
let ctx = canvas.getContext("2d");
let fruitSpawn = canvas.getContext("2d");
var raf;
var score = 0;
let scoreBoard = document.getElementById('Score');

var head = {
    snake: [
        {x:30, y:70}
    ],
    dx: 0,
    dy: 0,
    width: 25,
    height:25,
    draw: function() {
        ctx.fillStyle = "#fff";
        this.snake.forEach(this.drawSnakePart)
    },
    drawSnakePart: function (snakePart) {
        ctx.fillRect(snakePart.x, snakePart.y,25,25)
        ctx.strokeStyle = "#49a21b";
        ctx.strokeRect(snakePart.x, snakePart.y, 25,25);
    },
    advance: function () {
        const cap = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy}
        this.snake.unshift(cap);
        if (this.snake[0].x + this.width > fruit.x && this.snake[0].x < fruit.x + fruit.width && this.snake[0].y + this.height > fruit.y && this.snake[0].y < fruit.y + fruit.height) {
            score += 10;
            scoreBoard.innerHTML = score;
            fruit.x = -fruit.x;
            fruit.x = Math.round((Math.random() * (775 - 0) + 0) / 10) * 10;
            createFruit();
        } else {
            this.snake.pop();
        }
    }
};

var fruit = {
    x: Math.round((Math.random() * (775 - 0) + 0) / 10) * 10,
    y: Math.round((Math.random() * (775 - 0) + 0) / 10) * 10,
    height: 20,
    width: 20,
    draw: function () {
        fruitSpawn.fillStyle = "#000";
        fruitSpawn.fillRect(this.x, this.y, this.width,this.height);
        head.snake.forEach(function isOnSnake(part) {
          if (part.x == this.x && part.y == this.y) createFruit();
        });
    }
}

function draw() {
    if (collision()) {
        showAlert(`Your score is ${score}`);
        // restartGame();
    }   else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            head.draw();
            head.advance();
            createFruit();
        raf = window.requestAnimationFrame(draw);
    }
}

function createFruit() {
    fruit.draw();
}

function collision() {
    for (let i = 4; i < head.snake.length; i++) {
        const didCollide = head.snake[i].x === head.snake[0].x && head.snake[i].y === head.snake[0].y
        if (didCollide) return true
    }

    const hitLeftWall = head.snake[0].x < 0;
    const hitRightWall = head.snake[0].x + head.width > canvas.width;
    const hitToptWall = head.snake[0].y < 0;
    const hitBottomWall = head.snake[0].y + head.height > canvas.height;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function restartGame() {
    if (confirm("Restart")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.requestAnimationFrame(draw);
        score = 0;
    }
}

window.onkeydown = function (event) {
    const goingUp = head.dy === -10;
    const goingDown = head.dy === 10;
    const goingRight = head.dx === 10;
    const goingLeft = head.dx === -10;

    var key = event.keyCode;

    if (key == 38 && !goingDown) { //top
        head.dx = 0;
        head.dy = -10;
    } else if (key == 39 && !goingLeft) { //right
        head.dx = 10;
        head.dy = 0;
    } else if (key == 40 && !goingUp) { //down
        head.dx = 0;
        head.dy = 10;
    } else if (key == 37 && !goingRight) { //left
        head.dx = -10;
        head.dy = 0;
    }
}

window.requestAnimationFrame(draw);

let $alert = document.querySelector('.alert')
let $alertHeight = $alert.getBoundingClientRect().height + 100

$alert.style.bottom = `${-$alertHeight}px`
function showAlert(text, time = 1000) {
    let $test = document.querySelector('.alert .alert-body')
  
          $alert.style.display = 'block'
    setTimeout(() => {
                  $test.innerHTML = text
          }, time)
  
    // move alert
    $alert.style.bottom = `${-$alertHeight}px`
    setTimeout(function() {
    $alert.style.bottom = "20px"
  }, time)
  
  $alert.style.opacity = '1'
}

let $tryAgain = document.querySelector('.alert a')
$tryAgain.addEventListener('click', function() {
    location.reload()
})
