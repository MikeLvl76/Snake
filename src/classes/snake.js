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
    } else if (this.direction === "TOP") {
      newHead.y -= this.speed;
    } else if (this.direction === "BOTTOM") {
      newHead.y += this.speed;
    }

    this.body.push(newHead);
    this.body.shift();

    for (let i = this.body.length - 1; i > 0; i--) {
      const currentSegment = this.body[i];
      const prevSegment = this.body[i - 1];
      currentSegment.prevX = prevSegment.x;
      currentSegment.prevY = prevSegment.y;
    }
  }

  eat(food) {
    const head = this.body[this.body.length - 1];
    if (dist(head.x, head.y, food.x, food.y) < 10) {
      const currentTail = this.body[0];
      this.body.unshift({
        x: currentTail.x,
        y: currentTail.x,
        prevX: currentTail.prevX,
        prevY: currentTail.prevY,
      });
      this.speed += 0.1;
      food.changeLocation();
      return 1;
    }
    return 0;
  }

  isColliding(position) {
    const { x, y } = this.body[0];
    return x === position.x && y === position.y;
  }

  isCrossingBorders() {
    const { x, y } = this.body[0];
    return x > width || x < 0 || y > height || y < 0;
  }

  draw() {
    noStroke();
    fill(0, 255, 0);
    this.body.forEach((elt, i) => {
      ellipse(elt.x, elt.y, 20);
    });
  }
}
