let snake = null;
let food = null;

function gameOver() {
  background(0);
  textSize(32);
  textAlign(CENTER);
  fill(255, 0, 0);
  text("Game over!", width / 2, height / 2);
  noLoop();
}

function setup() {
  createCanvas(600, 600);
  snake = new Snake(3);
  food = new Food(random(20, width - 20), random(20, height - 20), 5, [
    random(0, 255),
    random(0, 255),
    random(0, 255),
  ]);
}

function draw() {
  background(0);
  food.display();
  snake.move();
  snake.draw();
  snake.eat(food);

  if (snake.isCrossingBorders()) {
    gameOver();
  }

  for (let i = 1; i < snake.body.length; i++) {
    if (snake.isColliding(snake.body[i])) {
      gameOver();
      return;
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.direction !== "RIGHT") {
    snake.direction = "LEFT";
  } else if (keyCode === RIGHT_ARROW && snake.direction !== "LEFT") {
    snake.direction = "RIGHT";
  } else if (keyCode === UP_ARROW && snake.direction !== "BOTTOM") {
    snake.direction = "TOP";
  } else if (keyCode === DOWN_ARROW && snake.direction !== "TOP") {
    snake.direction = "BOTTOM";
  }
}
