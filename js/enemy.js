'use strict';

function WhiteWalker(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.x = 200;
  this.y = 200;
  this.directionX = 1;
  this.directionY = 1;
  this.size = 64;
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

WhiteWalker.prototype.hasReachedLeft = function() {
  if(this.x <= 0) {
    return true;
  } else {
    return false;
  }
}

WhiteWalker.prototype.hasReachedRight = function() {
  if (this.x >= this.canvas.width - this.size) {
    return true;
  } else {
    return false;
  }
}

WhiteWalker.prototype.hasReachedTop = function() {
  if (this.y <= 0) {
    return true;
  } else {
    return false;
  }
}

WhiteWalker.prototype.hasReachedBottom = function() {
  if (this.y >= this.canvas.height - this.size) {
    return true;
  } else {
    return false;
  }
}

WhiteWalker.prototype.checkForEdges = function() {
  if(this.hasReachedLeft()) {
    this.setDirection('right');
  } else if(this.hasReachedRight()) {
    this.setDirection('left');
  } else if(this.hasReachedTop()) {
    this.setDirection('down');
  } else if(this.hasReachedBottom()) {
    this.setDirection('up');
  }
}

WhiteWalker.prototype.move = function() {
  this.checkForEdges();
  this.x += this.directionX * this.speed;
  this.y += this.directionY * this.speed;
}

WhiteWalker.prototype.draw = function() {
  this.image.src = './assets/white-walker.png';
  //Change size of enemy here by passing 2 more arguments
  this.context.drawImage(this.image, this.x, this.y);
}


