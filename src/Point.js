

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

module.exports = {
  p,
  pointFromMatrix,
}