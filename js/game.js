'use strict';

function Game(canvas) {
  this.context = canvas.getContext('2d');
  this.hero = new Hero(canvas);
  this.enemies = new WhiteWalker(canvas);
  this.animation;
  this.isGameOver;

  this._update = function() {

    //check for hero position and adjust enemies direction accordingly
    this._adjustEnemiesDirection();
    this.enemies.move();
    if(this.hero.hasCollidedWithEnemy(this.enemies)) {
      console.log('GAME OVER');
    }
  }

  this._adjustEnemiesDirection = function() {

    var isHeroOnLeftSide = this.hero.x - this.hero.size / 2 < this.enemies.x + this.enemies.size / 2;
    var isHeroOnRightSide = this.hero.x + this.hero.size / 2 > this.enemies.x - this.enemies.size / 2;
    var isHeroAbove = this.hero.y + this.hero.size / 2 < this.enemies.y - this.enemies.size / 2;
    var isHeroBelow = this.hero.y - this.hero.size / 2 > this.enemies.y + this.enemies.size / 2;

    if(isHeroOnLeftSide) {
      this.enemies.setDirection('left');
    } 
    if(isHeroOnRightSide) {
      this.enemies.setDirection('right');
    } 
    if(isHeroAbove) {
      this.enemies.setDirection('top');
    } 
    if(isHeroBelow) {
      this.enemies.setDirection('down');
    }
  }

  this._clearCanvas = function() {
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    
  }

  this._render = function() {
    this.hero.draw();
    this.enemies.draw();
  }
}

Game.prototype.init = function() {
  function loop() {

    // update characters position
    this._update();
    
    // Check for collision

    // clear Canvas
    this._clearCanvas();

    // render new canvas
    this._render();

    this.animation = window.requestAnimationFrame(loop.bind(this));
  }    
  loop.call(this); 
}

Game.prototype.onKeyPress = function(direction, axis) {
  this.hero.setDirection(direction);
  this.hero.move(axis);
}

