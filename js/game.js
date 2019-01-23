'use strict';

function Game(canvas, gameOverHandler, heroHealthHandler) {
  this.context = canvas.getContext('2d');
  this.map = new Map(canvas);
  this.hero = new Hero(canvas, this.map);
  this.enemies = [];
  this.animation;
  // this.audioContext = new AudioContext();
  // this.heroPainSound = new Sound('../assets/sounds/gruntsound.wav');
  this.gameOverHandler = gameOverHandler;
  this.heroHealthHandler = heroHealthHandler;
  this.enemyGeneratorInterval;

  this._generateEnemy = function() {
    // Get a random index on our 1 dimension map array
    var randomTileIndex = this.map.map.cols 
                          + Math.floor(Math.random() 
                          * (this.map.map.tiles.length - (this.map.map.cols * 2)));
    
    // Loop on the map from random tile index. When free space is found, place enemy.
    console.log(randomTileIndex);
    var freeSpace;
    if (randomTileIndex < this.map.map.tiles.length / 2) {
      freeSpace = this.map.map.tiles.indexOf(this.map.FREE_TILE, 0);
    } else {
      freeSpace = this.map.map.tiles.indexOf(this.map.FREE_TILE, randomTileIndex);
    }

    // var freeSpace;
    // for (var i = randomTileIndex; i < this.map.map.tiles.length; i++) {
      
    //   if (this.map.map.tiles[i] === this.map.FREE_TILE) {
    //     freeSpace = i;
    //   } else if (this.map.map.tiles[i + 1] === this.map.FREE_TILE) {
    //     freeSpace = i + 1;
    //   } else if (this.map.map.tiles[i - 1] === this.map.FREE_TILE) {
    //     freeSpace = i - 1;
    //   } else if (this.map.map.tiles[i - this.map.map.cols] === this.map.FREE_TILE) {
    //     freeSpace = i - this.map.map.cols;
    //   } else if (this.map.map.tiles[i + this.map.map.cols] === this.map.FREE_TILE) {
    //     freeSpace = i + this.map.map.cols;
    //   }
    // }
      
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

Game.prototype.init = function() {
  this.map.generateRandomMap();
  function loop() {
    this.animation = window.requestAnimationFrame(loop.bind(this));

    // update characters position
    this._updateGame();
    
    // Check for collision
    this.enemies.forEach(function(enemy) {

      if(this.hero.hasCollidedWithEnemy(enemy)) {
        // this.heroPainSound.play();
        this.hero.loseHealth(enemy);
        this.heroHealthHandler();
        enemy.die();
      }
      if(this.hero.isDead()) {
        this.gameOverHandler(this.hero.isDead());
      }
    }.bind(this));

    // clear Canvas
    this._clearCanvas();

    // render new canvas
    this._renderGame();

  }    
  // Generate a new Enemy every 10 seconds
  this.enemyGeneratorInterval = setInterval(function() {
    this._generateEnemy();
  }.bind(this), 5000);
  
  loop.call(this); 
}

Game.prototype.stop = function() {
  window.cancelAnimationFrame(this.animation);
  clearInterval(this.enemyGeneratorInterval);
}

Game.prototype.onKeyPress = function(direction, axis) {
  this.hero.setDirection(direction);
  console.log(this.hero.checkForObstacle(this.map));
  this.hero.move(axis);
}

