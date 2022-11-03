const Background = require("./Background");
const Rain = require("./Rain");
const Utils = require("../utils/Utils");

class CodeRain {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
    new Background();
    const RainArr = [];

    for (let i = 0; i < 1; i++) {
      const randomCharacterLength = Utils.getRangedRandomNumber(10, 70);
      const r = new Rain(randomCharacterLength);
      RainArr.push(r);
    }

    console.log("Code Rain is Excuted");
  }
}

module.exports = CodeRain;
window.CodeRain = CodeRain;
