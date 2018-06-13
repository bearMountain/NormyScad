
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
const blockerHeight = 30;

const Main = {
  width: 12,
  height: blockerHeight*1.4,
  depth: 3,
}

const Screw = {
  head: 6.75,
  shaft: 3.43,
  headInset: Main.height/20,
}

//
// Shape Construction
//
const main = cube(Main.width, Main.depth, Main.height);

const screwHeadBlank = cylinder(Screw.head*1.25, Main.depth/2)
                       .rotate(90, 0, 0)
screwHeadBlank.translate(
  0,
  -screwHeadBlank.height/2 - eps,
  blockerHeight-Main.height/2,
)

const shaftBlank = cylinder(Screw.shaft*1.25, Main.depth*2)
                   .rotate(90, 0, 0)
                   .translate(0, 0, screwHeadBlank.transforms[0].z);

const piece = difference(main, screwHeadBlank, shaftBlank);


 scad_export(piece);
 




