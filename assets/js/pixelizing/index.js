const Utils = require("../utils/Utils");
const Effect = require("./Effect");
window.addEventListener("load", () => {
  const BODY = document.body;
  BODY.style.background = "black";
  BODY.style.height = "100vh";
  BODY.style.overflow = "hidden";
  const canvas = Utils.createDOMElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext("2d");

  Utils.addAttribute(canvas, [{ name: "id", value: "canvas" }]);
  Utils.prependChild(BODY, canvas);
  const effect = new Effect(context, canvas.width, canvas.height);
  effect.wrapText("hello world");
  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", function () {});
});
