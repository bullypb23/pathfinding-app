import React from 'react';
import Sketch from 'react-p5';
import { connect } from 'react-redux';

var startX = 0, startY = 4, endX = 9, endY = 24;

var cols = 25, rows = 25;
// var grid = new Array(cols);
var openSet = [], closedSet = [];
var start, end;
var w, h;
var path = [];
var level = 0;
var startTime, endTime;
var blocks = [];

const Grid = ({ grid }) => {

  function heuristic(p5, a, b) {
    // var d = p5.dist(a.i, b.i, a.j, b.j);
    var d = p5.abs(a.i - b.i) + p5.abs(a.j - b.j);
    return d;
  }
  
  function randomBlocks(grid) {
    let x = randomNumber();
    let y = randomNumber();
    if (!blocks.includes(grid[x][y])) {
      if (grid[x][y] !== start && grid[x][y] !== end) {
        return grid[x][y];
      } else {
        return randomBlocks(grid);
      }
    } else {
      return randomBlocks(grid);
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
        grid[i][j] = new Spot(i, j);
      }
    }
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
    
    start = grid[startX][startY];
    end = grid[endX][endY];
  
    if (level > 0) {
      for (let i = 0; i < level; i++) {
        let block = randomBlocks(grid);
        block.block = true;
        blocks.push(block);
      }
    }
  
    start.block = false;
    end.block = false;
  }
  
  function Spot(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.block = false;
  
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
  
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    p5.createCanvas(400, 400).parent(canvasParentRef);
    startTime = Date.now();
  
    w = p5.width / cols;
    h = p5.height / rows;
  
    makeGrid();
  
    openSet.push(start);
  };
   
  const draw = (p5) => {
  
    if(openSet.length > 0) {
      var lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
  
      var current = openSet[lowestIndex];
  
      if (current === end) {
        console.log(closedSet.length);
        endTime = Date.now();
        console.log((endTime - startTime) / 1000);
        var temp = current;
        path.push(temp);
        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }
        p5.noLoop();
      }
  
      openSet = openSet.filter(el => current !== el);
      closedSet.push(current);
  
      var neighbors = current.neighbors;
  
      for (let i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
  
        if (!closedSet.includes(neighbor) && !neighbor.block) {
          var tempG = current.g + 1;
  
          let newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
  
          if (newPath) {
            neighbor.h = heuristic(p5, neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
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
        grid[i][j].show(p5, p5.color(255));
      }
    }
    
    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].show(p5, p5.color(255, 0, 0));
    }
    
    for (let i = 0; i < openSet.length; i++) {
      openSet[i].show(p5, p5.color(0, 255, 0));
    }
  
    start.show(p5, p5.color(0, 0, 255));
    end.show(p5, p5.color(0, 0, 255));
  
    for (let i = 0; i < path.length; i++) {
      path[i].show(p5, p5.color(0, 0, 255));
    }
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    start: state.start,
    end: state.end,
    grid: state.grid,
  }
}

export default connect(mapStateToProps)(Grid);