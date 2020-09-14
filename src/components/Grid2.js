import React from 'react';
import Sketch from 'react-p5';

var startX = 0, startY = 4, endX = 20, endY = 24;
var cols = 30, rows = 30;
var grid = new Array(cols);
var start, end;
var w, h;
var queue = [];
var visitedNodes = [];
var path = [];
var startTime, endTime;
var level = 10;
var blocks = [];

function Node(i, j) {
  this.i = i;
  this.j = j;
  this.edges = [];
  this.visited = false;
  this.parent = undefined;
  this.block = false;

  this.show = function(p5, col) {
    p5.fill(col);
    if (this.block) {
      p5.fill(0);
    }
    p5.rect(this.i * w, this.j * h, w, h);
  }

  this.addEdges = function (grid) {
    var i = this.i;
    var j = this.j;

    if (i < cols - 1) this.edges.push(grid[i + 1][j]);
    if (i > 0) this.edges.push(grid[i - 1][j]);
    if (j < rows - 1) this.edges.push(grid[i][j + 1]);
    if (j > 0) this.edges.push(grid[i][j - 1]);
  }
}

function randomNumber() {
  return Math.floor(Math.random() * (cols - 1) + 1);
}

function makeGrid() {
  // making 2D array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Node(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addEdges(grid);
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

const setup = (p5, canvasParentRef) => {
  // use parent to render the canvas in this ref
  p5.createCanvas(400, 400).parent(canvasParentRef);
  startTime = Date.now();
  
  w = p5.width / cols;
  h = p5.height / rows;

  makeGrid();
  queue.push(start);

};

const draw = (p5) => {

  if (queue.length > 0) {
    var current = queue.shift();
    current.visited = true;
    visitedNodes.push(current);

    if(current === end) {
      console.log(visitedNodes.length);
      endTime = Date.now();
      console.log((endTime - startTime) / 1000);
      var temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      p5.noLoop();
    }

    var edges = current.edges;

    for (let i = 0; i < edges.length; i++) {
      if (edges[i].visited === false && !edges[i].block) {
        edges[i].visited = true;
        edges[i].parent = current;
        queue.push(edges[i]);
      } 
    }
  } else {
    console.log('no solution!');
    p5.noLoop();
    return;
  }

  p5.background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(p5, p5.color(255))
    }
  }
  
  for (let i = 0; i < visitedNodes.length; i++) {
    visitedNodes[i].show(p5, p5.color(255, 0, 0))
  }
  
  for (let i = 0; i < queue.length; i++) {
    queue[i].show(p5, p5.color(0, 255, 0))
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show(p5, p5.color(0, 0, 255));
  }

  p5.fill(p5.color(0, 0, 255));
  p5.rect(startX * w, startY * h, w, h);
  p5.rect(endX * w, endY * h, w, h);
}

const Grid2 = () => {
  return (
    <Sketch setup={setup} draw={draw} />
  )
}

export default Grid2;
