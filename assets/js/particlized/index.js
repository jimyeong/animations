const Effect = require("./Effect");
const Utils = require("../utils/Utils");
window.addEventListener("load", () => {
  document.body.style.background = "black";
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden";
  const canvasEl = Utils.createDOMElement("canvas");
  Utils.addAttribute(canvasEl, [{ name: "id", value: "_canvas" }]);
  Utils.prependChild(document.body, canvasEl);
  const context = canvasEl.getContext("2d");

  const effect = new Effect(context, canvasEl);
  console.log(effect);
  effect.wrapText("hello world");
  function animate() {
    effect.context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    effect.render();

    requestAnimationFrame(animate);
  }
  animate();
});
// class Particle {
//   constructor(effect, x, y, color) {
//     // 59:27
//     this.effect = effect;
//     this.x = Math.random() * this.effect.canvasWidth;
//     this.y = Math.random() * this.effect.canvasHeight;
//     this.color = color;
//     this.originX = x;
//     this.originY = y;
//     this.size = this.effect.gap;
//     this.dx = 0;
//     this.dy = 0;
//     this.vx = 0;
//     this.vy = 0;
//     this.force = 0;
//     this.angle = 0;
//     this.distance = 0;
//     this.friction = Math.random() * 0.6 + 0.15;
//     this.ease = Math.random() * 0.1 + 0.005;
//   }
//   draw() {
//     this.effect.context.fillStyle = this.color;
//     // this.effect.context.fillRect(this.x, this.y, this.size, this.size);
//     this.effect.context.fillRect(this.x, this.y, this.size, this.size);
//   }
//   update() {
//     this.x += (this.originX - this.x) * this.ease;
//     this.y += (this.originY - this.y) * this.ease;
//   }
// }

// class Effect {
//   constructor(context, canvasWidth, canvasHeight) {
//     this.canvasWidth = canvasWidth;
//     this.canvasHeight = canvasHeight;
//     this.textX = this.canvasWidth / 2;
//     this.textY = this.canvasHeight / 2;
//     this.fontSize = 70;
//     this.lineHeight = this.fontSize * 1.3;
//     this.maxTextWidth = this.canvasWidth * 0.8;
//     this.textInput = document.getElementById("textInput");
//     this.context = context;

//     const gradient = this.context.createLinearGradient(
//       0,
//       0,
//       this.canvasWidth,
//       this.canvasHeight
//     );
//     gradient.addColorStop(0, "#93BFC1");
//     gradient.addColorStop(0.3, "#FDB5A0");
//     gradient.addColorStop(0.6, "#93BFC1");
//     gradient.addColorStop(1, "#FEEE62");

//     this.context.font = `${this.fontSize}px sans-serif`;
//     this.context.fillStyle = gradient;
//     this.context.textAlign = "center";
//     this.context.textBaseline = "middle";

//     this.inputText = document.createElement("input");
//     this.inputText.setAttribute("name", "texts");
//     this.inputText.setAttribute("class", "input-ctrl");
//     document.body.prepend(this.inputText);

//     this.inputText.style.background = "gray";
//     this.inputText.style.width = "calc(100% - 20px)";
//     this.inputText.style.height = "44px";
//     this.inputText.style.margin = "10px auto";
//     this.inputText.style.outline = "none";
//     this.inputText.style.position = "fixed";
//     this.inputText.style.top = "0";
//     this.inputText.style.left = "0";
//     this.inputText.style.right = "0";

//     this.inputText.addEventListener("keyup", (e) => {
//       const { value } = e.target;
//       if (e.key !== " ") {
//         effect.wrapText(value);
//         effect.render();
//       }
//     });

//     this.particles = [];
//     this.gap = 3;
//     this.mouse = {
//       radius: 20000,
//       x: 0,
//       y: 0,
//     };
//   }
//   convertToParticles() {
//     this.particles = [];
//     const pixels = this.context.getImageData(
//       0,
//       0,
//       this.canvasWidth,
//       this.canvasHeight
//     ).data;

//     console.log(pixels);
//     this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
//     for (let y = 0; y < this.canvasHeight; y += this.gap) {
//       for (let x = 0; x < this.canvasWidth; x += this.gap) {
//         const index = (y * this.canvasWidth + x) * 4;
//         const alpha = pixels[index + 3];
//         if (alpha > 0) {
//           const red = pixels[index];
//           const green = pixels[index + 1];
//           const blue = pixels[index + 2];
//           const color = `rgb(${red}, ${green}, ${blue})`;
//           this.particles.push(new Particle(this, x, y, color));
//         }
//       }
//     }
//     console.log("particles: ", this.particles);
//   }
//   render() {
//     this.particles.forEach((particle) => {
//       particle.draw();
//       particle.update();
//     });
//   }
//   setGrid() {
//     this.context.lineWidth = 3;
//     this.context.strokeStyle = "yellow";
//     this.context.beginPath();
//     this.context.moveTo(this.canvasWidth / 2, 0);
//     this.context.lineTo(this.canvasWidth / 2, this.canvasHeight);
//     this.context.stroke();

//     this.context.lineWidth = 3;
//     this.context.strokeStyle = "blue";
//     this.context.beginPath();
//     this.context.moveTo(0, this.canvasHeight / 2);
//     this.context.lineTo(this.canvasWidth, this.canvasHeight / 2);
//     this.context.stroke();
//   }
//   wrapText(text) {
//     // set
//     const words = text.split(" ");
//     let lineNumber = 0;
//     let line = "";
//     let lineArr = [];
//     for (let i = 0; i < words.length; i++) {
//       const testLine = line + words[i] + " ";
//       if (this.context.measureText(testLine).width > this.maxTextWidth) {
//         lineNumber++;
//         line = words[i] + " ";
//       } else {
//         line = testLine;
//       }
//       lineArr[lineNumber] = line;
//     }

//     lineArr.forEach((word, line) => {
//       const lineIdx = line + 1; // line, start off with 0, but we are going to get the text Box size when it's comp
//       this.context.textAlign = "center";
//       this.context.textBaseline = "middle";
//       const textHeight = lineArr.length * this.lineHeight;
//       const textY = this.canvasHeight / 2 - textHeight / 2;
//       this.context.fillText(
//         word,
//         this.canvasWidth / 2,
//         textY + line * this.lineHeight
//       );
//       this.context.strokeText(
//         word,
//         this.canvasWidth / 2,
//         textY + line * this.lineHeight
//       );
//     });
//     this.convertToParticles();
//   }
// }

// window.addEventListener("load", () => {
//   const canvas = document.createElement("canvas");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   canvas.setAttribute("id", "_canvas");
//   canvas.innerHTML = "this browser doesn't support canvas";
//   document.body.style.height = "100vh";
//   document.body.style.background = "black";

//   document.body.prepend(canvas);
//   const ctx = canvas.getContext("2d");
//   const effect = new Effect(ctx, window.innerWidth, window.innerHeight);
//   effect.wrapText(
//     "All you need in this life is ignorance and confidence, then success is sure"
//   );
//   // effect.render();
//   function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     effect.render();
//     requestAnimationFrame(animate);
//   }
//   animate();
// });
