(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      const randomDelay = `${Utils.getRangedRandomNumber(1, 5) * 1}s`;
      const el = this.elements[i];
      el.style.transform = `translate(${this.randomX[i]}, -100px) rotate(90deg)`;
      // el.style.animation = `fall-${i} ${randomDuration} ${randomDelay} infinite linear`;
      el.style.animationName = `fall-${i}`;
      el.style.animationDuration = `${randomDuration}`;
      el.style.animationDelay = `${randomDelay}`;
      el.style.animationIterationCount = "infinite";
      el.style.animationTimingFunction = "linear";
    }
  }
}

module.exports = AnimationController;

},{"../utils/Utils":5}],2:[function(require,module,exports){
class Background {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];

    if (this.body) {
      this.setStage();
    }
  }

  setStage() {
    console.log(this.body.style);
    this.body.style.height = "100vh";
    this.body.style.overflow = "hidden";
    this.body.style.background =
      "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)";
  }
}

module.exports = Background;

},{}],3:[function(require,module,exports){
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

},{"../utils/Utils":5,"./AnimationController":1,"./Background":2,"./Rain":4}],4:[function(require,module,exports){
const Utils = require("../utils/Utils");
class Rain {
  characters = [
    "ｦ",
    "ｧ",
    "ｨ",
    "ｩ",
    "ｪ",
    "ｫ",
    "ｬ",
    "ｭ",
    "ｮ",
    "ｯ",
    "ｰ",
    "ｱ",
    "ｲ",
    "ｳ",
    "ｴ",
    "ｵ",
    "ｶ",
    "ｷ",
    "ｸ",
    "ｹ",
    "ｺ",
    "ｻ",
    "ｼ",
    "ｽ",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  // characters = ["가", "나", "다", "라", "마", "바", "사", "아", "차", "파"];
  // characters: "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
  randomCharacterSet = new Set();
  constructor(randomLength) {
    console.log("RandomLegnth", randomLength);
    this.rainID = null;
    this.randomLength = randomLength;
    for (let i = 0; i < randomLength; i++) {
      const randomIndex = Utils.getRandomNumber(this.characters.length);
      this.randomCharacterSet.add(this.characters[randomIndex]);
    }
    // this.setRandomCharacter();
    this.setRainToDOM();
  }
  setRandomCharacter(el) {
    let a;
  }
  setRainToDOM() {
    if (!document.body) console.log("no body");
    if (document.body) {
      const el = Utils.createDOMElement("div");
      el.style.transform = "rotate(90deg)";
      el.style.color = "green";
      el.style.fontSize = "24px";
      el.style.letterSpacing = "3px";
      el.style.fontWeight = "bold";
      el.style.transformOrigin = "left top";
      // el.style.transform = "translateX(40px) rotate(90deg)";

      //   el.style.backgroundImage =
      //     "linear-gradient(99deg, rgba(14,62,2,1) 0%, rgba(51,202,68,1) 20%, rgba(231,251,231,1) 40%)";
      //   el.style.backgroundSize = "100%";
      //   el.style.webkitBackgroundClip = "text";
      //   el.style.webkitTextFillColor = "#ff060605";
      /**
       * background-color: green;
  background-image: linear-gradient(99deg, rgba(14,62,2,1) 0%, rgba(51,202,68,1) 20%, rgba(231,251,231,1) 40%);
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: #ff060605;
       */
      Utils.addAttribute(el, [{ name: "class", value: "rain" }]);
      this.rainID = setInterval(() => {
        el.innerHTML = "";
        for (let i = 0; i < this.randomLength; i++) {
          const span = Utils.createDOMElement("span");
          let randomIdx = Utils.getRandomNumber(this.characters.length - 1);
          span.innerHTML = this.characters[Utils.getRandomNumber(randomIdx)];
          span.style.display = "inline-block";
          span.style.transformOrigin = "left top";
          span.style.transform = "rotate(-90deg)";

          Utils.addAttribute(span, [{ name: "class", value: "char" }]);
          Utils.prependChild(el, span);
        }
      }, 500);
      Utils.prependChild(document.body, el);
    }
  }
}

module.exports = Rain;

},{"../utils/Utils":5}],5:[function(require,module,exports){
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

},{}]},{},[3]);
