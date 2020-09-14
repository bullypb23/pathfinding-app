import React from 'react';
import Sketch from 'react-p5';

var startX = 1, startY = 4, endX = 24, endY = 19;

var cols = 25, rows = 25;
var grid = new Array(cols);
var start, end;
var w, h;
var path = [];
var unvisitedNodes = [];
var visitedNodes = [];
var level = 50;
// var startTime, endTime;
var blocks = [];

function Graph(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.distance = Infinity;
  this.previousNode = undefined;
  this.block = false;
  this.neighbors = [];

  this.show = function(p5, col) {
    p5.fill(col);
    if (this.block) {
      p5.fill(0);
    }
    p5.rect(this.i * w, this.j * h, w, h);
  }

  this.addNeighbors = function (grid) {
    var i = this.i;
    var j = this.j;

    if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
    if (i > 0) this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
    if (j > 0) this.neighbors.push(grid[i][j - 1]);
  }
}

function randomNumber() {
  return Math.floor(Math.random() * (cols - 1) + 1);
}

function sortNodesByDistance(unvisitedNodes) {
  return unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function makeGrid() {
  // making 2D array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Graph(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  if (level > 0) {
    for (let i = 0; i < level; i++) {
      let x = randomNumber();
      let y = randomNumber();
      if (grid[x][y] !== start && grid[x][y] !== end) {
        grid[x][y].block = true;
        blocks.push(grid[x][y]);
      } 
    }
  }

  start = grid[startX][startY];
  end = grid[endX][endY];
  start.block = false;
  end.block = false;
}

const Dijkstra = () => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    p5.createCanvas(400, 400).parent(canvasParentRef);
    // startTime = Date.now();

    w = p5.width / cols;
    h = p5.height / rows;

    makeGrid();

    unvisitedNodes.push(start);

  }

  const draw = (p5) => {

    p5.background(0);

    start.distance = 0;

    if (unvisitedNodes.length > 0) {
      unvisitedNodes = sortNodesByDistance(unvisitedNodes);
      var closestNode = unvisitedNodes.shift();

      if (closestNode.distance === Infinity) {
        console.log('infinity')
        return;
      }
      closestNode.visited = true;
      visitedNodes.push(closestNode);

      if (closestNode === end) {
        var temp = closestNode;
        path.push(temp);
        while (temp.previousNode) {
          path.push(temp.previousNode);
          temp = temp.previousNode;
        }
        p5.noLoop();
      }

      var neighbors = closestNode.neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i].visited === false && !neighbors[i].block) {
          neighbors[i].visited = true;
          neighbors[i].distance = closestNode.distance + 1
          neighbors[i].previousNode = closestNode;
          unvisitedNodes.push(neighbors[i]);
        }
      }

    } else {
      console.log('no solution');
      p5.noLoop();
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].show(p5, p5.color(255));
      }
    }

    for (let i = 0; i < visitedNodes.length; i++) {
      visitedNodes[i].show(p5, p5.color(255, 0, 0))
    }

    for (let i = 0; i < unvisitedNodes.length; i++) {
      unvisitedNodes[i].show(p5, p5.color(0, 255, 0))
    }

    for (let i = 0; i < path.length; i++) {
      path[i].show(p5, p5.color(0, 0, 255));
    }

    p5.fill(p5.color(0, 0, 255));
    p5.rect(startX * w, startY * h, w, h);
    p5.rect(endX * w, endY * h, w, h);
  }

  return (
    <Sketch setup={setup} draw={draw} />
  )
}

export default Dijkstra;