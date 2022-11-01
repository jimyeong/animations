const Background = require("./Background");
const Rain = require("./Rain");

class CodeRain {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
    new Background();
    const RainArr = [];

    for (let i = 0; i < 40; i++) {
      const r = new Rain();
      RainArr.push(r);
    }

    console.log("Code Rain is Excuted");
  }
}

module.exports = CodeRain;
window.CodeRain = CodeRain;
