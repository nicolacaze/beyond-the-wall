'use strict';

function Hero(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.x = 100;
  this.y = 100;
  this.directionX;
  this.directionY;
  this.size = 64;
  this.speed = 10;
  this.image = new Image(this.size,this.size);
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

  if(this.hasReachedLeft()) {
    this.bounceOnEdges('left');
  } else if(this.hasReachedRight()) {
    this.bounceOnEdges('right');
  } else if(this.hasReachedTop()) {
    this.bounceOnEdges('top');
  } else if(this.hasReachedBottom()) {
    this.bounceOnEdges('bottom');
  } else {

    if(axis === 'x') {
      this.x += this.directionX * this.speed;
    } else if(axis === 'y') {
      this.y += this.directionY * this.speed;
    } 
  } 
}

Hero.prototype.bounceOnEdges = function(side) {

  switch(side) {
    case 'left':
    this.setDirection('right');
    this.x += this.directionX * this.speed;
    break;
    case 'right':
    this.setDirection('left');
    this.x += this.directionX * this.speed;
    break;
    case 'top':
    this.setDirection('down');
    this.y += this.directionY * this.speed;
    break;
    case 'bottom':
    this.setDirection('up');
    this.y += this.directionY * this.speed;
    break;
    default:
    console.log('No bounce called');
  }
}

Hero.prototype.hasReachedLeft = function() {
  if(this.x <= 0) {
    return true;
  } else {
    return false;
  }
}

Hero.prototype.hasReachedRight = function() {
  if (this.x >= this.canvas.width - this.size) {
    return true;
  } else {
    return false;
  }
}

Hero.prototype.hasReachedTop = function() {
  if (this.y <= 0) {
    return true;
  } else {
    return false;
  }
}

Hero.prototype.hasReachedBottom = function() {
  if (this.y >= this.canvas.height - this.size) {
    return true;
  } else {
    return false;
  }
}

Hero.prototype.draw = function() {
  this.image.src = './assets/jon-snow-icon.png';
  this.context.drawImage(this.image, this.x, this.y);
}