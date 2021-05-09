"use strict";
let canvas;
let context;
let board;
let liveColour;
let deadColour;
let tickTimer;

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

canvas.addEventListener('click', function(evt) {
    var mousePos = getSquare(canvas, evt);
    var pixel = context.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    if (pixel[0] !== parseInt(liveColour.substr(4,3))){
      fillSquare(mousePos.x, mousePos.y, liveColour)
      board.alive([(mousePos.y-1)/10, (mousePos.x-1)/10])
    } else {
      fillSquare(mousePos.x, mousePos.y, deadColour)
      board.dead([(mousePos.y-1)/10, (mousePos.x-1)/10])
    }
}, false);

document.querySelector('.button').addEventListener('click', function(evt) {
  toggleStart()
})

function getSquare(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10,
        y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10
    };
}

function fillSquare(x, y, colour){
    context.fillStyle = colour
    context.fillRect(x,y,8,8);
}

function toggleStart() {
   var el = document.getElementById('Go');
   if (el.firstChild.data == "Go!") {
     tickTimer = setInterval("evolve()", 500);;
     el.firstChild.data = "Stop!";
   } else {
     clearInterval(tickTimer)
     el.firstChild.data = "Go!";
   }
}

function evolve() {
  drawCells(deadColour)
  board.tick()
  liveCheck()
  drawCells(liveColour)
}

function liveCheck(){
  if(board.live.length === 0){
    clearInterval(tickTimer)
    document.getElementById('Go').firstChild.data = "Go!";
    document.getElementById("message").innerHTML="Sorry, game over :(";
  } else {
    document.getElementById("message").innerHTML="";
  }
}

function drawCells(colour){
  for (var i = 0; i<board.live.length; i++) {
    fillSquare(board.live[i][1] * 10 + 1, board.live[i][0] * 10 + 1, colour);
  }
}
