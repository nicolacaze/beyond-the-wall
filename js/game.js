'use strict';

function Game(canvas, gameOverHandler) {
  this.context = canvas.getContext('2d');
  this.hero = new Hero(canvas);
  this.enemies = new WhiteWalker(canvas);
  this.animation;
  this.gameOverHandler = gameOverHandler;

  this._update = function() {

    //check for hero position and adjust enemies direction accordingly
    this.enemies.followHero(this.hero);
    this.enemies.move();
    
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
    if(this.hero.hasCollidedWithEnemy(this.enemies)) {
      this.gameOverHandler();
      console.log('GAME OVER');
    }

    // clear Canvas
    this._clearCanvas();

    // render new canvas
    this._render();

    this.animation = window.requestAnimationFrame(loop.bind(this));
  }    
  loop.call(this); 
}

Game.prototype.stop = function() {
  window.cancelAnimationFrame(this.animation);
}

Game.prototype.onKeyPress = function(direction, axis) {
  this.hero.setDirection(direction);
  this.hero.move(axis);
}

