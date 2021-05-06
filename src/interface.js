"use strict";
let canvas;
let context;
let board;

window.onload = init;

function init(){
    // Get a reference to the canvas
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    board = new Board
    draw();
}
function draw(){

// Get a random color, red or blue
// let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

// Draw a rectangle
 // x start coord, y start coord, x length, y length


drawLines()
drawCells()
}

function drawLines(){
  drawHorizontal()
  drawVertical()
  context.stroke();
}

function drawHorizontal(){
  for (var i = 10; i < 400; i += 10) {
    context.moveTo(0, i);
    context.lineTo(750, i);
  }
}

function drawVertical(){
  for (var i = 10; i < 750; i += 10) {
    context.moveTo(i, 0);
    context.lineTo(i, 400);
  }
}
function drawCells(){
  // board.alive([0,1])
  // board.alive([25,3])
  context.fillStyle = '#ffffff';
  for (var i = 0; i<board.live.length; i++) {
    context.fillRect(board.live[i][0] * 10 + 1, board.live[i][1] * 10 + 1, 8, 8);
  }
}
