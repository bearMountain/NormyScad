
const mathjs = require('../node_modules/mathjs');
const { p, pointFromMatrix } = require('../src/Point');
const { cylinder } = require('../src/Cylinder');
const { cube } = require('../src/Cube');
const { Tab, eps } = require('../src/Constants');
const { scad_export, _ } = require('../src/Utilities');
const { difference, union } = require('../src/Collections');


//
// Utility Functions
//
function makeTube(x, y, z, wallRatio=0.1) {
  const normalizedWallRatio = 1-wallRatio;

  const box = cube(x, y, z);
  const inside = cube(x*normalizedWallRatio, y*normalizedWallRatio, z*1.1);

  return difference(box, inside);
}


function makeCup({ numLayers, baseWidth, topWidth, layerHeight, rotation }) {
  const step = (baseWidth-topWidth)/numLayers;

  let tubes = [];
  for (let i = 0; i < numLayers; i++) {
    const edge = baseWidth-(i*step);
    const tube = makeTube(edge, edge, layerHeight)
      .rotate(0, 0, i * rotation)
      .translate(0, 0, i * layerHeight);
    tubes.push(tube);
  }

  return union(...tubes);
}

//
// Shape Construction
//
const cup = makeCup({
  numLayers: 1,
  baseWidth: 50,
  topWidth: 15,
  layerHeight: 5,
  rotation: 2,
})

 scad_export(cup);
 




