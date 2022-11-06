const Utils = require("../utils/Utils");

class AnimationController {
  randomX_range;
  randomX = [];

  randomY_range;
  randomY;

  constructor(length) {
    this.elements = document.body.children;
    this.childrenLength = length;
    this.randomX[0] = 0;
    for (let i = 1; i < length + 1; i++) {
      const randomX_range = Utils.getRangedRandomNumber(-10000, 100000);
      const randomX = `${String(randomX_range * 0.001)}vw`;
      this.randomX[i] = randomX;
    }
    if (this.childrenLength > 0) {
      this.setKeyFrames();
      this.initAnimaiton();
    }
  }
  setKeyFrames() {
    this.randomY_range = Utils.getRangedRandomNumber(-10000, -1000);
    this.randomY = `${String(this.randomY_range * 0.01)}vh`;
    const styleTag = Utils.createDOMElement("style");
    styleTag.type = "text/css";
    for (let i = 1; i < this.childrenLength + 1; i++) {
      const randomAnimaFrame = Utils.getRangedRandomNumber(30, 70);
      const randomPercent = `${randomAnimaFrame}%`;
      const randomY = `${randomAnimaFrame}vh`;
      console.log("what is the randomX", this.randomX);
      const keyFrame = `
        @keyframes fall-${i} {
            ${randomPercent}{
            transform: translate(${this.randomX[i]}, ${randomY}) rotate(90deg);
            }
            to {
            transform: translate(${this.randomX[i]} , 100vh) rotate(90deg);
            }
        }
        `;
      styleTag.innerHTML += keyFrame;
      document.head.appendChild(styleTag);
    }
  }
  initAnimaiton() {
    const randomDuration = `${Utils.getRangedRandomNumber(4, 10) * 1}s`;

    for (let i = 1; i < this.childrenLength + 1; i++) {
      const randomDelay = `${Utils.getRandomNumber(0, 5) * 1}s`;
      const el = this.elements[i];
      el.style.transform = `translate(${this.randomX[i]}, -100px) rotate(90deg)`;
      // el.style.animation = `fall-${i} ${randomDuration} ${randomDelay} infinite linear`;
      el.style.animationName = `fall-${i}`;
      el.style.animationDuration = `${randomDuration}`;
      el.style.animationDelay = `${randomDelay}`;
      el.style.animationIteration = "infinite";
      el.style.easingFunction = "linear";
    }
  }
}

module.exports = AnimationController;
