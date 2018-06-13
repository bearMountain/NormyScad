
const mathjs = require('../node_modules/mathjs');
const { p, pointFromMatrix } = require('../src/Point');
const { cylinder } = require('../src/Cylinder');
const { cube } = require('../src/Cube');
const { Tab, eps } = require('../src/Constants');
const { scad_export, _ } = require('../src/Utilities');
const { difference } = require('../src/Collections');


//
// Constants
//


//
// Shape Construction
//
function makeTube(x, y, z, wallRatio=0.1) {
  const normalizedWallRatio = 1-wallRatio;

  const box = cube(x, y, z);
  const inside = cube(x*normalizedWallRatio, y*normalizedWallRatio, z*1.1);

  return difference(box, inside);
}

const tube = makeTube(15, 15, 15);
 scad_export(tube); 
 




