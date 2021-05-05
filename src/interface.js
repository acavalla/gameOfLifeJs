"use strict";
let canvas;
let context;

window.onload = init;

function init(){
    // Get a reference to the canvas
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    draw();
}
function draw(){

// Get a random color, red or blue
// let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

// Draw a rectangle
context.fillStyle = '#ff8080';


context.fillRect(0, 50, 10, 10); // x start coord, y start coord, x length, y length


drawHorizontal()
drawVertical()
}
function drawHorizontal(){
  for (var i = 10; i < 400; i += 10) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(750, i);
    context.stroke();
  }
}

function drawVertical(){
  for (var i = 10; i < 750; i += 10) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, 400);
    context.stroke();
  }
}
