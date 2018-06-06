
const { rotation, translation } = require('./Transformations');
const { parseShorthand } = require('./Utilities');
const { Tab } = require('./Constants');

//
// Cube
//
function Cube(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
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

const cube = (x, y, z) => {
  return new Cube(x, y, z);
}

Cube.prototype.scad = function() {
  let lines = [];
  let i = 0;
  while (i < this.transforms.length) {
    const transform = this.transforms[i];
    lines.push(transform.scadWithIndent(i));
    i++;
  }

  const shapeScad = `${Tab.repeat(i)}cube([${this.x}, ${this.y}, ${this.z}], center=true);`
  lines.push(shapeScad);
  i--;

  while (i >= 0) {
    lines.push(Tab.repeat(i) + '}');
    i--;
  }

  return lines.join('\n');
} 

module.exports = {
  cube,
}