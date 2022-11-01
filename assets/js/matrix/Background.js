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
