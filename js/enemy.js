'use strict';

function WhiteWalker(canvas, x, y, map) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.map = map;
  this.x = x;
  this.y = y;
  this.directionX = 1;
  this.directionY = 1;
  this.speed = 0.5;
  this.image = new Image(45, 64);
  this.width = this.image.width;
  this.height = this.image.height;
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
  if (this.x + this.width / 2 >= this.canvas.width - this.width) {
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
  if (this.y + this.height / 2>= this.canvas.height - this.height) {
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

WhiteWalker.prototype.checkForObstacle = function(map) {
  
  var left = this.x;
  var right = this.x + this.width;
  var top = this.y;
  var bottom = this.y + this.height;

  var collision = 
    map.isSolidTileAtXY(left,top) ||
    map.isSolidTileAtXY(right, top) ||
    map.isSolidTileAtXY(right, bottom) ||
    map.isSolidTileAtXY(left, bottom);

  if (!collision) { return; }

  if (this.directionY > 0) {
    this.x -= this.directionX * this.speed;
    this.y -= this.directionY * this.speed;
  } else if (this.directionY < 0) {
    this.x -= this.directionX * this.speed;
    this.y -= this.directionY * this.speed;
  } 
  if (this.directionX > 0) {
    this.x -= this.directionX * this.speed;
    this.y -= this.directionY * this.speed;
  } 
  else if (this.directionX < 0) {
    this.x -= this.directionX * this.speed;
    this.y -= this.directionY * this.speed;
  }
    return collision;
}

WhiteWalker.prototype.followHero = function(hero) {

  var isHeroOnLeftSide = hero.x + hero.width / 2 < this.x + this.width / 2;
  var isHeroOnRightSide = hero.x + hero.width / 2 > this.x + this.width / 2;
  var isHeroAbove = hero.y + hero.height / 2 < this.y + this.height / 2;
  var isHeroBelow = hero.y + hero.height / 2 > this.y + this.height / 2;

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
  this.checkForObstacle(this.map);
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


