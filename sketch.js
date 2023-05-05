class Snake {
  constructor(defaultSpeed = 2, ...headAttributes) {
    this.speed = defaultSpeed;
    [this.x, this.y, this.w, this.h] = headAttributes;
    this.direction = "RIGHT";
  }

  move() {
    if (this.direction === "RIGHT") {
      this.x += this.speed;
    } else if (this.direction === "LEFT") {
      this.x -= this.speed;
    } else if (this.direction === "TOP") {
      this.y -= this.speed;
    } else if (this.direction === "BOTTOM") {
      this.y += this.speed;
    }

    if (this.x + this.w < 0) {
      this.x = width - this.w / 2;
    } else if (this.x - this.w / 2 > width) {
      this.x = -this.w / 2;
    }

    if (this.y + this.h < 0) {
      this.y = height - this.h / 2;
    } else if (this.y - this.h / 2 > height) {
      this.y = -this.h / 2;
    }
  }

  draw() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

let snake = null;

function setup() {
  createCanvas(600, 600);
  snake = new Snake(3, width / 2, height / 2, 50, 50);
}

function draw() {
  background(0);
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
