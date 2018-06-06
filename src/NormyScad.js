
const mathjs = require('../node_modules/mathjs');
const { p, pointFromMatrix } = require('./Point');
const { cylinder } = require('./Cylinder');
const { cube } = require('./Cube');
const { Tab, eps } = require('./Constants');
const { scad_export, _ } = require('./Utilities');
const { difference } = require('./Collections');


//
// Constants
//
const Main = {
  width: 15,
  height: 40,
  depth: 3,
}

const Screw = {
  head: 8,
  shaft: 4,
  headInset: Main.height/20,
}

//
// Shape Construction
//
const main = cube(Main.width, Main.depth, Main.height);
const screwHeadBlank = cylinder(Screw.head+2, Main.depth/2)
                       .rotate(90, 0, 0)
screwHeadBlank.translate(
  0,
  -screwHeadBlank.height/2 - eps,
  Main.height/2 - screwHeadBlank.diameter/2 - Screw.headInset
)
const piece = difference(main, screwHeadBlank);


 scad_export(piece);





