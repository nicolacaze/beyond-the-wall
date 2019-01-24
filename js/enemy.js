'use strict';

function WhiteWalker(canvas, x, y, map) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.map = map;
  this.x = x;
  this.y = y;
  this.directionX = 1;
  this.directionY = 1;
  this.speed = 0.8;
  this.strength = 25;
  this.image = new Image(45, 64);
  this.width = this.image.width;
  this.height = this.image.height;
}

WhiteWalker.prototype.die = function() {
  this.x = -2000;
  this.directionX = 0;
  this.directionY = 0;
}

WhiteWalker.prototype.scream = function() {
  var screamSound = new Audio('./assets/sounds/white-walker-scream.wav');
  screamSound.preload = 'auto';
  screamSound.currentTime = 0;
  screamSound.play();
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
  if (this.y + this.height / 2 >= this.canvas.height - this.height) {
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

WhiteWalker.prototype.checkForTrap = function(map) {

  // Make collision happen on border of draw and not his box element
  var left = this.x  + this.width / 2;
  var right = this.x + this.width / 2;
  var top = this.y + this.height / 2;
  var bottom = this.y + this.height / 2;

  var collision = 
    map.isTrapTileAtXY(left,top) ||
    map.isTrapTileAtXY(right, top) ||
    map.isTrapTileAtXY(right, bottom) ||
    map.isTrapTileAtXY(left, bottom);
  if (!collision) { return; }

  this.die();
  this.scream();
  return collision;
}

WhiteWalker.prototype.checkForObstacle = function(map) {
  
 // Make collision happen on border of draw and not his box element
  var left = this.x  + this.width / 4;
  var right = this.x + this.width * 3 / 4;
  var top = this.y + this.height / 4;
  var bottom = this.y + this.height * 3 / 4;

  var collisionTopLeft = map.isSolidTileAtXY(left,top);
  var collisionTopRight = map.isSolidTileAtXY(right, top);
  var collisionBottomRight = map.isSolidTileAtXY(right, bottom);
  var collisionBottomLeft =  map.isSolidTileAtXY(left, bottom);

  if (!collisionTopLeft 
      && !collisionTopRight
      && !collisionBottomLeft 
      && !collisionBottomRight) { 
      return; }

  if (collisionTopLeft) {
    this.setDirection('right');
    this.x += this.directionX * this.speed;
    this.setDirection('down');
    this.y += this.directionY * this.speed;
  } 
  if (collisionTopRight) {
    this.setDirection('left');
    this.x += this.directionX * this.speed;
    this.setDirection('down');
    this.y += this.directionY * this.speed;
  } 
  if (collisionBottomLeft) {
    this.setDirection('right');
    this.x += this.directionX * this.speed;
    this.setDirection('up');
    this.y += this.directionY * this.speed;
  } 
  if (collisionBottomRight) {
    this.setDirection('left');
    this.x += this.directionX * this.speed;
    this.setDirection('up');
    this.y += this.directionY * this.speed;
  }
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
  this.checkForTrap(this.map);
  this.checkForObstacle(this.map);
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


