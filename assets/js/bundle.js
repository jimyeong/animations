(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
require("./particlized");

},{"./particlized":4}],2:[function(require,module,exports){
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

},{"./Particle":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
const Effect = require("./Effect");
const Utils = require("../utils/Utils");
const WORDS = "I'M ON A SEAFOOD DIET, I SEE FOOD AND I EAT IT";
window.addEventListener("load", () => {
  document.body.style.background = "black";
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden";
  const canvasEl = Utils.createDOMElement("canvas");
  Utils.addAttribute(canvasEl, [{ name: "id", value: "_canvas" }]);
  Utils.prependChild(document.body, canvasEl);
  const context = canvasEl.getContext("2d", { willReadFrequently: true });

  const inputEl = Utils.createDOMElement("input");
  inputEl.style.position = "fixed";
  inputEl.style.top = "0px";
  inputEl.style.left = "0px";
  inputEl.style.width = "100%";
  inputEl.style.height = "46px";
  Utils.prependChild(document.body, inputEl);
  Utils.addAttribute(inputEl, [
    { name: "name", value: "text" },
    { name: "id", value: "textInput" },
    { name: "value", value: WORDS },
  ]);
  const effect = new Effect(context, canvasEl);

  console.log(effect);
  effect.wrapText(inputEl.value);
  effect.render();
  function animate() {
    effect.context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    effect.render();

    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener("resize", (e) => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    effect.resize(window.innerWidth, window.innerHeight);
    effect.wrapText(inputEl.value);
  });
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

},{"../utils/Utils":5,"./Effect":2}],5:[function(require,module,exports){
const Utils = {
  getRandomNumber: function (limit) {
    return Math.floor(Math.random() * limit);
  },
  getRangedRandomNumber: function (min, max) {
    const diffLimit = max - min - 1;
    return min + Utils.getRandomNumber(diffLimit);
  },
  createDOMElement: function (elName) {
    return document.createElement(elName);
  },
  prependChild: function (el, childNode) {
    el.prepend(childNode);
  },
  addAttribute: function (el, attrs) {
    if (typeof attrs == "object") {
      if (attrs.length) {
        attrs.forEach((attr) => {
          el.setAttribute(attr.name, attr.value);
        });
      }
      return el;
    }

    return el;
  },
};

module.exports = Utils;

},{}]},{},[1]);
