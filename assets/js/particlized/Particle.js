class Particle {
  constructor(effect, x, y, colour) {
    this.colour = colour;
    this.effect = effect;
    this.originX = x;
    this.originY = y;
    this.x = Math.random() * this.effect.canvas.width;
    this.y = Math.random() * this.effect.canvas.height;
    this.ease = Math.random() * 0.01 + 0.02; // 0.02 는 가속도를 주기위해 넣은 숫자임, 이걸 올리면 픽셀 위치가 더 가파르게 변함
  }
  update() {
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;
  }
  draw() {
    const { effect } = this;
    effect.context.fillRect(this.x, this.y, effect.gap, effect.gap);
  }
}

module.exports = Particle;
