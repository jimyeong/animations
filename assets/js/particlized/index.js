window.addEventListener("load", () => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.setAttribute("id", "_canvas");
  canvas.innerHTML = "this browser doesn't support canvas";
  document.body.style.height = "100vh";
  document.body.style.background = "black";

  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");

  function setGrid() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }
  const fontSize = 90;
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#93BFC1");
  gradient.addColorStop(0.3, "#FDB5A0");
  gradient.addColorStop(0.6, "#93BFC1");
  gradient.addColorStop(1, "#FEEE62");
  // gradient.addColorStop(100, "#93BFC1");

  ctx.fillStyle = gradient;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; // default is bottom.

  function wrapText(text) {
    const words = text.split(" ");
    const maxTextLength = canvas.width * 0.5;
    const lineArray = [];
    ctx.font = `${fontSize}px Rubik Distressed`;

    let lineCounter = 0;
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testLineLength = ctx.measureText(testLine).width;
      console.log("what? is", testLineLength);
      if (testLineLength > maxTextLength) {
        lineCounter++;
        line = words[i] + " ";
      } else {
        line = testLine;
      }
      lineArray[lineCounter] = line;
    }
    /**
     * center align
     */
    const lineHeight = fontSize;
    const textHeight = lineArray.length * lineHeight;
    const textY = canvas.height / 2 - textHeight / 2;

    lineArray.forEach((word, line) => {
      ctx.fillText(word, canvas.width / 2, textY + line * fontSize);
    });
  }

  wrapText("Do not be afraid to give up the good to go for the great");
  const inputText = document.createElement("input");
  inputText.setAttribute("name", "texts");
  inputText.setAttribute("class", "input-ctrl");
  document.body.prepend(inputText);

  inputText.style.width = "calc(100% - 20px)";
  inputText.style.height = "44px";
  inputText.style.margin = "10px auto";

  inputText.addEventListener("keyup", (e) => {
    const { value } = e.target;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setGrid();
    wrapText(value);
  });
});
