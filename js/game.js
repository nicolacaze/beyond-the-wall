'use strict';

function Game(canvas, gameOverHandler, heroHealthHandler) {
  this.context = canvas.getContext('2d');
  this.map = new Map(canvas);
  this.hero = new Hero(canvas, this.map);
  this.enemies = [];
  this.animation;
  this.gameOverHandler = gameOverHandler;
  this.heroHealthHandler = heroHealthHandler;

  this._generateEnemy = function() {
    // Get a random Index on our 1 dimension map array and store his index
    var randomTileIndex =  this.map.map.cols + Math.floor(Math.random() * (this.map.map.tiles.length - this.map.map.cols));
    // Loop on the map from random tile index. When free space is found, place enemy.
    var freeSpace = this.map.map.tiles.indexOf(3, randomTileIndex);
      
    var row = Math.ceil( freeSpace / this.map.map.cols );
    var col = freeSpace - this.map.map.cols * (row - 1) + 1;
    var x = col * this.map.map.tsize;
    var y = row * this.map.map.tsize;
    this.enemies.push(new WhiteWalker(canvas, x, y, this.map));
  } 

  this._updateGame = function() {
    this.enemies.forEach(function(enemy, index, array) {
      //The last enemy created should wait for 3 seconds before chasing hero
      if(index === array.length - 1) {
        // Enemy should animate before it moves
        setTimeout(function() {
          enemy.followHero(this.hero);
          enemy.move(this.hero);
        }.bind(this), 1000);
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

Game.prototype.init = function() {
  this.map.generateRandomMap();
  function loop() {
    this.animation = window.requestAnimationFrame(loop.bind(this));

    // update characters position
    this._updateGame();
    
    // Check for collision
    this.enemies.forEach(function(enemy) {

      if(this.hero.hasCollidedWithEnemy(enemy)) {
        this.hero.loseHealth(enemy);
        this.heroHealthHandler();
        enemy.die();
      }
      if(this.hero.isDead()) {
        this.gameOverHandler();
      }
    }.bind(this));

    // clear Canvas
    this._clearCanvas();

    // render new canvas
    this._renderGame();

  }    
  // Generate a new Enemy every 10 seconds
  setInterval(function() {
    this._generateEnemy();
  }.bind(this), 4000);

  loop.call(this); 
}

Game.prototype.stop = function() {
  window.cancelAnimationFrame(this.animation);
}

Game.prototype.onKeyPress = function(direction, axis) {
  this.hero.setDirection(direction);
  console.log(this.hero.checkForObstacle(this.map));
  this.hero.move(axis);
}

