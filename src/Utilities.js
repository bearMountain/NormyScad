
const fs = require('fs');

//
// Lowdash shortcuts
//
const _ = {
  height: "height",
  half_height: "half_height",
  diameter: "diameter",
  half_diameter: "half_diameter",
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

//
// Degree Utilities
//
const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180;
}

const radinsToDegrees = (radians) => {
  return radians * 180 / Math.PI;
}

//
// File Utilities
//
function scad_export(shape) {
  fs.writeFile("/Users/jeff/Desktop/car2.scad", shape.scad(), function (err) {
    if (err) { return console.log(err); }
    console.log("The file was saved!");
  });  
}


module.exports = {
  parseShorthand,
  scad_export,
  _,
}