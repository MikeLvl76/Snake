let startGame = false;
let snake = null;
let food = null;
let score = 0;
let timer = 0;
let interval = null;

let divElt,
  labelScore,
  textScore,
  textTime,
  playAgain = null;

function menu() {
  textSize(32);
  textAlign(CENTER);
  fill(255);
  text("Click to play", width / 2, height / 2);

  if (mouseIsPressed) {
    startGame = true;
  }
}

// Store score and time locally in browser
function saveResult() {
  const data = localStorage.getItem("saves");
  const saves = data ? JSON.parse(data) : [];
  saves.push({ score, time: textTime.html() });
  localStorage.setItem("saves", JSON.stringify(saves));
  return saves.sort((a, b) => b.score - a.score);
}

function gameOver() {
  const saves = saveResult();
  clearInterval(interval);

  background(0);

  textSize(32);
  textAlign(CENTER);
  fill(255, 0, 0);
  text("Game over!", width / 2, height / 4);
  text("Click on 'Play again' or press SPACE key.", width / 2, height / 4 + 50);

  // Column positions and widths
  const positionsX = width / 2 - 150;
  const scoresX = width / 2;
  const timesX = width / 2 + 150;
  const columnWidth = 150;

  fill(255);
  stroke(255, 0, 0);
  strokeWeight(1);

  // Table header
  textSize(24);
  text("Position", positionsX, height / 4 + 120);
  text("Score", scoresX, height / 4 + 120);
  text("Time", timesX, height / 4 + 120);

  // Table separator
  const separatorY = height / 4 + 130;
  const separatorLength = 3 * columnWidth;
  for (let i = 0; i < separatorLength; i += 10) {
    line(
      width / 2 - separatorLength / 2 + i,
      separatorY,
      width / 2 - separatorLength / 2 + i + 5,
      separatorY
    );
  }

  // Table body
  textSize(20);
  saves.slice(0, 5).forEach((save, i) => {
    const positionText = `${i + 1}`;
    const scoreText = `${save.score}`;
    const timeText = `${save.time}`;

    // Table row
    textAlign(CENTER);
    text(positionText, positionsX, height / 4 + 155 + i * 30);
    text(scoreText, scoresX, height / 4 + 155 + i * 30);
    text(timeText, timesX, height / 4 + 155 + i * 30);
  });

  noLoop();
}

function resetSketch() {
  // Prevent previous setInterval running
  clearInterval(interval);
  snake = new Snake(3);
  food = new Food(random(20, width - 20), random(20, height - 20), 5, [
    random(0, 255),
    random(0, 255),
    random(0, 255),
  ]);

  score = 0;
  timer = 0;
  textTime.html("00:00");

  if (!isLooping()) {
    loop();
  }

  interval = setInterval(() => {
    if (!startGame) {
      return;
    }
    timer++;

    // calculate minutes and seconds elapsed
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    // add leading zeros if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // create formatted timer string
    const timeString = `${formattedMinutes}:${formattedSeconds}`;

    textTime.html(timeString);
  }, 1000);
}

function setup() {
  createCanvas(600, 600);

  textTime = createElement("p", "00:00");
  textScore = createElement("p", score.toString());
  playAgain = createElement("button", "Play again");

  textTime.id("text_time");
  textScore.id("text_score");
  playAgain.id("play_again");

  textTime.attribute("title", "In-game timer");
  textScore.attribute("title", "Score");
  playAgain.attribute("title", "Restart game");

  divElt = createElement("div");
  divElt.id("content");

  divElt.child(textTime);
  divElt.child(textScore);
  divElt.child(playAgain);

  playAgain.mousePressed(resetSketch);

  resetSketch();
}

function draw() {
  background(0);

  if (!startGame) {
    menu();
  } else {
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
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.direction !== "RIGHT") {
    snake.direction = "LEFT";
  } else if (keyCode === RIGHT_ARROW && snake.direction !== "LEFT") {
    snake.direction = "RIGHT";
  } else if (keyCode === UP_ARROW && snake.direction !== "DOWN") {
    snake.direction = "UP";
  } else if (keyCode === DOWN_ARROW && snake.direction !== "UP") {
    snake.direction = "DOWN";
  } else if (key === " ") {
    resetSketch();
  }
}
