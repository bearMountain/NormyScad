
const { Tab } = require('./Constants');

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


module.exports = {
  rotation,
  translation,
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


// const rotate = (orientation, shape) => {
//   const yVector = orientation.yAxis;
//   const yDot = mathjs.dot([yVector.x, yVector.z], [RotationUnitVector.yAxis.x, RotationUnitVector.yAxis.z]);
//   const yAngle = radinsToDegrees(Math.acos(yDot));

//   const zVector = orientation.zAxis;
//   const zDot = mathjs.dot([zVector.x, zVector.y], [RotationUnitVector.zAxis.x, RotationUnitVector.zAxis.y]);
//   const zAngle = radinsToDegrees(Math.acos(zDot));
//   return `rotate([${0}, ${yAngle}, ${zAngle}]) {
//     ${shape}
//   }`
// }