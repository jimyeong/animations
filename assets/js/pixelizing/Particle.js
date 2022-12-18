class Particle {
  constructor(effect, x, y, colour) {
    this.effect = effect;
    this.colour = colour;
    this.x = Math.random() * effect.canvasWidth;
    this.y = Math.random() * effect.canvasHeight;
    this.originX = x;
    this.originY = y;
    this.ease = Math.random() * 0.1 + 0.05;
  }
  draw() {
    this.effect.context.fillStyle = this.colour;
    this.effect.context.fillRect(
      this.x,
      this.y,
      this.effect.gap,
      this.effect.gap
    );
  }
  update() {
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;
  }
}
module.exports = Particle;
