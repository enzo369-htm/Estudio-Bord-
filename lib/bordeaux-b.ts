import { Path, Shape } from "three";

/**
 * Traced from the black monogram.
 * Stem and bowl walls keep their measured weight.
 * Top bar, bottom bar and the crossbar neck are the hairlines of the original.
 * Y-up. Outer is counter-clockwise. The hole is clockwise.
 */
const OUTER: Array<[number, number]> = [
    [0, 181],
    [0, 0],
    [133, 0],
    [144, 2],
    [159, 9],
    [166, 17],
    [171, 29],
    [172, 48],
    [169, 61],
    [165, 68],
    [158, 75],
    [149, 80],
    [128, 84],
    [87, 84],
    [83, 88],
    [83, 94],
    [89, 98],
    [127, 98],
    [139, 100],
    [152, 105],
    [162, 114],
    [168, 130],
    [168, 150],
    [162, 166],
    [155, 173],
    [143, 179],
    [127, 182],
    [0, 182]
];

const HOLE: Array<[number, number]> = [
    [34, 180],
    [114, 180],
    [127, 176],
    [134, 169],
    [138, 160],
    [140, 150],
    [140, 130],
    [136, 115],
    [128, 105],
    [121, 101],
    [113, 99],
    [79, 99],
    [52, 102],
    [49, 101],
    [44, 95],
    [44, 86],
    [47, 82],
    [51, 80],
    [63, 80],
    [85, 83],
    [115, 83],
    [130, 78],
    [139, 68],
    [142, 60],
    [143, 29],
    [141, 20],
    [136, 11],
    [129, 5],
    [122, 2],
    [106, 2],
    [33, 2],
    [33, 180]
];

function add(path: Path | Shape, pts: Array<[number, number]>) {
  path.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);
  path.closePath();
}

export function createBordeauxB(): Shape {
  const shape = new Shape();
  add(shape, OUTER);
  const hole = new Path();
  add(hole, HOLE);
  shape.holes.push(hole);
  return shape;
}
