'use strict'

function Map(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.atlasImage = new Image();
  this.atlasImage.src = './assets/tiles-atlas.png';
  this.map = {
    cols: 16,
    rows: 9,
    tsize: 64,
    tiles: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
  };
  this.EMPTY_TILE = 0;
  this.ICE_TILE = 1;
  this.TREE_TILE = 2;
  this.FREE_TILE = 3;
  this.HOLE_TILE = 4;
  this.WATER_TILE = 5;
  this.START_POINT = 17;
}

Map.prototype.getTile = function(col, row) {
  return this.map.tiles[row * this.map.cols + col]
}
Map.prototype.getCol = function (x) {
  return Math.floor(x / this.tsize);
}
Map.prototype.getRow = function (y) {
  return Math.floor(y / this.tsize);
}
Map.prototype.getX = function (col) {
  return col * this.tsize;
}
Map.prototype.getY = function (row) {
  return row * this.tsize;
}
Map.prototype.isSolidTileAtXY = function (x, y) {
  // Convert x, y position to a tile position on map
  var col = Math.floor(x / this.map.tsize);
  var row = Math.floor(y / this.map.tsize);

  // tiles 1, 2 and 5 are solid -- the rest are walkable
  // loop through all layers and return TRUE if any tile is solid
  return this.map.tiles.reduce(function (res, layer) {
      var tile = this.getTile(col, row);
      var isSolid = tile === this.ICE_TILE
      || tile === this.TREE_TILE
      || tile === this.WATER_TILE;
      return res || isSolid;
  }.bind(this), false);
}

Map.prototype.isTrapTileAtXY = function(x, y) {
   // Convert x, y position to a tile position on map
   var col = Math.floor(x / this.map.tsize);
   var row = Math.floor(y / this.map.tsize);
 
   // loop through all layers and return TRUE if any tile is a trap
   return this.map.tiles.reduce(function (res, layer) {
       var tile = this.getTile(col, row);
       var isTrap = tile === this.HOLE_TILE;
       return res || isTrap;
   }.bind(this), false);
}

Map.prototype.generateRandomMap = function() {
  // Create icing border for our map
  this.map.tiles.forEach(function(tile, i, arr){
    if (i < 16) {
      arr[i] = this.ICE_TILE;
    }
    if (i % 16 === 0) {
      arr[i] = this.ICE_TILE;
      arr[i - 1] = this.ICE_TILE;
    }
    if (i >= 128) {
      arr[i] = this.ICE_TILE;
    } 
  }.bind(this));

  // Fill the rest of the map randomly with obstacles and free space
  this.map.tiles.forEach(function(tile, i, arr){
    if (tile === this.EMPTY_TILE) {
      var random = Math.random();
      // With 8% chance put a tree obstacle
      if(random > 0.92) {
        arr[i] = this.TREE_TILE;
        // With 2% chance put a hole trap
      } else if (random > 0.88 && random < 0.9) {
        arr[i] = this.HOLE_TILE;
      } else {
        arr[i] = this.FREE_TILE;
      }
    }
  }.bind(this));
  // Ensure first tile of our map is free for our Hero
  this.map.tiles[this.START_POINT] = this.FREE_TILE;
}

Map.prototype.drawMap = function () {
  for (var c = 0; c < this.map.cols; c++) {
    for (var r = 0; r < this.map.rows; r++) {
      var tile = this.getTile(c, r);
      if (tile !== this.EMPTY_TILE) { // 0 => empty tile
        this.context.drawImage(
          this.atlasImage, // image
          (tile - 1) * this.map.tsize, // source x
          0, // source y
          this.map.tsize, // source width
          this.map.tsize, // source height
          c * this.map.tsize, // target x
          r * this.map.tsize, // target y
          this.map.tsize, // target width
          this.map.tsize // target height
        );
      }
    }
  }
}
