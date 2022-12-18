const Particle = require("./Particle");
class Effect {
  constructor(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 90;
    this.lineHeight = this.fontSize * 0.8;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.maxTextLength = this.canvasWidth * 0.8;
    this.particles = [];
    this.gap = 3;
    this.mouse = {
      x: 0,
      y: 0,
      radius: 1000,
    };
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      console.log(this.mouse);
    });
  }

  convertToPixels() {
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    ).data;
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (this.canvasWidth * y + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const colour = `rgba(${red}, ${green} ${blue}, ${alpha})`;
          this.particles.push(new Particle(this, x, y, colour));
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

  wrapText(message) {
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    gradient.addColorStop(0.3, "red");
    gradient.addColorStop(0.5, "fuchsia");
    gradient.addColorStop(0.7, "purple");

    this.context.fillStyle = gradient;
    this.context.font = `${this.fontSize}px Helvetica`;
    this.context.textAlign = "center";
    this.context.textBaseLine = "middle";
    this.context.lineWidth = 3;
    this.context.strokeStyle = "white";

    let line = "";
    let lineCounter = 0;
    let messages = [];
    const words = message.split(" ");

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      if (this.context.measureText(testLine).width > this.maxTextLength) {
        lineCounter++;
        line = words[i] + " ";
      } else {
        line = testLine;
      }
      messages[lineCounter] = line;
    }

    const textHeight = lineCounter * this.lineHeight;
    this.textY = this.canvasHeight / 2 - textHeight / 2;
    messages.forEach((message, index) => {
      this.context.fillText(
        message,
        this.textX,
        this.textY + index * this.lineHeight
      );
      this.context.strokeText(
        message,
        this.textX,
        this.textY + index * this.lineHeight
      );
    });
    this.convertToPixels();
  }
}
module.exports = Effect;
