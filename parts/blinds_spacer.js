
const mathjs = require('../node_modules/mathjs');
const { p, pointFromMatrix } = require('../src/Point');
const { cylinder } = require('../src/Cylinder');
const { cube } = require('../src/Cube');
const { Tab, eps } = require('../src/Constants');
const { scad_export, _ } = require('../src/Utilities');
const { difference, union } = require('../src/Collections');


const HoleSpacing = 28.5;
const ScrewBlankDiameter = 5;
const Blank = {
  height: 47,
  width: 12,
  depth: 16.5,
}


const blank = cube(Blank.depth, Blank.width, Blank.height);
const screwBlank1 = cylinder(ScrewBlankDiameter, Blank.width+eps)
                   .rotate(90, 0, 0)
                   .translate(0, 0, HoleSpacing/2);
const screwBlank2 = cylinder(ScrewBlankDiameter, Blank.width + eps)
                   .rotate(90, 0, 0)
                   .translate(0, 0, -HoleSpacing/2);


const piece = difference(blank, screwBlank1, screwBlank2);
 scad_export(piece); 
 




