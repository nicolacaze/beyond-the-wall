'use strict';

function Hero(canvas) {
  this.context = canvas.getContext('2d');
  this.x = 100;
  this.y = 100;
  this.directionX = 1;
  this.directionY;
  this.speed = 5;
  this.image = new Image(64,64);
}

Hero.prototype.setDirection = function(direction) {
  switch(direction) {
    case 'right':
    this.directionX = 1;
    break;
  }

}

Hero.prototype.move = function() {
  this.x += this.directionX * this.speed;
}

Hero.prototype.draw = function() {
  this.image.src = './assets/jon-snow-icon.png';
  this.context.drawImage(this.image, this.x, this.y);
}