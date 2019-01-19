'use strict';

function WhiteWalker(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.x = 200;
  this.y = 200;
  this.directionX = 1;
  this.directionY = 1;
  this.size;
  this.speed = 1;
  this.image = new Image();
}

WhiteWalker.prototype.setDirection = function(direction) {
  switch(direction) {
    case 'right':
    this.directionX = 1;
    break;
    case 'left':
    this.directionX = -1;
    break;
    case 'up':
    this.directionY = -1;
    break;
    case 'down':
    this.directionY = 1;
    break;
    default:
    console.log('No direction change');
  }
}

WhiteWalker.prototype.move = function(axis) {

  if(axis === 'x') {
    this.x += this.directionX * this.speed;
  } else if(axis === 'y') {
    this.y += this.directionY * this.speed;
  } 
}

WhiteWalker.prototype.draw = function() {
  this.image.src = './assets/white-walker.png';
  this.context.drawImage(this.image, this.x, this.y);
}

