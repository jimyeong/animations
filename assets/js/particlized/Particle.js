class Particle {
  constructor(effect, x, y, colour) {
    this.colour = colour;
    this.effect = effect;
    this.originX = x;
    this.originY = y;
    this.x = Math.random() * this.effect.canvas.width;
    this.y = Math.random() * this.effect.canvas.height;
    this.ease = Math.random() * 0.01 + 0.02; // 0.02 는 가속도를 주기위해 넣은 숫자임, 이걸 올리면 픽셀 위치가 더 가파르게 변함

    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
  }
  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = Math.hypot(this.dy, this.dx);
    this.force = -this.effect.mouse.radius / this.distance;
    // this.force = -this.effect.mouse.radius / this.distance;
    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;

    // this.y += (this.originY - this.y) * this.ease;
  }
  draw() {
    const { effect } = this;
    effect.context.fillRect(this.x, this.y, effect.gap, effect.gap);
  }
}

module.exports = Particle;
