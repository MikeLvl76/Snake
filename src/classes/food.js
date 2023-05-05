class Food {
  constructor(...attributes) {
    [this.x, this.y, this.r, this.color] = attributes;
  }

  changeLocation() {
    this.x = random(20, width - 20);
    this.y = random(20, height - 20);
  }

  display() {
    fill(...this.color);
    stroke(255);
    strokeWeight(1);
    ellipse(this.x, this.y, this.r, this.r);
  }
}
