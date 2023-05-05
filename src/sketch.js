let snake = null;
let food = null;
let score = 0;
let time = 0;

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
  time = 0;

  if (!isLooping()) {
    loop();
  }
}

function setup() {
  createCanvas(600, 600);

  textTime = createElement("p", time.toString());
  textScore = createElement("p", score.toString());
  playAgain = createElement("button", "Play again");

  textTime.id("text_time");
  textScore.id("text_score");
  playAgain.id("play_again");

  textTime.attribute('title', 'In-game time');
  textScore.attribute('title', 'Score');
  playAgain.attribute('title', 'Restart game');

  divElt = createElement("div");
  divElt.id("content");

  divElt.child(textTime);
  divElt.child(textScore);
  divElt.child(playAgain);

  playAgain.mousePressed(resetSketch);

  resetSketch();

  setInterval(() => {
    time++;

    // calculate minutes and seconds elapsed
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // add leading zeros if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // create formatted time string
    const timeString = `${formattedMinutes}:${formattedSeconds}`;

    textTime.html(timeString);
  }, 1000);
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
