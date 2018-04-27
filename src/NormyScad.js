
// import mathjs from 'mathjs';
// import fs from 'fs';
var mathjs = require('../node_modules/mathjs');
var fs = require('fs');

//
// Lowdash shortcuts
//
const _ = {
  height: "height",
  half_height: "half_height",
  diameter: "diameter",
  half_diameter: "half_diameter",
}

//
// Utilities
//
const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180;
}

const radinsToDegrees = (radians) => {
  return radians * 180 / Math.PI;
}

const Tab = "  ";

//
// Point
//
function P(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

function p(x, y, z) {
  return new P(x, y, z);
}

function pointFromMatrix(matrix) {
  return new P(matrix[0][0], matrix[1][0], matrix[2][0]);
}

Number.prototype.sanitized = function() {
  return (Math.abs(this) < 1e-15) ? 0 : this;
}

P.prototype = {
  translate: function(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
  },
  sanitize: function() {
    this.x = this.x.sanitized();
    this.y = this.y.sanitized();
    this.z = this.z.sanitized();
  }
}


p.origin = p(0, 0, 0);
const RotationUnitVector = {
  xAxis: p(0, 0, 1),
  yAxis: p(1, 0, 0),
  zAxis: p(0, 1, 0),
}


//
// Translation
//
function Translation(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.scadWithIndent = function(indent) {
    return `${Tab.repeat(indent)}translate([${this.x}, ${this.y}, ${this.z}]) {`
  }
}

function translation(x, y, z) {
  return new Translation(x, y, z);
}

//
// Rotation
//
function Rotation(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.scadWithIndent = function(indent) {
    return `${Tab.repeat(indent)}rotate([${this.x}, ${this.y}, ${this.z}]) {`
  }
}

function rotation(x, y, z) {
  return new Rotation(x, y, z);
}

 
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
    this.transforms.push(translation(x2, y2, z2));
    return this;
  }

  this.rotate = function(x, y, z) {
    this.transforms.push(rotation(x, y, z));
    return this;
  }

  // this.rotate = function(x, y, z) {
  //   // Y - Axis
  //   //     | cos θ    0   sin θ| |x|   | x cos θ + z sin θ|   |x'|
  //   //     |   0      1       0| |y| = |         y        | = |y'|
  //   //     |−sin θ    0   cos θ| |z|   |−x sin θ + z cos θ|   |z'|
  //   const radiansY = degreesToRadians(y);
  //   const cosY = Math.cos(radiansY);
  //   const sinY = Math.sin(radiansY);

  //   const yAxisX = this.orientation.yAxis.x;
  //   const yAxisY = this.orientation.yAxis.y;
  //   const yAxisZ = this.orientation.yAxis.z;

  //   const yAxis = [
  //     [yAxisX*cosY + yAxisZ*sinY],
  //     [yAxisY],
  //     [-yAxisX*sinY + yAxisZ*cosY],
  //   ]

  //   this.orientation.yAxis = pointFromMatrix(yAxis);

  //   // Z - Axis
  //   //     |cos θ   −sin θ   0| |x|   |x cos θ − y sin θ|   |x'|
  //   //     |sin θ    cos θ   0| |y| = |x sin θ + y cos θ| = |y'|
  //   //     |  0       0      1| |z|   |        z        |   |z'|
  //   const radiansZ = degreesToRadians(z);
  //   const cosZ = Math.cos(radiansZ);
  //   const sinZ = Math.sin(radiansZ);

  //   const oX = this.orientation.zAxis.x;
  //   const oY = this.orientation.zAxis.y;
  //   const oZ = this.orientation.zAxis.z;

  //   const zAxis = [
  //     [oX*cosZ - oY*sinZ],
  //     [oX*sinZ + oY*cosZ],
  //     [oZ]
  //   ]

  //   this.orientation.zAxis = pointFromMatrix(zAxis);
  //   // this.orientation.sanitize();

  //   return this;
  // }
}

function parseShorthand(x){
  if (typeof x === 'string') {
    switch (x) {
      case _.height:
        return this.height;
      case _.half_height:
        return this.height/2;
      case _.diameter:
        return this.diameter;
      case _.half_diameter:
        return this.diameter/2;
    }
  }
  return x; 
}

const cylinder = (diameter, height) => {
  return new Cylinder(diameter, height);
}

const translate = (vector, shape) => {
  return `translate([${vector.x}, ${vector.y}, ${vector.z}]) {
    ${shape}
  }`
}

const rotate = (orientation, shape) => {
  const yVector = orientation.yAxis;
  const yDot = mathjs.dot([yVector.x, yVector.z], [RotationUnitVector.yAxis.x, RotationUnitVector.yAxis.z]);
  const yAngle = radinsToDegrees(Math.acos(yDot));

  const zVector = orientation.zAxis;
  const zDot = mathjs.dot([zVector.x, zVector.y], [RotationUnitVector.zAxis.x, RotationUnitVector.zAxis.y]);
  const zAngle = radinsToDegrees(Math.acos(zDot));
  return `rotate([${0}, ${yAngle}, ${zAngle}]) {
    ${shape}
  }`
}

// rotate([0, 45, 0]) {
// }

// rotate([0, 45, 0]) {
//   translate([0, 0, 6]) {
//     cylinder(r = 0.5, h = 12, center = true, $fn = 32);
//   }
// }

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



const wheel = cylinder(1, 12)
              .translate(0, 0, _.half_height)
              .rotate(10, 20, 30)
              .translate(0, _.diameter, _.half_height)
              .translate(0, _.height, 3);
              // .rotate(0, 45, 0);
// const whee  = cylinder(1, 12);
console.log(wheel)
const car = wheel.scad();



 


fs.writeFile("/Users/jeff/Desktop/car2.scad", car, function(err) {
    if (err) { return console.log(err); }
    console.log("The file was saved!");
});  // 