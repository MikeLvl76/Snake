let snake = null;
let food = null;
let score = 0;

let divElt,
  labelScore,
  textScore,
  playAgain = null;

function gameOver() {
  background(0);
  textSize(32);
  textAlign(CENTER);
  fill(255, 0, 0);
  text("Game over!", width / 2, height / 2);
  noLoop();
}

function resetSketch() {
  snake = new Snake(3);
  food = new Food(random(20, width - 20), random(20, height - 20), 5, [
    random(0, 255),
    random(0, 255),
    random(0, 255),
  ]);

  score = 0;

  if (!isLooping()) {
    loop();
  }
}

function setup() {
  createCanvas(600, 600);
  labelScore = createElement("label", "Score:");
  textScore = createElement("p", score.toString());
  playAgain = createElement("button", "Play again");

  divElt = createElement("div");
  labelScore.child(divElt);
  textScore.child(divElt);
  playAgain.child(divElt);

  playAgain.mousePressed(resetSketch);

  resetSketch();
}

function draw() {
  background(0);

  stroke(255, 0, 0);
  strokeWeight(5);
  noFill();
  rect(0, 0, width, height);

  food.display();
  snake.move();
  snake.draw();
  score += snake.eat(food);
  textScore.html(score.toString());

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
