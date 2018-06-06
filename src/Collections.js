
const { cylinder } = require('./Cylinder');
const { cube } = require('./Cube');


//
// Difference
//
function Difference(...shapes) {
  this.shapes = shapes[0];

  this.scad = function () {
    return `difference() {
      ${this.shapes.map(shape => shape.scad()).join('\n')}
    }`
  }

  this.translate = function(x, y, z) {
    const x2 = parseShorthand.bind(this)(x);
    const y2 = parseShorthand.bind(this)(y);
    const z2 = parseShorthand.bind(this)(z);
    this.transforms.unshift(translation(x2, y2, z2));
    return this;
  }

  this.rotate = function(x, y, z) {
    this.transforms.unshift(rotation(x, y, z));
    return this;
  }
}

const difference = (...args) => {
  return new Difference(args);
}

module.exports = {
  difference,
}