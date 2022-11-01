(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./Background":1,"./Rain":3}],3:[function(require,module,exports){
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
  ];
  // characters = ["가", "나", "다", "라", "마", "바", "사", "아", "차", "파"];
  // characters: "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
  randomCharacterSet = new Set();
  constructor() {
    this.rainID = null;
    for (let i = 0; i < this.characters.length; i++) {
      this.randomCharacterSet.add(this.characters[i]);
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
      el.style.color = "green";
      el.style.fontSize = "20px";
      //   el.style.backgroundImage =
      //     "linear-gradient(99deg, rgba(14,62,2,1) 0%, rgba(51,202,68,1) 20%, rgba(231,251,231,1) 40%)";
      el.style.backgroundSize = "100%";
      // el.style.backgroundClip = "text";
      // el.style.textFillColor = "#ff060605";
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
        for (let i = 0; i < this.characters.length; i++) {
          const span = Utils.createDOMElement("span");
          let randomIdx = Utils.getRandomNumber(this.characters.length - 1);
          span.innerHTML = this.characters[Utils.getRandomNumber(randomIdx)];
          Utils.addAttribute(span, [{ name: "class", value: "char" }]);
          Utils.prependChild(el, span);
        }
      }, 500);
      Utils.prependChild(document.body, el);
    }
  }
}

module.exports = Rain;

},{"../utils/Utils":4}],4:[function(require,module,exports){
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
    console.log(typeof attrs);
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

},{}]},{},[2]);
