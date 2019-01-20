'use strict';

function Game(canvas, gameOverHandler) {
  this.context = canvas.getContext('2d');
  this.hero = new Hero(canvas);
  this.enemies = [];
  this.map = new Map(canvas);
  this.animation;
  this.gameOverHandler = gameOverHandler;

  this._generateEnemy = function() {
    var randomPositionX = Math.floor(Math.random() * canvas.width);
    var randomPositionY = Math.floor(Math.random() * canvas.height);

    this.enemies.push(new WhiteWalker(canvas, randomPositionX, randomPositionY));
  }

  this._updateGame = function() {


    this.enemies.forEach(function(enemy) {

      //check for hero position and adjust enemies direction accordingly
      enemy.followHero(this.hero);
      enemy.move(this.hero);
    }.bind(this));

    
  }

  this._clearCanvas = function() {
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    
  }

  this._renderGame = function() {
    this.map.drawMap();
    this.hero.draw();
    this.enemies.forEach(function(enemy) {
      enemy.draw();
    });
  }
}

Game.prototype.init = function() {
  function loop() {

    // update characters position
    this._updateGame();
    
    // Check for collision
    if(this.hero.hasCollidedWithEnemy(this.enemies)) {
      this.gameOverHandler();
      console.log('GAME OVER');
    }

    // clear Canvas
    this._clearCanvas();

    // render new canvas
    this._renderGame();

    this.animation = window.requestAnimationFrame(loop.bind(this));
  }    
  // Generate a new Enemy every 10 seconds
  setInterval(function() {
    this._generateEnemy();
  }.bind(this), 10000);

  loop.call(this); 
}

Game.prototype.stop = function() {
  window.cancelAnimationFrame(this.animation);
}

Game.prototype.onKeyPress = function(direction, axis) {
  this.hero.setDirection(direction);
  this.hero.move(axis);
}

