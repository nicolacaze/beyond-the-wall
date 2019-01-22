'use strict';

function Hero(canvas, map) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.x = 66;
  this.y = 66;
  this.directionX;
  this.directionY;
  this.speed = 10;
  this.image = new Image(50, 64);
  this.map = map;
  this.width = this.image.width;
  this.height = this.image.height;
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
    console.log('No direction change for Hero');
  }
}

Hero.prototype.hasCollidedWithEnemy = function(enemy) {
  var collisionRight = this.x + this.width / 2 > enemy.x - enemy.width / 2;
  var collisionLeft = this.x - this.width / 2 < enemy.x + enemy.width / 2;
  var collisionTop = this.y - this.height / 2 < enemy.y + enemy.height / 2;
  var collisionBottom = this.y + this.height / 2 > enemy.y - enemy.height / 2;

  return collisionRight && collisionLeft && collisionTop && collisionBottom;
}

Hero.prototype.move = function(axis) {
  this.checkForEdges();
  this.checkForObstacle(this.map);
  if(axis === 'x') {
    this.x += this.directionX * this.speed;
  } else if(axis === 'y') {
    this.y += this.directionY * this.speed;
  } 
}

Hero.prototype.checkForObstacle = function(map) {
  
  // Make collision happen on border of draw and not his box element
  var left = this.x  + this.width / 4;
  var right = this.x + this.width * 3 / 4;
  var top = this.y + this.height / 4;
  var bottom = this.y + this.height * 3 / 4;

  var collision = 
    map.isSolidTileAtXY(left,top) ||
    map.isSolidTileAtXY(right, top) ||
    map.isSolidTileAtXY(right, bottom) ||
    map.isSolidTileAtXY(left, bottom);

  if (!collision) { return; }

  if (this.directionY > 0) {
    this.bounceOnEdges('bottom');
  } else if (this.directionY < 0) {
    this.bounceOnEdges('top');
  } 
  if (this.directionX > 0) {
    this.bounceOnEdges('right');
  } else if (this.directionX < 0) {
    this.bounceOnEdges('left');
  }
    return collision;
}

Hero.prototype.checkForEdges = function() {
  if(this.hasReachedLeft()) {
    this.bounceOnEdges('left');
  } else if(this.hasReachedRight()) {
    this.bounceOnEdges('right');
  } else if(this.hasReachedTop()) {
    this.bounceOnEdges('top');
  } else if(this.hasReachedBottom()) {
    this.bounceOnEdges('bottom');
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
  if(this.x <= this.width) {
    return true;
  } else {
    return false;
  }
}

Hero.prototype.hasReachedRight = function() {
  if (this.x >= this.canvas.width) {
    return true;
  } else {
    return false;
  }
}

Hero.prototype.hasReachedTop = function() {
  if (this.y <= this.height) {
    return true;
  } else {
    return false;
  }
}

Hero.prototype.hasReachedBottom = function() {
  if (this.y >= this.canvas.height) {
    return true;
  } else {
    return false;
  }
}

Hero.prototype.draw = function() {
  this.image.src = './assets/jon-snow.png';
  this.context.drawImage(this.image, this.x, this.y);
}