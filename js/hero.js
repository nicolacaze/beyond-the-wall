'use strict';

function Hero(canvas) {
  this.ctx = canvas.getContext('2d');
  this.x;
  this.y;
  this.directionX;
  this.directionY;
  this.speed;
}