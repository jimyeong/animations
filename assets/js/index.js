$(document).ready(function () {
  app.init();
});
/* 
const variables = {
    host: ""
}; */

const app = {
  characters: "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",
  charactersArray: [],
  init: function () {
    for (let i = 0; i < app.characters.length - 20; i++) {
      const nthChar = app.characters.charAt(i);
      app.charactersArray.push(app.characters.charAt(nthChar));
      $(".rain").append(`<span class="cube">${nthChar}</span>`);
    }
    console.log("[characters]", app.charactersArray);
    console.log("[length]: ", app.characters.length);
    console.log(app.getRandomNumber(app.characters.length));
  },
  getRandomNumber: function (limit) {
    return Math.floor(Math.random() * limit);
  },
};
