"use strict";
let canvas;
let context;
let board;

canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
window.onload = init;

function init(){
    // Get a reference to the canvas
    // canvas = document.getElementById('canvas');
    // context = canvas.getContext('2d');
    board = new Board
    draw();
}
function draw(){

// Get a random color, red or blue
// let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

// Draw a rectangle
 // x start coord, y start coord, x length, y length
drawGrid()
drawCells()
}

function drawGrid(){
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

function getSquare(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10,
        y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10
    };
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getSquare(canvas, evt);
    var pixel = context.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    if (pixel[0] !== 128){
      fillSquare(context, mousePos.x, mousePos.y, "gray")
      board.alive([(mousePos.y-1)/10, (mousePos.x-1)/10])
      // console.log(board.live)
    } else {
      fillSquare(context, mousePos.x, mousePos.y, "#F31515")
      board.dead([(mousePos.y-1)/10, (mousePos.x-1)/10])
      // console.log(board.live)
    }
}, false);

function fillSquare(context, x, y, colour){
    context.fillStyle = colour
    context.fillRect(x,y,8,8);
}

function drawCells(){
  context.fillStyle = '#ffffff';
  for (var i = 0; i<board.live.length; i++) {
    context.fillRect(board.live[i][0] * 10 + 1, board.live[i][1] * 10 + 1, 8, 8);
  }
}
