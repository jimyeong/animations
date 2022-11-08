const Background = require("./Background");
const Rain = require("./Rain");
const Utils = require("../utils/Utils");
const AnimationController = require("./AnimationController");

class CodeRain {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
    this.rainLength = 30;
    new Background();
    const RainArr = [];

    for (let i = 0; i < this.rainLength; i++) {
      const randomCharacterLength = Utils.getRangedRandomNumber(40, 100);
      const r = new Rain(randomCharacterLength);
      RainArr.push(r);
    }

    new AnimationController(this.rainLength);

    console.log("Code Rain is Excuted");
  }
}

module.exports = CodeRain;
window.CodeRain = CodeRain;
