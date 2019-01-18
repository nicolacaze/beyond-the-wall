'use strict';

function Game(canvas) {
  this.context = canvas.getContext('2d');
  this.hero = new Hero(canvas);
  this.enemies;
  this.animation;
  this.isGameOver;

  this._update = function() {
    // this.hero.move();
  }

  this._clearCanvas = function() {
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    
  }

  this._render = function() {
    this.hero.draw();
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

Game.prototype.keyRight = function() {
  this.hero.setDirection('right');
  this.hero.move();
}
