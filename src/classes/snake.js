class Snake {
  constructor(defaultSpeed = 2) {
    this.speed = defaultSpeed;
    this.direction = "RIGHT";
    this.body = [
      { x: width / 2, y: height / 2, prevX: width / 2, prevY: height / 2 },
    ];
  }

  move() {
    const head = this.body[this.body.length - 1];
    const newHead = {
      x: head.x,
      y: head.y,
      prevX: head.x,
      prevY: head.y,
    };

    if (this.direction === "RIGHT") {
      newHead.x += this.speed;
    } else if (this.direction === "LEFT") {
      newHead.x -= this.speed;
    } else if (this.direction === "UP") {
      newHead.y -= this.speed;
    } else if (this.direction === "DOWN") {
      newHead.y += this.speed;
    }

    this.body.push(newHead);
    this.body.shift();

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].prevX = this.body[i - 1].x;
      this.body[i].prevY = this.body[i - 1].y;
    }
  }

  eat(food) {
    const head = this.body[this.body.length - 1];
    if (dist(head.x, head.y, food.x, food.y) < 10) {
      const currentTail = this.body[0];
      this.body.unshift({
        x: currentTail.x,
        y: currentTail.y,
        prevX: currentTail.prevX,
        prevY: currentTail.prevY,
      });
      this.speed += 0.1;
      food.changeLocation();
      return 1;
    }
    return 0;
  }

  isCrossingBorders() {
    const { x, y } = this.body[this.body.length - 1];
    return x > width || x < 0 || y > height || y < 0;
  }

  draw() {
    noStroke();
    fill(0, 255, 0);
    this.body.slice(0, this.body.length - 1).forEach((elt) => {
      ellipse(elt.x, elt.y, 10);
    });

    stroke(0);
    strokeWeight(1);
    fill(0, 127, 0);
    const head = this.body[this.body.length - 1];
    ellipse(head.x, head.y, 15);
  }
}
