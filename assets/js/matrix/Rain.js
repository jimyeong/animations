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
