'use strict';

function Hero(canvas) {
  this.context = canvas.getContext('2d');
  this.x = 100;
  this.y = 100;
  this.directionX = 0;
  this.directionY;
  this.speed = 5;
  this.image = new Image(64,64);
}

Hero.prototype.setDirection = function(direction) {
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

Hero.prototype.move = function(axis) {
  if(axis === 'x') {
    this.x += this.directionX * this.speed;
  } else if(axis === 'y') {
    this.y += this.directionY * this.speed;
  }
}

Hero.prototype.draw = function() {
  this.image.src = './assets/jon-snow-icon.png';
  this.context.drawImage(this.image, this.x, this.y);
}