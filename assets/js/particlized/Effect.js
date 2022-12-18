const Particle = require("./Particle");

class Effect {
  constructor(context, canvas) {
    this.context = context;
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.fontSize = 90;
    this.lineHeight = this.fontSize * 1.1;
    this.context.font = `${this.fontSize}px Helvetica`;
    this.context.textAlign = "center";
    this.context.textBaseLine = "middle";
    this.context.fillStyle = "#fff";
    this.textMaxLength = this.canvas.width * 0.8;
    this.gap = 4;
    this.x = 0;
    this.y = 0;
    this.mouse = {
      radius: 200,
      x: 0,
      y: 0,
    };
    this.textX = this.canvas.widht / 2;
    this.textY = this.canvas.height / 2;

    const textInput = document.getElementById("textInput");
    textInput.addEventListener("keyup", (e) => {
      if (e.key !== " ") {
        const { value } = e.target;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.wrapText(value);
      }
    });
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
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
  resize(width, height) {
    this.canvas.height = height;
    this.canvas.width = width;

    this.textX = this.canvas.widht / 2;
    this.textY = this.canvas.height / 2;
    this.textMaxLength = this.canvas.width * 0.8;
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
    this.textY = this.canvas.height / 2 - textBoxHeight / 2;
    this.textX = this.canvas.width / 2;
    lineArr.forEach((text, lineIdx) => {
      this.context.fillText(
        text,
        this.textX,
        this.textY + lineIdx * this.lineHeight
      );
    });
    this.convertToPixels();
  }
}

module.exports = Effect;
