function heuristic(p5, a, b) {
  // var d = p5.dist(a.i, b.i, a.j, b.j);
  var d = p5.abs(a.i - b.i) + p5.abs(a.j - b.j);
  return d;
}

function randomNumber(num) {
  return Math.floor(Math.random() * (num - 1) + 1);
}

function astar() {

}