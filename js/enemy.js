'use strict';

function WhiteWalker(canvas, x, y) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.x = x;
  this.y = y;
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
    console.log('No direction change for WhiteWalker');
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
  if (this.x + this.size / 2 >= this.canvas.width - this.size) {
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
  if (this.y + this.size / 2>= this.canvas.height - this.size) {
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

WhiteWalker.prototype.followHero = function(hero) {

  var isHeroOnLeftSide = hero.x + hero.size / 2 < this.x + this.size / 2;
  var isHeroOnRightSide = hero.x + hero.size / 2 > this.x + this.size / 2;
  var isHeroAbove = hero.y + hero.size / 2 < this.y + this.size / 2;
  var isHeroBelow = hero.y + hero.size / 2 > this.y + this.size / 2;

  if(isHeroOnLeftSide) {
    this.setDirection('left');
  } 
  if(isHeroOnRightSide) {
    this.setDirection('right');
  } 
  if(isHeroAbove) {
    this.setDirection('up');
  } 
  if(isHeroBelow) {
    this.setDirection('down');
  }
}

WhiteWalker.prototype.move = function(hero) {
  this.checkForEdges();
  // Cancel shaking effect when walks straight
  if(hero.x === this.x) {
    this.y += this.directionY * this.speed; 
  } else if(hero.y === this.y) {
    this.x += this.directionX * this.speed;
  } else {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  }
}

WhiteWalker.prototype.draw = function() {
  this.image.src = './assets/white-walker.png';
  //Change size of enemy here by passing 2 more arguments
  this.context.drawImage(this.image, this.x, this.y);
}


