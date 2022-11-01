class Rain {
  characters = ["ｦ", "ｧ", "ｨ", "ｩ", "ｪ", "ｫ", "ｬ", "ｭ", "ｮ", "ｯ"];
  // characters: "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
  randomCharacterSet = new Set();
  constructor() {
    for (let i = 0; i < this.characters.length; i++) {
      this.randomCharacterSet.add(this.characters[i]);
    }
  }
  setRandomCharacter(el) {
    let a;
    this.randomCharacterSet.forEach((a, b, c) => {
      console.log("what's a", a);
      console.log("what's b", b);
      console.log("what's c", c);
    }, d);
  }
}
