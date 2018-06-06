
const { rotation, translation } = require('./Transformations');
const { parseShorthand } = require('./Utilities');
const { Tab } = require('./Constants');

//
// Cylinder
//
function Cylinder(diameter, height) {
  this.diameter = diameter;
  this.height = height;
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

const cylinder = (diameter, height) => {
  return new Cylinder(diameter, height);
}

Cylinder.prototype.scad = function() {
  let lines = [];
  let i = 0;
  while (i < this.transforms.length) {
    const transform = this.transforms[i];
    lines.push(transform.scadWithIndent(i));
    i++;
  }

  const shapeScad = `${Tab.repeat(i)}cylinder(r = ${this.diameter / 2}, h = ${this.height}, center = true, $fn = 32);`
  lines.push(shapeScad);
  i--;

  while (i >= 0) {
    lines.push(Tab.repeat(i) + '}');
    i--;
  }

  return lines.join('\n');
} 

module.exports = {
  cylinder
}