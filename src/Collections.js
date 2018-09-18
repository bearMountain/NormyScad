
const { cylinder } = require('./Cylinder');
const { cube } = require('./Cube');
const { rotation, translation } =  require('./Transformations');
const { parseShorthand } = require('./Utilities');
const { Tab } = require('../src/Constants');


//
// Difference
//
function Difference(...shapes) {
  this.shapes = shapes[0];
  this.transforms = [];

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

Difference.prototype.scad = function() {
  let lines = [];
  let i = 0;
  while (i < this.transforms.length) {
    const transform = this.transforms[i];
    lines.push(transform.scadWithIndent(i));
    i++;
  }

  const shapeScad = `difference() {
    ${this.shapes.map(shape => shape.scad()).join('\n')}
  }`
  lines.push(shapeScad);
  i--;

  while (i >= 0) {
    lines.push(Tab.repeat(i) + '}');
    i--;
  }

  return lines.join('\n');
} 

const difference = (...args) => {
  return new Difference(args);
}


//
// Union
//
function Union(...shapes) {
  this.shapes = shapes[0];
  this.transforms = [];

  this.scad = function () {
    return `union() {
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

const union = (...args) => {
  return new Union(args);
}

module.exports = {
  difference,
  union,
}