let snake = null;
let food = null;

function setup() {
  createCanvas(600, 600);
  snake = new Snake(3, width / 2, height / 2, 50, 50);
  food = new Food(random(20, width - 20), random(20, height - 20), 20, [
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
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.direction = "LEFT";
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction = "RIGHT";
  } else if (keyCode === UP_ARROW) {
    snake.direction = "TOP";
  } else if (keyCode === DOWN_ARROW) {
    snake.direction = "BOTTOM";
  }
}
