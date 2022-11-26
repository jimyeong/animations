window.onload = function () {
  app.init();
};

const spriteNumb = 90;

const convasWidth = 1400;
const convasHeight = 900;
const characters = [
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
const rainCharacterLength = 15;
const randomNumber = function (limit) {
  const rand = Math.floor(Math.random() * limit);
  return rand;
};
const randomRangeNumber = function (min, max) {
  const diff = max - min - 1;
  const rand = min + randomNumber(diff);
  return rand;
};

const coord_x = new Array();
const coord_y = new Array();
const rainSpeed = new Array();
const characterLength = new Array();
const randomFontSize = new Array();
for (let i = 0; i < spriteNumb; i++) {
  const random_x = randomNumber(convasWidth);
  const speed = randomRangeNumber(6, 25);
  const length = randomRangeNumber(12, 30);
  const fontSize = randomRangeNumber(8, 22);
  console.log("what is this", random_x);
  coord_x.push(random_x);
  coord_y.push(-100);
  rainSpeed.push(speed);
  characterLength.push(length);
  randomFontSize.push(fontSize);
}

const app = {
  context: null,
  init: function () {
    app.setCanvas();
    setInterval(() => {
      app.clearRect();
      app.write();
    }, 120);
  },
  write: function () {
    for (let i = 0; i < coord_x.length; i++) {
      const _x = coord_x[i];
      const _y = coord_y[i];
      const charLength = characterLength[i];
      const _fontSize = randomFontSize[i];
      app.context.font = `${_fontSize}px sans-serif`;

      app.verticalCharacterWrite(_x, _y, charLength);
      if (coord_y[i] > convasHeight) {
        coord_y[i] = -150;
      } else coord_y[i] += rainSpeed[i];
    }
  },
  verticalCharacterWrite: function (x, y, length) {
    let chars = "";
    const rand_length = randomNumber(rainCharacterLength);
    let dy = y;
    for (let i = 0; i < length; i++) {
      const rand_index = randomNumber(characters.length - 1);
      const rand_char = characters[rand_index];
      console.log("context", app.context);
      if (i % 2 == 1) app.setCharstyle("#2ba64f", 2, "#1ca344");
      if (i % 2 == 0) app.setCharstyle("#2ba64f", 2, "#0b752a");
      if (i <= 6) {
        if (i % 3 == 1) app.setCharstyle("#2ba64f", 2, "#174d27");
        if (i % 3 == 2) app.setCharstyle("#2ba64f", 0, "#095921");
        if (i % 3 == 0) app.setCharstyle("#2ba64f", 0, "#095921");
      }
      if (i == length - 1) app.setCharstyle("#eee", 0, "#92e0a9");
      if (i == length - 1) app.setCharstyle("#eee", 0, "#e3ffeb");
      if (i == length - 2) app.setCharstyle("#eee", 3, "#66cc84");
      app.context.fillText(rand_char, x, dy);
      const diff = app.context.measureText(rand_char).actualBoundingBoxAscent;
      dy += diff;
    }
  },
  setCharstyle: function (shadowColor, shadowBlur, fillColor) {
    app.context.fillStyle = fillColor;
    app.context.shadowColor = shadowColor;
    app.context.shadowBlur = shadowBlur;
  },
  setCanvas: function () {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", convasWidth);
    canvas.setAttribute("height", convasHeight);
    canvas.style.border = "1px solid #333";
    canvas.style.marginLeft = "12px";
    canvas.style.marginTop = "12px";
    if (canvas.getContext) {
      app.context = canvas.getContext("2d");
      app.context.fillStyle = "#eee";
      app.context.shadowColor = "#94f475";
      app.context.shadowBlur = 8;
      app.context.shadowOffsetX = app.context.shadowOffsetY = 0;
    }
    if (!canvas.getContext)
      canvas.innerHTML = "canvas is not supported on this browser";
    document.body.appendChild(canvas);
  },
  initCanvas: function (el) {},
  clearRect: function () {
    if (app.context) app.context.clearRect(0, 0, convasWidth, convasHeight);
  },
};
