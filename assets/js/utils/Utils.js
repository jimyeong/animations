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
