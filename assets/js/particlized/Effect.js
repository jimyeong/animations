const Particle = require("./Particle");

class Effect {
  constructor(context, canvas) {
    this.context = context;
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.fontSize = 90;
    this.lineHeight = this.fontSize * 0.8;
    this.context.font = `${this.fontSize}px Helvetica`;
    this.context.textAlign = "center";
    this.context.textBaseLine = "middle";
    this.context.fillStyle = "#fff";
    this.textMaxLength = 400;
    this.gap = 3;
  }
  convertToPixels() {
    this.particles = [];
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    ).data;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < this.canvas.height; y += this.gap) {
      for (let x = 0; x < this.canvas.width; x += this.gap) {
        const index = (this.canvas.width * y + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const colour = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

          this.particles.push(new Particle(this, x, y, colour));

          // render
          this.context.fillStyle = colour;
          this.context.fillRect(x, y, this.gap, this.gap);
        }
      }
    }
  }
  render() {
    this.particles.forEach((particle, index) => {
      particle.draw();
      particle.update();
    });
  }

  wrapText(text) {
    const words = text.split(" ");
    let lineNumber = 0;
    let testLine = "";
    let lineArr = [];
    for (let i = 0; i < words.length; i++) {
      testLine += words[i] + " ";
      const testLineLength = this.context.measureText(testLine).width;
      if (testLineLength > this.textMaxLength) {
        testLine = words[i] + " ";
        lineNumber++;
      }
      lineArr[lineNumber] = testLine;
    }
    const textBoxHeight = this.lineHeight * lineArr.length;
    const textY = this.canvas.height / 2 - textBoxHeight / 2;
    const textX = this.canvas.width / 2;
    lineArr.forEach((text, lineIdx) => {
      console.log(this);
      this.context.fillText(text, textX, textY + lineIdx * this.lineHeight);
    });
    this.convertToPixels();
  }
}

module.exports = Effect;
