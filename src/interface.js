"use strict";
let canvas;
let context;
let board;
let liveColour;
let deadColour;

canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
liveColour = "rgb(155, 102, 102)";
deadColour = '#F31515'
window.onload = init;

function init(){
    board = new Board
    draw();
}

function draw(){
  drawGrid()
  drawCells()
}

function drawGrid(){
  drawLines()
  context.stroke();
}

function drawLines(){
  for (var i = 10; i < 750; i += 10) {
    context.moveTo(0, i);
    context.lineTo(750, i);
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
    if (pixel[0] !== liveColour){
      fillSquare(mousePos.x, mousePos.y, liveColour)
      board.alive([(mousePos.y-1)/10, (mousePos.x-1)/10])
    } else {
      fillSquare(mousePos.x, mousePos.y, deadColour)
      board.dead([(mousePos.y-1)/10, (mousePos.x-1)/10])
    }
}, false);

document.querySelector('.button').addEventListener('click', function(evt) {
  if(board.live.length === 0){
    //add to innerHTML 'Sorry! Game over :('
  } else {
    drawCells(deadColour)
    board.tick()
    drawCells(liveColour)
  }
})

function fillSquare(x, y, colour){
    context.fillStyle = colour
    context.fillRect(x,y,8,8);
}

function drawCells(colour){
  for (var i = 0; i<board.live.length; i++) {
    fillSquare(board.live[i][1] * 10 + 1, board.live[i][0] * 10 + 1, colour);
  }
}
