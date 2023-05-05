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
