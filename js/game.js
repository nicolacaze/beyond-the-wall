'use strict';

function Game(canvas, gameOverHandler, heroHealthHandler) {
  this.context = canvas.getContext('2d');
  this.map = new Map(canvas);
  this.hero = new Hero(canvas, this.map);
  this.enemyWidth = 45;
  this.enemyHeight = 64;
  this.enemies = [];
  this.animation;
  this.gameOverHandler = gameOverHandler;
  this.heroHealthHandler = heroHealthHandler;
  this.enemyGeneratorInterval;
  this.windSound

  this._getRandomFreePosition = function() {
    // Get a random index on our 1 dimension map array
    var randomTileIndex = this.map.map.cols 
    + Math.floor(Math.random() 
    * (this.map.map.tiles.length - (this.map.map.cols * 2)));
    if (this.map.map.tiles[randomTileIndex] === this.map.FREE_TILE && randomTileIndex < 128) {
      return randomTileIndex;
    } else {
      this._generateEnemy();
    }
  }
    
  this._generateEnemy = function() {
    var freeSpace = this._getRandomFreePosition();
    var row = Math.ceil( freeSpace / this.map.map.cols );
    var col = freeSpace - this.map.map.cols * (row - 1) + 1;
    var x = col * this.map.map.tsize - this.enemyWidth;
    var y = row * this.map.map.tsize - this.enemyHeight;
    var whiteWalker = new WhiteWalker(canvas, x, y, this.map);
    whiteWalker.scream();
    this.enemies.push(whiteWalker);
  } 

  this._updateGame = function() {
    this.enemies.forEach(function(enemy, index, array) {
      //The last enemy created should wait for 3 seconds before chasing hero
      if(index === array.length - 1) {
        // Enemy should animate before it moves
        setTimeout(function() {
          enemy.followHero(this.hero);
          enemy.move(this.hero);
        }.bind(this), 3000);
      } else {
        //check for hero position and adjust enemies direction accordingly
        enemy.followHero(this.hero);
        enemy.move(this.hero);
      }
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
Game.prototype.setBackgroundSound = function() {
  this.windSound = new Audio('./assets/sounds/wind.wav');
  this.windSound.preload = 'auto';
  this.windSound.currentTime = 0;
  this.windSound.loop = true;
}

Game.prototype.init = function() {
  this.map.generateRandomMap();
  this.setBackgroundSound();
  this.windSound.play();
  function loop() {
    this.animation = window.requestAnimationFrame(loop.bind(this));

    // update characters position
    this._updateGame();
    
    // Check for collision
    this.enemies.forEach(function(enemy) {

      if(this.hero.hasCollidedWithEnemy(enemy)) {
        this.hero.loseHealth(enemy);
        this.hero.shoutOnDamage();
        this.heroHealthHandler();
        enemy.die();
      }
    }.bind(this));
    if(this.hero.isDead()) {
      this.hero.screamOnDeath();
      this.gameOverHandler(this.hero.isDead());
    }

    // clear Canvas
    this._clearCanvas();

    // render new canvas
    this._renderGame();

  }    
  // Generate a new Enemy every 10 seconds
  this.enemyGeneratorInterval = setInterval(function() {
    this._generateEnemy();
  }.bind(this), 8000);

  loop.call(this); 
}

Game.prototype.stop = function() {
  window.cancelAnimationFrame(this.animation);
  clearInterval(this.enemyGeneratorInterval);
  this.windSound.pause();
  this.windSound.currentTime = 0;
}

Game.prototype.onKeyPress = function(direction, axis) {
  this.hero.setDirection(direction);
  this.hero.move(axis);
}

