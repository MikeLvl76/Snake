class Food {
  constructor(...attributes) {
    [this.x, this.y, this.r, this.color] = attributes;
  }

  display() {
    fill(...this.color);
    stroke(255);
    strokeWeight(1);
    ellipse(this.x, this.y, this.r, this.r);
  }
}
